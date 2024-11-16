import { Router } from "express"
import { Communication_log } from "../models/Communication_log.model.js"

const router = Router()

router.post('/', async (req, res) => {
    try {
        const { campaignName, filteredAudience } = req.body

        console.log(`DeliveryReceipt API called for campaign: ${campaignName}. `)

        if (!filteredAudience || filteredAudience.length === 0) {
            return res.status(400).json({ error: 'Filtered audience array is empty.' })
        }

        const updateDelieveryStatus = filteredAudience.map(async (audience) => {
            try {
                console.log(`Sending message to ${audience.customerName} for campaign ${campaignName} `)

                await Communication_log.updateOne(
                    { campaign: campaignName, customerId: audience.customerId },
                    {   $set: { 
                            status: Math.random() > 0.1 ? 'SENT' : 'FAILED'
                        } 
                    },
                    { upsert: false } // This ensures document exists, do not insert new ones
                )

                return { customerId: audience.customerId, status: 'SENT' }
            } catch (error) {
                console.error(`Failed to update delivery status for the filtered audience !! `, error)
                res.status(500).json({ error: 'Internal server error while updating delivery status !! ' })
            }
        })
        
        // Wait for all updates to complete
        await Promise.all(updateDelieveryStatus)

        res.status(200).json({
            message: 'Delivery receipt API processing completed.'
        })
    } catch (error) {
        console.error('Error in DeliveryReceipt API !!', error)
        res.status(500).json({ error: 'Internal server error while updating delivery status !! ' })
    }
})

export default router