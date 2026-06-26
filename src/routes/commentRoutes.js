const express = require('express')
const router = express.Router()

const {addComment, getCommentsByIssue, deleteComment} = require('../controllers/commentController')
const protect = require('../middleware/authMiddleware')

router.post('/:id/comments', protect, addComment)
router.get('/:id/comments', protect, getCommentsByIssue)
router.delete('/:id', protect, deleteComment)

module.exports = router