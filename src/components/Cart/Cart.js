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
            console.log(this.props.cart);
             cartDisplay = () => {
                return(
                    <div>{this.props.cart.order_id}                        
                    </div>
                );
                

            }
        }

        return(<div className = 'cart-container'>
        <h1>Shopping Cart</h1>
        {cartDisplay()}
        

        </div>)
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Cart);






