import mongoose from 'mongoose'

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  audienceCriteria: {
    type: String,
    required: true // To store that this audience segment was for which criteria
  },
  message: {
    type: String
  },
}, {timestamps: true})

export const Campaign = mongoose.model('Campaign', campaignSchema)