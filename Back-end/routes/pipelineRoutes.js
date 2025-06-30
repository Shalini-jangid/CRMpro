const express = require('express');
const router = express.Router();
const pipelineCtrl = require('../controllers/pipelineController');

// You can add authentication middleware here
router.get('/', pipelineCtrl.getPipelines);
router.post('/', pipelineCtrl.createPipeline);
router.put('/:id', pipelineCtrl.updatePipeline);
router.delete('/:id', pipelineCtrl.deletePipeline);

module.exports = router;
