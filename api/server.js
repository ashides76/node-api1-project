// BUILD YOUR SERVER HERE
const express = require('express')
// const Users = require('./users/model')np

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS
server.get('/hello-world', (req, res) => {
    res.status(200).json({message: "hello, world!"})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}