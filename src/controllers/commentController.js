const Comment = require('../models/Comment')

const addComment = async (req, res, next) => {
    try{
        const {body} = req.body;
        const newComment = new Comment({issue: req.params.id, author: req.user._id, body: body})
        await newComment.save()
        return res.status(201).json(newComment)
    }
    catch(error){
        next(error)
    }
}

const getCommentsByIssue = async (req, res, next) => {
    try{
        const Comments = await Comment.find({issue: req.params.id}).populate('author')
        if(Comments.length == 0) return res.status(404).json({message: 'No Comment Found'})
        return res.status(200).json(Comments)
    }
    catch(error){
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try{
        const commentToDelete = await Comment.findById(req.params.id)
        if(!commentToDelete) return res.status(404).json({message: 'comment not found'})
        if(commentToDelete.author.toString() != req.user._id.toString()) return res.status(403).json({message: 'user not authorised'})
        await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: 'Comment deleted Successfuly'})
    }
    catch(error){
        next(error)
    }
}

module.exports = {addComment, getCommentsByIssue, deleteComment}