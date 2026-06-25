const Issue = require('../models/Issue')
const { findByIdAndDelete } = require('../models/User')

const createIssue = async (req, res) => {
    try{
        const {title, description, assignedTo} = req.body
        const newIssue = new Issue({title, description, project: req.params.id, createdBy: req.user._id, assignedTo})
        await newIssue.save()
        return res.status(201).json(newIssue)
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}

const getIssuesByProject = async (req, res) => {
    try{
        const issues = await Issue.find({project: req.params.id})
        if(issues.length == 0) return res.status(404).json({message: 'No Issue Found'})
        return res.status(200).json(issues)
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}

const updateIssue = async (req, res) => {
    try{
        const {title, description, assignedTo, status, priority} = req.body
        
        if(! await Issue.findByIdAndUpdate(req.params.id, {title, description, assignedTo, status, priority})) return res.status(404).json({message: 'Issue Not Found'})

        return res.status(200).json({message: 'Issue seccussfuly Updated'})
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}

const deleteIssue = async (req, res) => {
    try{
        if(! await Issue.findByIdAndDelete(req.params.id)) return res.status(404).json({message: 'Issue Not Found'})
        return res.status(200).json({ message: 'Issue successfuly deleted'})
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { createIssue, getIssuesByProject, updateIssue, deleteIssue }