import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    render(){
        return (<header className="header-container">
            <ul className="logo-container">
              <Link to='/'><li className="logo">ART||FACT</li></Link></ul>          
            <ul className = 'nav-container'>
             <Link to = '/shop'><li className="nav-element">Shop</li></Link>
              <Link to = '/story'><li className="nav-element">Story</li></Link>
              <Link to = '/contact'><li className="nav-element">Contact</li></Link>
              <a href = 'http://localhost:3002/auth' ><li className = 'nav-element' id = 'login'>Login</li></a>
              <Link to = '/cart'><li className = 'nav-element'>Cart</li></Link>
              </ul></header>);
    }
}

export default Header;