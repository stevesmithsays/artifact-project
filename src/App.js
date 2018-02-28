//Local Imports
import React, { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

//Foreign Imports
import routes from './routes';
import axios from 'axios';

class App extends Component {

//Requesting to the test endpoint
  componentDidMount(){
    //test endpoint moved to home and being used to grab current user

  }

  render() {     
    //consolelogging state as this.props
    // console.log(this.props);   
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
