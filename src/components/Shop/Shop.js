//Foreign Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//Local Imports
import { saveProducts } from "../../ducks/reducer";

class Shop extends Component {
 

  //on page load, pull all of the available products from the database
  componentDidMount() {
    this.props.saveProducts();
  }

  render() {
    //displays and renders product cards if there are product cards to render
    let cardDisplay;

    if (this.props.products.length !== 0) {
      cardDisplay = this.props.products.map((curr, index) => {
        return (
          <Link to={`/product/${index}`} key={index}>
            <div className="card-container" key={index}>
              <div className="text-container">
                <img
                  src={require(`../../assets/products/${curr.image}`)}
                  className="card-pic"
                  alt="product"
                  key={index}
                />
                <span className = 'item-name'>{curr.name}</span>
              </div>
            </div>
          </Link>
        );
      });
    }

    return <div className="shop-container">{cardDisplay}</div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { saveProducts })(Shop);
