import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Story from './components/Story/Story';
import Contact from './components/Contact/Contact';

export default (
    <Switch>
        <Route exact path = '/' component = {Home} />    
        <Route path = '/shop' component = {Shop} />  
        <Route path = '/story' component = {Story} />
        <Route path = '/contact' component = {Contact}/>
        
    </Switch>
)

