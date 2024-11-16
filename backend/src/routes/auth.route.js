import dotenv from "dotenv"
import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"
import authMiddleware from "../middlewares/auth.middleware.js"

dotenv.config({path: "./.env"}) // .env file is under root directory 

const router = Router()

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      // throw new ApiError(400, 'User already exists !!') // throwing triggers catch block automatically so i got 500 err
      return res.status(400).json({ message: 'User already exists !!' })
    }

    const user = new User({ email, password })
    await user.save()

    res.status(201).json({ message: 'User registered successfully !!' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error !!' })
  }
})

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Email not registered !!' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password !!' })
    }

    const token = jwt.sign(
        { 
            userId: user._id 
        }, 
            process.env.JWT_SECRET, 
        {
            expiresIn: '1h',
        }
    )

    res.status(200).json({ token, userId: user._id })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error !!' })
  }
})

// router.get('/dashboard', authMiddleware, (req, res) => {
//     res.json({ message: 'Welcome to the dashboard!' });
// });

export default router