import mongoose from "mongoose";
import Trip from "../models/Trip.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Destination from '../models/destinations.js';

// @desc    Get all destinations (with optional search filter)
// @route   GET /api/destinations
// @access  Public
// export const getAllDestionation = asyncHandler(async (req, res) => {

//     const destinations = await Destination.find({}).sort({ createdAt: -1 });


//     return new ApiResponse(
//         200,
//         {
//             count: destinations.length,
//             data: destinations
//         },
//         "desstination fetched successfully"
//     ).send(res)
// });

export const getAllDestionation = asyncHandler(async (req, res) => {
    // 1. Parse page and limit from query params with default values
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (page - 1) * limit;

    // 2. Fetch paginated data and total count concurrently
    const [destinations, totalDestinations] = await Promise.all([
        Destination.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Destination.countDocuments({})
    ]);

    const totalPages = Math.ceil(totalDestinations / limit);

    // 3. Send structured response
    return new ApiResponse(
        200,
        {
            data: destinations,
            pagination: {
                totalDestinations,
                totalPages,
                currentPage: page,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        },
        "Destinations fetched successfully"
    ).send(res);
});

// @desc    Get single destination by Name
// @route   GET /api/destinations/:name
// @access  Public
export const getDestinationByName = asyncHandler(async (req, res) => {
    // Accepts either :name or :id param name from req.params
    const nameParam = req.params.name || req.params.id;

    if (!nameParam) {
        // res.status(400);
        throw ApiError.badRequest('Destination name parameter is required');
    }

    // Exact case-insensitive match on the destination name
    const destination = await Destination.findOne({
        name: { $regex: new RegExp(`^${nameParam.trim()}$`, 'i') }
    });

    if (!destination) {
        // res.status(404);
        throw ApiError.badRequest(`Destination not found with name: ${nameParam}`);
    }

    return new ApiResponse(
        200, {
        data: destination
    },
        "destination fetched successfully"
    )
});

/**
 * GET /api/v1/destinations
 * Public 
 */
export const getTripByDestination = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw ApiError.badRequest("id is required");
    }

    // Clean up input string
    const normalizedId = id.trim();

    console.log(normalizedId)
    // 1. Fetch Trips and Destination concurrently using Promise.all
    // 2. Use case-insensitive regex for destination lookup to handle capital/lowercase variations
    const [trips, destination] = await Promise.all([
        Trip.find({ $text: { $search: normalizedId } }).lean(),
        Destination.findOne({ name: new RegExp(`^${normalizedId}$`, 'i') }).lean()
    ]);

    // 3. Early return if no trips found
    if (!trips.length) {
        return new ApiResponse(
            200,
            { trips: [], destination: destination || {} },
            "No Trip found for the given destination"
        ).send(res);
    }

    return new ApiResponse(
        200,
        {
            trips,
            destination: destination || {}
        },
        "Trips for the given destination fetched successfully"
    ).send(res);
});