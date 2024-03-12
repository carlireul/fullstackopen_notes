import { useState } from 'react';
import loginService from '../services/loginService';
import noteService from '../services/noteService';

function LoginForm({
  username, password, setUsername, setPassword, user, setUser, setErrorMessage,
}) {
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => { setErrorMessage(null); }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      {' '}
      <div>
        {' '}
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      {' '}
      <button type="submit">login</button>
      {' '}

    </form>
  );
}

export default LoginForm;
