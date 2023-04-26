import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <Router basename='/npi-search'>
    <React.Fragment>
      <Homepage />
    </React.Fragment>
  </Router>,
  document.getElementById('root')
);