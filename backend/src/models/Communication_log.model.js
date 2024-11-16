import mongoose from 'mongoose'

const communicationLogSchema = new mongoose.Schema({
  campaign: {
    type: String,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Sent', 'Failed', 'Pending'],
    default: 'Pending'
  }
}, {timestamps: true})

export const Communication_log = mongoose.model('Communication_log', communicationLogSchema)