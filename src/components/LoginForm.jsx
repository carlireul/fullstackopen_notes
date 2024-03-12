import { useState } from 'react';

const LoginForm = ({username, password, setUsername, setPassword}) => {

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
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
