import React from 'react';
import logo from './logo.svg';
import './App.css';
import ViewEmployeeComponent from '../src/viewComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
       <div className="container">
          <Switch> 
             <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
          </Switch>
        </div>
        </Router>
    </div>
  );
}

export default App;
