import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Product from './components/Product/Product';
import Story from './components/Story/Story';
import Contact from './components/Contact/Contact';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';


export default (
    <Switch>
        <Route exact path = '/' component = {Home} />    
        <Route path = '/shop' component = {Shop} />  
        <Route path = '/story' component = {Story} />
        <Route path = '/product/:id' component = {Product} />     
        <Route path = '/contact' component = {Contact}/>
        <Route path = '/profile' component = {Profile}/>
        <Route path = '/cart' component = {Cart} />     
        <Route path = "*" render={() => {
           return <div>
                <p className = 'wrong-address-pg'>404: NOT FOUND. Please try a different link.</p>
            </div>
        }} />
    </Switch>
)


