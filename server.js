const path = require('path');
const express = require('express')
const app = express()
const notes = require('./routes/notes');
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(notes);

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public", "notes.html")))
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")))

app.listen(port, (err) => console.log(err ?? `Server started on port ${port}.`))