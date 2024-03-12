import { useState } from 'react';
import noteService from '../services/noteService';

const NoteForm = ({newNote, setNewNote, notes, setNotes}) => {

	const addNote = (event) => {
		event.preventDefault();

		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
		};

		noteService
			.create(noteObject)
			.then((returnedNote) => {
				setNotes(notes.concat(returnedNote));
				setNewNote('');
			});
	};

	const handleNoteChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value);
	};

	return (
		<form onSubmit={addNote}>
			<input value={newNote} onChange={handleNoteChange} />
			<button type="submit">save</button>
		</form>
	)
}

export default NoteForm