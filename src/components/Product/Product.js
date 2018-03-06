//Foreign Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Local Imports
import {addToCart} from '../../ducks/reducer';



class Product extends Component {
    constructor(props){
        super(props);

        
    }


    render(){           
        let productId = this.props.match.params.id;
        let currProduct = this.props.products[`${productId}`];
        let price = this.props.products[`${productId}`].price;
        let name = currProduct.name;
        let image = currProduct.image;
        let userId = this.props.user.id;        
        console.log(this.props.addToCart);
             

         let detailedProductView = () =>{
             if(this.props.products.length !== 0){                
            return <div className="detailed-container">
                <img src={require(`../../assets/products/${image}`)} className="detailed-picture" alt = 'detailed view' />

                <div className="product-info">
                  <h1>{`${name}`}</h1>
                  <p className="product-desc">
                        Gally smartly Shiver me timbers no prey no pay
                    scurvy hands barkadeer bounty wherry jolly boat.
                    Chantey dance the hempen jig port hang the jib
                    grog take a caulk Blimey bilged on her anchor
                    Nelsons folly blow the man down. Hogshead
                    spyglass Yellow Jack topgallant list lad
                    square-rigged snow barque Jolly Roger. Piracy lanyard prow
                    Shiver me timbers gaff starboard nipperkin
                    skysail Davy Jones' Locker dead men tell no
                    tales. Jury mast hardtack belay snow topsail
                    heave down code of conduct list cutlass
                    man-of-war. Salmagundi belay bilged on her
                    anchor quarter yardarm furl scuppers Barbary
                    Coast lugsail gangplank. Bilge rat walk the
                    plank ye jury mast hardtack yardarm Nelsons
                    folly plunder wherry mizzen. League Gold Road
                    Arr loot holystone Shiver me timbers yardarm
                    warp piracy Brethren of the Coast. 
                  </p>
                  <h3>{`Price: $${price}`}</h3>
                  <button id = 'add-btn' onClick = {addToCart(userId, productId, price)}>Add to Cart</button>
                </div>
              </div>;
                     
        }              
    }               
              return(detailedProductView());
            } //end of render method              
    
    }//end of component


const mapStateToProps = state => state;

export default connect(mapStateToProps, {addToCart})(Product);