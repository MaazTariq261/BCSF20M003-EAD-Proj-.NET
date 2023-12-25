import mongoose from 'mongoose';

const actionLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    // You can add more fields as needed to capture additional information about the action
    // For example: userId, ipAddress, userAgent, etc.
  },
  { timestamps: true }
);

const ActionLog = mongoose.model('ActionLog', actionLogSchema);

export default ActionLog;