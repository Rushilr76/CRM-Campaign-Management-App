import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: { 
        type: String 
    },
    lastVisit: {
        type: Date,
        default: Date.now
    },
    totalSpent: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

export const Customer = mongoose.model('Customer', customerSchema);