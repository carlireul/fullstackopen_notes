import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/noteService';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    noteService.setToken(null);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      { user === null
        ? <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} user={user} setUser={setUser} setErrorMessage={setErrorMessage} />
        : (
          <div>
            <p>
              {user.name}
              {' '}
              logged-in
            </p>
            <button onClick={() => { handleLogOut(); }}>log out</button>
            <NoteForm newNote={newNote} setNewNote={setNewNote} notes={notes} setNotes={setNotes} />
          </div>
        )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show
          {' '}
          {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => { toggleImportanceOf(note.id); }}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
