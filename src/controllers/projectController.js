const Project = require('../models/Project')

const createProject = async (req, res) => {
    try{
        const { name, description } = req.body
        const newProject = new Project({ name, description, createdBy: req.user._id })
        await newProject.save()
        return res.status(201).json(newProject)
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

const getProjects = async (req, res) => {
    try{
        const projectList = await Project.find({})
        return res.status(200).json(projectList)
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

const getProjectById = async (req, res) => {
    try{
        const project = await Project.findById(req.params.id)
        if(!project) return res.status(404).json({ message: 'Project not found' })
        return res.status(200).json(project);
    }
    catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteProject = async (req, res) => { 
    try{
        const project = await Project.findById(req.params.id)
        if(!project) return res.status(404).json('Project not found')
        await Project.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: 'Project Successfuly deleted'})
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = { createProject, getProjects, getProjectById, deleteProject }