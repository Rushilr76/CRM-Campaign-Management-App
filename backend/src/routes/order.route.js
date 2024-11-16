import dotenv from "dotenv"
import { Router } from "express"
import { Order } from "../models/Order.model.js"


dotenv.config({path: "./.env"}) // .env file is under root directory 

const router = Router()

// Fetch all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.error("Error fetching orders !! ", error)
        res.status(500).json({message : "Failed to fetch orders" })
    }
});
  
// Add a new customer (for POSTMAN demostration)
router.post("/", async (req, res) => {
    try {
        const newOrder = new Order(req.body)
        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error adding order !! ", error)
        res.status(500).json({ error: "Failed to add order !!" })
    }
})

export default router