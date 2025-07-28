const express = require('express')
const router  = express.Router()
const summarizeVideo  = require('../controllers/summaryController')

router.post('/summarize',summarizeVideo)

module.exports = router 
