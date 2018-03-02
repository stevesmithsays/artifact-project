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
            return(<div className = 'detailed-container'><h1>{`${this.props.products[`${id}`].name}`}</h1>
            <img src = {require(`../../assets/products/${this.props.products[`${id}`].image}`)} className = 'detailed-picture'/></div>
             );
        }              
    }               
              return(detailedProductView());
            }               
    
    }


const mapStateToProps = state => state;

export default connect(mapStateToProps)(Product);