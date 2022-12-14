import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routing from '../components/Routing.jsx';

// uncomment so that webpack can bundle styles
import styles from './stylesheets/styles.scss';

render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>, document.getElementById('root')
);
