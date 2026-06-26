const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token) return res.redirect('/auth/login')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decoded)
        req.user = decoded
        next()
    }
    catch(error){
        next(error)
    }
}   
module.exports = checkToken