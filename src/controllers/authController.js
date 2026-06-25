const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body

        // checking if user already exists
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(409).json({ message: `User already exists` })
        }
        
        // giving user thier role
        const userCount = await User.countDocuments()
        let role = 'member'
        if(userCount === 0) role = 'admin'

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // creating and saving the user
        const newUser = new User({ name, email, password: hashedPassword, role})
        await newUser.save()
        
        // generating jwt tokens
        const token = jwt.sign({id: newUser.id, role: newUser.role}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'})

        //sending response back to user
        return res.status(201).json({ token, name: newUser.name, email: newUser.email, role: newUser.role })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email });

        // checking user existance
        if(!user) return res.status(401).json({ message: "Invalid credentials"})
        
        // checking password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });

        // generating jwt token
        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'})

        // sending the response back
        return res.json({ token, name: user.name, email: user.email, role: user.role })
        
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { registerUser , loginUser}