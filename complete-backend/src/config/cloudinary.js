import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { deleteTempFile } from "../utils/fileCleanup.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload a file to Cloudinary
 * @param {string} filePath - Local file path
 * @param {string} folder   - Cloudinary folder name
 * @param {object} options  - Extra cloudinary upload options
 * @returns {Promise<object>} Cloudinary upload result
 */
export const uploadToCloudinary = async (filePath, folder = "Treno", options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
    folder,
    ...options,
  });
  return result;
  } catch (error) {
    console.log(error)
  } finally{
    deleteTempFile(filePath)
  }
};

/**
 * Delete a file from Cloudinary by public_id
 * @param {string} publicId  - Cloudinary public ID
 * @param {string} resource_type - 'image' | 'raw' | 'video'
 */
export const deleteFromCloudinary = async (publicId, resource_type = "image") => {
  if (!publicId) return null;
  const result = await cloudinary.uploader.destroy(publicId, { resource_type });
  return result;
};

/**
 * Delete multiple Cloudinary assets by public_ids
 * @param {string[]} publicIds
 * @param {string} resource_type
 */
export const deleteManyFromCloudinary = async (publicIds = [], resource_type = "image") => {
  if (!publicIds.length) return null;
  const result = await cloudinary.api.delete_resources(publicIds, { resource_type });
  return result;
};

export default cloudinary;
