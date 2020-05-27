import React, { Fragment } from 'react';

import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';

import NavBar from './components/layout/Navbar';

const App=()=> {
  return (
   <Router>
    <Fragment>
    <NavBar />
     <div className="contain">
       <Switch>
         <Route exact path="/" component={Home}/>
         <Route exact path="/about" component={About}/>

       </Switch>
     </div>
    </Fragment>
    </Router>
  );
}

export default App;
