const express = require('express')
const router = express.Router()

const checkToken = require('../middleware/cookieAuthMiddleware')

router.get('/auth/login', (req, res) => {
    res.render('login', {error: null})
})

router.get('/auth/register', (req, res) => {
    res.render('register', {error: null})
})

router.get('/dashboard', checkToken, (req, res) => {
    res.render('dashboard', {user: req.user})
}
)

module.exports = router