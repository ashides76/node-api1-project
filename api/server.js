// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS
server.get('/hello-world', (req, res) => {
    res.status(200).json({message: "hello, world!"})
})

server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({message: `Error fetching users data: ${err.message}`})
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}