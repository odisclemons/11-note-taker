const fs = require('fs');
const express = require('express')
const app = express()
const notes = require('./routes/notes');

app.use(notes);

app.listen(5000, (err) => console.log(err ?? "Server started on port 5000."))