const router = require('express').Router();
const { createNewNote, readNotes, deleteNote } = require('../../lib/notes');
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
    res.json(readNotes());
});

router.post('/notes', (req, res) => {
    // if the note does not contain a title, send 400 error back
    if (!req.body.title) {
        res.status(400).send('The note was not given a title.');
    } else {
        // set id with npm package uniqid
        req.body.id = uniqid();
        createNewNote(req.body);
        res.json(req.body);
    }
});

router.delete('/notes/:id', (req, res) => {
    const updatedNotes = deleteNote(req.params.id);
    res.json(updatedNotes);
});

module.exports = router;