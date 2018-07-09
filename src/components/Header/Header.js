import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Header extends Component {


  handleClick = () => {
    let dropDn = this.dropDn;
    if (dropDn.classList.contains('show-drop-down')) {
      dropDn.classList.remove('show-drop-down');
    } else if (dropDn.style.display === '') {
      dropDn.classList.add('show-drop-down');
      return;
    }
  };

  render() {
    return (
      <header className="header-container">
        <ul className="logo-container">
          <Link to="/">
            <li className="logo">ART||FACT</li>
          </Link>
        </ul>
        <ul className="nav-container">
          <Link to="/shop">
            <li className="nav-element">Shop</li>
          </Link>
          <Link to="/story">
            <li className="nav-element">Story</li>
          </Link>
          <Link to="/contact">
            <li className="nav-element">Contact</li>
          </Link>

          {this.props.user.id ? (
            <li className="nav-element">
              <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
            </li>
          ) : (
            <li className="nav-element" id="login">
              <a href={process.env.REACT_APP_LOGIN}>Login</a>
            </li>
          )}
          <Link to="/profile">
            <li className="nav-element">Profile</li>
          </Link>
          <Link to="/cart">
            <li className="nav-element">Cart</li>
          </Link>
        </ul>
        <div
          className="mobile-menu"
          ref={menuBtn => (this.menuBtn = menuBtn)}
          onClick={this.handleClick}
        >
          Menu
        </div>
        <div
          className="mobile-drop-down"
          ref={dropDn => {
            this.dropDn = dropDn;
          }}
        >
          <ul>
            <Link to="/shop">
              <li>Shop</li>
            </Link>
            <Link to="/story">
              <li>Story</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
            {this.props.user.id ? (
              <li>
                <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
              </li>
            ) : (
              <li>
                <a href={process.env.REACT_APP_LOGIN}>Login</a>
              </li>
            )}
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/cart">
              <li>Cart</li>
            </Link>
          </ul>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(Header));
