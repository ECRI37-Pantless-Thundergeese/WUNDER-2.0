import React, { useState, useEffect } from 'react';

const Signup = (props) => {
  return (
    <div className="signupPage">
      <div className="signupBox">
        <form className="signupForm" method="POST" action="/signup/request">
          <label htmlFor="username">Username: </label>
          <input className="formInfo" id="username" name="username" type="text"></input>
          <label htmlFor="password">Password: </label>
          <input className="formInfo" id="password" name="password" type="password"></input>
          <input className="signupBtn" type="submit" value="Sign Up"></input>
        </form>
      </div>
    </div>
  )
}

export default Signup;