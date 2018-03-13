//Foreign Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';




//Local Imports
import routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


class App extends Component {
  render() {     
      
    return (
      <div className="app">
        <Header />
        {routes}         
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(App));
