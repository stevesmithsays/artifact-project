//Foreign Imports
import React, {Component} from 'react';
import {connect} from 'react-redux';

//Local Imports
import { getCart } from '../../ducks/reducer';


class Cart extends Component {
    constructor(props){
        super(props);

        this.handleTotal = this.handleTotal.bind(this);
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


    render(){
        console.log(this.props.cart);
        let cartDisplay; 
        if(this.props.cart !== undefined && this.props.cart.length !== 0){           
             cartDisplay = this.props.cart.map( (curr, index) => {
                return(<div className = 'cart-item-container'>
                <div className = 'cart-image-container'>
                <img src={require(`../../assets/products/${curr.image}`)} className = 'card-pic' id = 'cart-pic' alt = 'cart-item' key = {index}/>
                </div>
                <div className = 'cart-text-container'>           
                <h4>{curr.name}</h4>             
                <h4>Price: ${curr.unit_price}</h4>  
                </div>                         
                </div>);
             })                             
        }

        return <div className="cart-container">
            <h1>Shopping Cart</h1>
            {cartDisplay}
            <div id="total">
              <h3>GRAND TOTAL: ${this.handleTotal()}</h3>
            </div>
          </div>;
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getCart})(Cart);






