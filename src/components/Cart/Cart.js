//Foreign Imports
import React, {Component} from 'react';
import {connect} from 'react-redux';

//Local Imports


class Cart extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let cartDisplay; 
        if(this.props.cart.length !== 0){           
             cartDisplay = this.props.cart.map( (curr, index) => {
                return(<div className = 'cart-item'>
               <span>Product Id: {curr.product_id}</span>
               <span>Price: {curr.unit_price}</span>
                </div>);
             })                             
        }

        return(<div className = 'cart-container'>
        <h1>Shopping Cart</h1>
        {cartDisplay}   
            
        
        </div>)
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Cart);






