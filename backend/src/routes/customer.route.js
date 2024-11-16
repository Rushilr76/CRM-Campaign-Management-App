import dotenv from "dotenv"
import { Router } from "express"
import { Customer } from "../models/Customer.model.js"

dotenv.config({path: "./.env"}) // .env file is under root directory 

const router = Router()

// Fetch all customers (for audience management page)
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find()
        res.status(200).json(customers)
    } catch (error) {
        console.error("Error fetching customers !! ", error)
        res.status(500).json({message : "Failed to fetch customers" })
    }
})
  
// Add a new customer (for POSTMAN demostration)
router.post("/", async (req, res) => {
    try {
        const newCustomer = new Customer(req.body)
        const savedCustomer = await newCustomer.save()
        res.status(201).json(savedCustomer)
    } catch (error) {
        console.error("Error adding customer:", error)
        res.status(500).json({ error: "Failed to add customer" })
    }
})

export default router