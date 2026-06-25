const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./src/config/db')
const authRoutes = require('./src/routes/authRoutes')

dotenv.config()
connectDB()

const app = express()
app.use(express.json()) 
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({message: 'IssueFlow API is running'})
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})