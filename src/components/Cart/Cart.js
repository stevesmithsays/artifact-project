//Foreign Imports
import React, {Component} from 'react';
import {connect} from 'react-redux';

//Local Imports
import Checkout from '../Checkout/Checkout';
import { getCart } from '../../ducks/reducer';
import { deleteFromCart } from '../../ducks/reducer';

class Cart extends Component {
    constructor(props){
        super(props);
       

        this.handleTotal = this.handleTotal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

componentDidMount(){      
    this.props.getCart();    
}

handleTotal = () => {
    const {cart} = this.props;
    let total;
    if(cart !== undefined && cart.length !== 0){
         total = cart.map( (curr, index) => {
            return (curr.unit_price);
        }).reduce(function(a,b){
            return a+b;
        });
    }
    return total;
}

handleDelete = (productId) => {
    const {deleteFromCart, getCart} = this.props;   
    deleteFromCart(productId);
    getCart();
}




    render(){      
          
        let cartDisplay; 
        if(this.props.cart !== undefined && this.props.cart.length > 0){ 
             cartDisplay = this.props.cart.map( (curr, index) => {           

                return(<div key = {index} className = 'cart-item-container'>
                <div className = 'cart-image-container'>
                <img src={curr.image ? require(`../../assets/products/${curr.image}`) : null} className = 'card-pic' id = 'cart-pic' alt = 'cart-item'/>
                </div>
                <div className = 'cart-text-container'>           
                <h4>{curr.name}</h4>             
                <h4>Price: ${curr.unit_price}</h4>
                <button className = 'delete-item' key = {index} onClick = {() => {this.handleDelete(curr.product_id)}}>DELETE ITEM</button>  
                </div>                         
                </div>);
             })                             
        } 
      
        return <div className="cart-container">
            <h1>Shopping Cart</h1>
            {cartDisplay}
            <div id="total">
            <h3>GRAND TOTAL: ${this.handleTotal()}</h3>
            <Checkout name = {'Artifact Fine Goods LLC'}
        description = {'Thank you for shopping with us!'}
        amount = {this.handleTotal()}/> 
            </div>
             
          </div>;
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getCart, deleteFromCart})(Cart);






