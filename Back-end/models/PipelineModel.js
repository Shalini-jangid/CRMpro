const mongoose = require('mongoose');

const pipelineSchema = new mongoose.Schema({
  company: { type: String, required: true },
  value: { type: Number, required: true },
  stage: { type: String, enum: ['Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'], default: 'Qualified' },
  manager: { type: String },
  probability: { type: Number, default: 50 },
}, { timestamps: true });

module.exports = mongoose.model('Pipeline', pipelineSchema);
