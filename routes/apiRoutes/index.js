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

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(
        path.join(__dirname, '../db/db.json'),
        (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            const json = JSON.parse(data);

            for (let i = 0; i < json.length; i++) {
                if (json[i].id === noteId) {
                    json.splice(i, 1);
                    return;
                }
            }
            fs.writeFile(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(json), 
                (err) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                        return;
                    }
                    res.send('Successfully deleted');
                });
        }); 
});

module.exports = router;