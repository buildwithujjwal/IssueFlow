const express = require('express')
const router = express.Router()
const { createProject, getProjects, getProjectById, deleteProject } = require('../controllers/projectController')
const protect = require('../middleware/authMiddleware')
const checkAdmin = require('../middleware/roleMiddleware')

router.post('/', protect, checkAdmin, createProject)
router.get('/', protect, getProjects)
router.get('/:id', protect, getProjectById)
router.delete('/:id', protect, checkAdmin, deleteProject)

module.exports = router
