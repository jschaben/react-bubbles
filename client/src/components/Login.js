import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const login = e => {
    e.preventDefault();
    console.log(credentials);
    axiosWithAuth().post('/login', credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/protected')
      })
      .catch(err => console.log(err))
  };

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
      <input
            type="text"
            name="username"
            placeholder="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
