import dotenv from "dotenv"
import { Router } from "express"
import { Communication_log } from "../models/Communication_log.model.js"

dotenv.config({path: "./.env"}) // .env file is under root directory 

const router = Router()

// Fetch all audience data
router.get("/", async (req, res) => {
    try {
        const audienceData = await Communication_log.find()
        res.status(200).json(audienceData)
    } catch (error) {
        console.error("Error fetching audience data !! ", error)
        res.status(500).json({message : "Failed to fetch audience Data from communication_log table !! " })
    }
})
  
router.post("/", async (req, res) => {
    try {
        // console.log("Request Body:", req.body)
        const communicationLogArray = req.body

        communicationLogArray.forEach(async (entry) => {
            const audienceData= new Communication_log(entry)
            const savedAudienceData = await audienceData.save()
        })
        res.status(201).json({message: "All segmented audience data saved successfully !"})
    } catch (error) {
        console.error("Error adding segmented audience !! ", error)
        res.status(500).json({ error: "Failed to add segmented audience !! " })
    }
})

export default router