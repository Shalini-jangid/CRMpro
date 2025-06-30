const Pipeline = require('../models/PipelineModel');

// @desc    Get all pipelines
exports.getPipelines = async (req, res) => {
  const data = await Pipeline.find();
  res.json(data);
};

// @desc    Create a new pipeline
exports.createPipeline = async (req, res) => {
  const pipeline = new Pipeline(req.body);
  const saved = await pipeline.save();
  res.status(201).json(saved);
};

// @desc    Update a pipeline
exports.updatePipeline = async (req, res) => {
  const updated = await Pipeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// @desc    Delete a pipeline
exports.deletePipeline = async (req, res) => {
  await Pipeline.findByIdAndDelete(req.params.id);
  res.json({ message: 'Pipeline deleted' });
};
