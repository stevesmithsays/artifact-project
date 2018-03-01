//Foreign Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';



//Local Imports
import { saveProducts } from '../../ducks/reducer';

class Shop extends Component {
    constructor(){
        super();
    }

//on page load, pull all of the available products from the database
componentDidMount(){
    this.props.saveProducts();
}

    render(){ 
        //displays and renders product cards if there are product cards to render
        let cardDisplay;                
        if(this.props.products.length !== 0){            
            cardDisplay = this.props.products.map( (curr, index) => {              
                            
                return(<div className = 'product-container' key = {index}>
                <div className = 'text-container'>                
                <img src={require(`../../assets/products/${curr.image}`)} className = 'card-pic' alt = 'product picture'/>
                <h2>{curr.name}</h2>
                </div>
                </div>);               
                })      
            }  

        return(<div className = 'shop-container'>        
        {cardDisplay}
        </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {saveProducts})(Shop);