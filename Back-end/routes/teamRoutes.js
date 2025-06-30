const express = require('express');
const router = express.Router();
const teamCtrl = require('../controllers/teamController');

// You can add auth middleware
router.get('/', teamCtrl.getTeamMembers);
router.post('/', teamCtrl.createTeamMember);
router.put('/:id', teamCtrl.updateTeamMember);
router.delete('/:id', teamCtrl.deleteTeamMember);

module.exports = router;
