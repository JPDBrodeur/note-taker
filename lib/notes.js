const fs = require('fs');
const path = require('path');

function readNotes() {
    const notes = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    return JSON.parse(notes);
}

function writeNotes(notes) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );
}

function createNewNote(body) {
    const notes = readNotes();
    notes.push(body);
    writeNotes(notes);
}

function deleteNote(id) {
    const notes = readNotes();
    const filteredNotes = notes.filter(note => note.id !== id);
    writeNotes(filteredNotes);
    return filteredNotes;
}

module.exports = { createNewNote, readNotes, deleteNote };