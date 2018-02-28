import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

class Shop extends Component {

//on page load, pull all of the available products from the database
componentDidMount(){
    axios.get('http://localhost:3002/api/getProducts').then( (res) => {
        console.log(res.data);

    })


}

    render(){
let cardDisplay; //map over the product cards and display them.

        return(<div className = 'shop-container'>
        <h1>THIS WILL DISPLAY THE PRODUCTS WHEN I'M DONE</h1>
        </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Shop);