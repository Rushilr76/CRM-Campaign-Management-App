import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import { User } from '../models/User.model.js'; // Replace with your User model
import { Router } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = Router()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

router.post('/', async (req, res) => {
  try {
    const { token } = req.body
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    
    let user = await User.findOne({ email: payload.email })
    
    if (!user) {
        user = new User({
            email: payload.email,
            password: payload.password
        })
        await user.save()
    }
    
    // Generate JWT token
    const jwtToken = jwt.sign(
        { 
            userId: user._id 
        }, 
            process.env.JWT_SECRET, 
        {
            expiresIn: '1h',
        }
    )
    
    res.status(200).json({ token: jwtToken });
  } catch (error) {
    console.error('Google login error !!', error);
    res.status(500).json({ message: 'Google login failed !!' });
  }
})

export default router