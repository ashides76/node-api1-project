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

// SELECT * FROM users;
server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({message: "The users information could not be retrieved"})
    }
})

// SELECT * FROM users WHERE id = 1;
server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const userById = await Users.findById(id)
        if (!userById) {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        } else {
            res.status(200).json(userById)
        }
    } catch (err) {
        res.status(500).json({message: "The users information could not be retrieved"})
    }
})

// INSERT INTO users (name, bio) VALUES ('foo', 'bar');
server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        const newUser = await Users.insert({name, bio})
        if (!name || !bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({message: "There was an error while saving the user to the database"})
    }
})

 // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
 server.put('/api/users/:id', async (req, res) => {
    try {
        const {name, bio} = req.body
        const { id } = req.params
        const updatedUser = await Users.update(id, {name, bio})
        if (!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            if (!updatedUser) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                }) 
            } else {
                res.status(200).json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
 })

// DELETE FROM users WHERE id = 1;
server.delete('/api/users/:id', async (req, res) => {
    try{
        const { id } = req.params
        const removedUser = await Users.remove(id)
        if (!removedUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.status(200).json(removedUser)
        }
    } catch (err) {
        res.status(500).json({message: "The user could not be removed"})
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}