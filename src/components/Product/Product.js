//Foreign Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Local Imports
import {addToCart} from '../../ducks/reducer';



class Product extends Component {    
 

render(){ 
             

  const detailedProductView = () =>{
    // let productId = parseInt(this.props.match.params.id);
      if(this.props.products.length !== 0){
  //variables for dynamically rendered detailed product component 
        let productIndex = this.props.match.params.id;
        let currProduct = this.props.products[`${productIndex}`];
        console.log(currProduct);
        let productId = currProduct.id;
        let price = this.props.products[`${productIndex}`].price;
        let name = currProduct.name;
        let image = currProduct.image;
        let userId = this.props.user.id;     
         
          return (
            <div className="detailed-container">
              <img
                src={require(`../../assets/products/${image}`)}
                className="detailed-picture"
                alt="detailed view"/>

              <div className="product-info">
                <h1>{`${name}`}</h1>
                <p className="product-desc">
                  Zombies reversus ab inferno, nam malum cerebro. De carne animata corpora
                  quaeritis. Summus sit​​, morbo vel maleficia? De Apocalypsi undead
                  dictum mauris. Hi mortuis soulless creaturas, imo monstra adventus
                  vultus comedat cerebella viventium. Qui offenderit rapto, terribilem
                  incessu. The voodoo sacerdos suscitat mortuos comedere carnem. Search
                  for solum oculi eorum defunctis cerebro. Nescio an Undead zombies. Sicut
                  malus movie horror.
                </p>
                <h3>{`Price: $${price}`}</h3>
                <button id="add-btn" onClick= {() => this.props.addToCart(userId, productId, price)}>
                  Add to Cart
                </button>
              </div>
            </div>
                  );
                }              
              }

      //render method's return here               
      return(detailedProductView());
    } //end of render method              

}//end of component


const mapStateToProps = state => state;

export default connect(mapStateToProps, {addToCart})(Product);