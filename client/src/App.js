import React, { Fragment } from 'react';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';



import NavBar from './components/layout/Navbar';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';

import './App.css';

const App=()=> {
  return (
  <AuthState>
   <ContactState>
    <Router>
      <Fragment>
      <NavBar />
      <div className="contain">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/register" component={Register}/>
          
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
      </Fragment>
      </Router>
    </ContactState>
    </AuthState>
  );
}

export default App;
