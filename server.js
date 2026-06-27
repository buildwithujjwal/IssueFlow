    const express = require('express')
    const dotenv = require('dotenv')
    const cookieParser = require('cookie-parser')

    const connectDB = require('./src/config/db')
    const checkError = require("./src/middleware/errorMiddleware");

    const authRoutes = require('./src/routes/authRoutes')
    const projectRoutes = require('./src/routes/projectRoutes')
    const issueRoutes = require('./src/routes/issueRoutes')
    const commentRoutes = require('./src/routes/commentRoutes')
    const viewRoutes = require('./src/routes/viewRoutes')
    

    dotenv.config()
    connectDB()

    const app = express()
    app.use(express.json())
    app.use(cookieParser())
    
    app.set('view engine', 'ejs')
    app.set('views', './src/views') 

    app.use('/api/auth', authRoutes)

    app.use('/api/projects', projectRoutes)

    app.use('/api/projects', issueRoutes)    
    app.use('/api/issues', issueRoutes) 

    app.use('/api/issues', commentRoutes)
    app.use('/api/comments', commentRoutes)

    app.use('/', viewRoutes)

    app.use('/src/uploads', express.static('src/uploads'))

    app.get('/', (req, res) => {
        res.json({message: 'IssueFlow API is running'})
    })

    app.use(checkError)

    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    })

