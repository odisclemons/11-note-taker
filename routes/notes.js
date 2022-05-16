const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const db = path.join(__dirname, "../", "db", "db.json")
const emptyNotes = JSON.stringify({ notes: [] })

router.post('/api/notes', async (req, res) => {
    let { text, title } = req.body
    let newNote = new Note(title, text)
    let notes = await getNotes()
    notes = { notes: [...notes, newNote] }
    try {
        notes = await saveNotes(notes)
        res.send(notes)
    } catch (err) {
        console.log(err)
        res.status(500).send("Could not save note.")
    }
})

router.get('/api/notes', async (req, res) => {
    return getNotes()
        .then(notes => res.send(notes))
        .catch(() => res.status(500).send("Could not save note."))
})

router.delete('/api/notes/:id', async (req, res) => {
    let { id } = req.params
    let notes = await getNotes()
    notes = notes.filter(note => {
        console.log(note.id === id)
        return note.id !== id
    })
    notes = await saveNotes(notes)
    res.send(notes)
})


class Note {
    constructor(title, text) {
        this.id = uuid()
        this.title = title
        this.text = text
    }
}

async function getNotes() {
    await checkDbExist()
    let data = await fs.readFileSync(db, 'utf-8')
    console.log(data)
    let { notes } = JSON.parse(data)
    return notes
}

async function saveNotes(notes) {
    await checkDbExist()
    if (Array.isArray(notes)) notes = { notes }
    await fs.writeFileSync(db, JSON.stringify(notes))
    return notes
}

// check if that path exists before trying to use it
async function checkDbExist() {
    try {
        await fs.accessSync(db)
    } catch (err) {
        //make the folder first
        await fs.mkdirSync(path.join(__dirname, "../", "db"))

        //make the file second
        await fs.writeFileSync(db, emptyNotes, 'utf-8')
    }
}
module.exports = router