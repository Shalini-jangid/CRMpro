const TeamMember = require('../models/TeamMemberModel');

// @desc    Get all team members
exports.getTeamMembers = async (req, res) => {
  const team = await TeamMember.find();
  res.json(team);
};

// @desc    Create new team member
exports.createTeamMember = async (req, res) => {
  const member = new TeamMember(req.body);
  const saved = await member.save();
  res.status(201).json(saved);
};

// @desc    Update member
exports.updateTeamMember = async (req, res) => {
  const updated = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// @desc    Delete member
exports.deleteTeamMember = async (req, res) => {
  await TeamMember.findByIdAndDelete(req.params.id);
  res.json({ message: 'Team member deleted' });
};
