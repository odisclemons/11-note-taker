const notes = require('express').Router();

notes.get('/notes', (req, res) => {
    res.send("You made it")
})

module.exports = notes