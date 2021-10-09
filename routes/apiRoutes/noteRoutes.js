const router = require('express').Router();
const createNewNote = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    // set id with npm package uniqid
    req.body.id = uniqid();

    // if the note does not contain a title, send 400 error back
    if (!req.body.title) {
        res.status(400).send('The note was not given a title.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});