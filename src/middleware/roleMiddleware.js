const checkAdmin = async (req, res, next) => {
    try{
        if(req.user.role != 'admin') return res.status(403).json({message: 'user not authorised'})
        next()
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = checkAdmin