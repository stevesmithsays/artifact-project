import React, { Component } from 'react';
import { connect } from 'react-redux';

class Product extends Component {
    constructor(){
        super();
    }


    render(){           
        let id = this.props.match.params.id;
         console.log(this.props.match.params.id);      
         console.log(this.props.products);

         let detailedProductView = () =>{
             if(this.props.products.length !== 0){                
            return <div className="detailed-container">
                <img src={require(`../../assets/products/${this.props.products[`${id}`].image}`)} className="detailed-picture" />

                <div className="product-info">
                  <h1>{`${this.props.products[`${id}`].name}`}</h1>
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
                  <h3>{`Price: $${this.props.products[`${id}`].price}`}</h3>
                  <button id = 'add-btn'>Add to Cart</button>
                </div>
              </div>;           
             
        }              
    }               
              return(detailedProductView());
            } //end of render method              
    
    }//end of component


const mapStateToProps = state => state;

export default connect(mapStateToProps)(Product);