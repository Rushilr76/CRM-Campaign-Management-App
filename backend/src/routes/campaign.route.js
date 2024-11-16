import dotenv from "dotenv"
import { Router } from "express"
import { Campaign } from "../models/Campaign.model.js"

dotenv.config({path: "./.env"}) // .env file is under root directory 

const router = Router()

// Fetch all campaigns
router.get("/", async (req, res) => {
    try {
        const campaigns = await Campaign.find()
        res.status(200).json(campaigns)
    } catch (error) {
        console.error("Error fetching campaigns !! ", error)
        res.status(500).json({message : "Failed to fetch campaigns !! " })
    }
})
  
// Add a new campaign 
router.post("/", async (req, res) => {
    try {
        console.log("Request Body:", req.body)
        const newCampaign= new Campaign(req.body)
        const savedCampaign = await newCampaign.save()
        res.status(201).json(savedCampaign)
    } catch (error) {
        console.error("Error adding campaign !! ", error)
        res.status(500).json({ error: "Failed to add campaign !! " })
    }
})

// Update the campaign's message
router.put("/", async (req, res) => {
    try {
        console.log("Incoming Request Body: ", req.body)
        const { campaignName, cureentCampaignMessage } = req.body

        if (!campaignName || !cureentCampaignMessage) {
            return res.status(400).json({ error: "Both campaignName and campaignMessage are required !!" })
        }

        const updatedCampaign = await Campaign.findOneAndUpdate(
            { name: campaignName }, 
            { $set: { message: cureentCampaignMessage } }, 
            { upsert: false }
        )

        if (!updatedCampaign) {
            return res.status(404).json({ error: `Campaign with name "${campaignName}" not found!` })
        }

        res.status(200).json({ message: "Campaign updated successfully !! ", updatedCampaign })
    } catch (error) {
        console.error("Error updating campaign message:", error)
        res.status(500).json({ error: "Failed to update campaign message!" })
    }
})

export default router