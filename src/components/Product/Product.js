import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { addToCart } from '../../ducks/reducer';

class Product extends Component {
  constructor() {
    super();

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(userId, productId, price) {
    this.props.addToCart(userId, productId, price);
    swal('Item added to cart.');
  }

  render() {
    let { products } = this.props;

    const detailedProductView = () => {
      // let productId = parseInt(this.props.match.params.id);
      if (products.length !== 0 && products !== undefined) {
        //variables for dynamically rendered detailed product component
        let productIndex = this.props.match.params.id;
        let currProduct = this.props.products[`${productIndex}`];
        let productId = currProduct.id;
        let price = this.props.products[`${productIndex}`].price;
        let name = currProduct.name;
        let image = currProduct.image;
        let desc = currProduct.productinfo;
        let userId = this.props.user.id;

        return (
          <div className="detailed-container">
            <img
              src={require(`../../assets/products/${image}`)}
              className="detailed-picture"
              alt="detailed view"
            />
            <div className="product-info">
              <h1>{`${name}`}</h1>
              <p className="product-desc">{`${desc}`}</p>
              <h3>{`Price: $${price}`}</h3>
              <button
                id="add-btn"
                onClick={() => this.handleAdd(userId, productId, price)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      }
    };

    //render method's return here
    return detailedProductView();
  } //end of render method
} //end of component

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { addToCart }
)(Product);
