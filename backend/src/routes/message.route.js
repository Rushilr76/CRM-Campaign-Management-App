import { Router } from 'express'

const router = Router()

router.post('/', async(req, res) => {
    try {
        const {currentCampaignMessage, campaignName, filteredAudience} = req.body
        console.log(`Dummy API called for ${campaignName} sending personalized message "${currentCampaignMessage}". `)

        const deliveryReceiptPayload = {
            campaignName,
            filteredAudience
        }

        const deliveryReceiptResponse = await fetch('http://localhost:8000/api/deliveryReceipt', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(deliveryReceiptPayload)
        })

        res.status(201).json({message: "Dummy API called, internally delivery receipt API called too !!"})
    } catch (error) {
        console.log("Error sending personalized message for campaign !! ", error)
        res.status(500).json({ error: "Some error in dummy message API request !! " })
    }
})

export default router