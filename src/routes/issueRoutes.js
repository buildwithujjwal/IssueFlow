const express = require('express')
const router = express.Router()

const { createIssue,  getIssuesByProject, updateIssue, deleteIssue } = require('../controllers/issueController')

const protect = require('../middleware/authMiddleware')
const checkAdmin = require('../middleware/roleMiddleware')

router.post('/:id/issues', protect, createIssue)
router.get('/:id/issues', protect, getIssuesByProject)
router.patch('/:id', protect, updateIssue)
router.delete('/:id', protect, checkAdmin, deleteIssue)

module.exports = router 