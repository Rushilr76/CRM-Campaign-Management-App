import cors from "cors"
import express from "express"

const app = express()

app.use(cors({
    origin: ["https://crm-campaign-management-app.vercel.app", "https://crm-campaign-management-app-vdtw.vercel.app"], 
    credentials: true,
    methods: ["GET", "POST", "PUT"]
}))

app.use(express.json({limit: "32kb"}))
app.use(express.urlencoded({limit: "32kb", extended: true}))
app.use(express.static("public"))

import authRoutes from "./routes/auth.route.js"
import customerRoutes from "./routes/customer.route.js"
import orderRoutes from "./routes/order.route.js"
import campaignRoutes from "./routes/campaign.route.js"
import messageRoutes from "./routes/message.route.js"
import communicationLogRoutes from "./routes/communication_log.route.js"
import deliveryReceiptRoutes from "./routes/deliveryReceipt.route.js"
import googleAuthRoutes from "./routes/google_auth.route.js"

app.use('/api/auth', authRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use('/api/communicationLog', communicationLogRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/deliveryReceipt', deliveryReceiptRoutes)
app.use('/api/auth/google-login', googleAuthRoutes)

export default app