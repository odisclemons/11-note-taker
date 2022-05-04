const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const db = path.join("db", "db.json")

router.post('/api/notes', async (req, res) => {
    let { text, title } = req.body
    let newNote = new Note(title, text)
    let notes = await getNotes()
    notes = { notes: [...notes, newNote] }
    console.log(notes)
    try {
        await fs.writeFileSync(db, JSON.stringify(notes))
        res.send(notes.notes)
    } catch (err) {
        console.log(err)
    }
})

router.get('/api/notes', async (req, res) => {
    return getNotes().then(notes => res.send(notes))
})


class Note {
    constructor(title, text) {
        this.id = uuid()
        this.title = title
        this.text = text
    }
}

async function getNotes() {
    let data = await fs.readFileSync(db, 'utf-8')
    let { notes } = JSON.parse(data)
    return notes
}

module.exports = router