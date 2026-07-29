import express from "express"
import { getAllDestionation, getDestinationByName, getTripByDestination } from "../controllers/destinationsController.js"

const router =  express.Router()

router.get("/",getAllDestionation)
router.get("/:name",getDestinationByName)
router.get("/destination/:id",getTripByDestination)


export default router