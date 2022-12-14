import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  return (
    <div className="loginPage">
      <div className="loginBox">
        <form className="loginForm" method="POST" action="/login">
          <input className="formInfo" id="username" name="username" type="text" placeholder="Username"></input>
          <input className="formInfo" id="password" name="password" type="password" placeholder="Password"></input>
          <input className="loginBtn" type="submit" value="Login"></input>
        </form>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}

export default Login;