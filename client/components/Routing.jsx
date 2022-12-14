import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Signup from '../pages/Signup.jsx';
import Login from '../pages/Login.jsx';
import App from '../pages/App.jsx';

const Routing = (props) => {
  return (
    <div className="router">
      {/* content seen on every page */}
      <div className="routerMain" id="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<App />} />
        </Routes>
      </div>
    </div>
  );
};

export default Routing;
