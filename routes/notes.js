const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const db = path.join("db", "db.json")

router.post('/api/notes', async (req, res) => {
    let { text, title } = req.body
    let note = new Note(title, text)
    let notes = await fs.readFileSync(db, 'utf8')
    notes = JSON.parse(notes);
    notes = [...notes, note]
    try {
        await fs.writeFileSync(db, JSON.stringify(notes))
        res.send(notes)
    } catch (err) {
        console.log(err)
    }
})

router.get('/api/notes', async (req, res) => {
    let notes = await fs.readFileSync(db, 'utf-8')
    console.log(notes)
    res.send("notes")
})


class Note {
    constructor(title, text) {
        this.id = uuid()
        this.title = title
        this.text = text
    }
}

module.exports = router