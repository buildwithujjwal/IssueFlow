const express = require('express')
const router = express.Router()

const upload = require('../config/multer')

const { createIssue, getIssuebyId, getIssuesByProject, updateIssue, deleteIssue } = require('../controllers/issueController')

const protect = require('../middleware/authMiddleware')
const checkAdmin = require('../middleware/roleMiddleware')

router.post('/:id/issues', protect, upload.single('attachment'), createIssue)
router.get('/:id', protect, getIssuebyId)
router.get('/:id/issues', protect, getIssuesByProject)
router.patch('/:id', protect, updateIssue)
router.delete('/:id', protect, checkAdmin, deleteIssue)

module.exports = router 