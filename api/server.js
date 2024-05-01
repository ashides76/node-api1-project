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
        res.status(500).json({message: `Error fetching users data: ${err.message}`})
    }
})

// SELECT * FROM users WHERE id = 1;
server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const userById = await Users.findById(id)
        if (!userById) {
            res.status(404).json({
                message: `Error feching user by id: ${id}`,
            })
        } else {
            res.status(200).json(userById)
        }
    } catch (err) {
        res.status(500).json({message: `Error fetching user by id: ${err.message}`})
    }
})

// INSERT INTO users (name, bio) VALUES ('foo', 'bar');
server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        const addUser = await Users.insert({name, bio})
        if (!name || !bio) {
            res.status(422).json({
                message: 'You must include name and bio'
            })
        } else {
            res.status(201).json({
                message: `${addUser.name}, has been created successfully`,
                data: addUser,
            })
        }
    } catch (err) {
        res.status(500).json({message: `Error adding a new user: ${err.message}`})
    }
})

 // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
 server.put('/api/users/:id', async (req, res) => {
    try {
        const {name, bio} = req.body
        const { id } = req.params
        const updatedUser = await Users.update(id, {name, bio})
        if (!name, !bio) {
            res.status(422).json({
                message: `Must include name and bio`
            })
        } else {
            if (!updatedUser) {
                res.status(404).json({
                    message: `No user by given id, ${id}`
                }) 
            } else {
                res.status(200).json({
                    message: `Updated ${name}, successfully!`,
                    data: updatedUser
                })
            }
        }
    } catch (err) {
        res.status(500).json({message: `Error updating a user: ${err.message}`})
    }
 })

// DELETE FROM users WHERE id = 1;
server.delete('/api/users/:id', async (req, res) => {
    try{
        const { id } = req.params
        const removedUser = await Users.remove(id)
        if (!removedUser) {
            res.status(404).json({
                message: `No user by given id, ${id}`
            })
        } else {
            res.status(200).json({
                message: `${removedUser.name}, successfully removed`,
                body: removedUser
            })
        }
    } catch (err) {
        res.status(500).json({message: `Error removing a user: ${err.message}`})
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}