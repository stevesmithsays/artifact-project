//Foreign Imports
import React, {Component} from 'react';
import { connect } from 'react-redux';

//Local Imports
import {updateProfile} from '../../ducks/reducer';

class Profile extends Component {
    constructor(){
        super();

        this.state = {
            style: [],
            origin: []
        }
    }

    render(){       
        const {style, origin} = this.state;
        const {id} = this.props.user;
        
        return <div className="profile-container">
            <section className="profile-text">
              <h1>Your Profile</h1>
              <span className="tag">PREFERRED DESIGN STYLE: </span>
              <br />
              <input name="style" type="text" onChange={e => {
                  this.setState({ style: e.target.value });
                }} />
              <br />
              <span className="tag">FAVORITE COUNTRY OF ORIGIN: </span>
              <br />
              <input name="origin" type="text" onChange={e => {
                  this.setState({ origin: e.target.value });
                }} />
              <br />
              <button className="update-btn" onClick={() => {
                  this.props.updateProfile(style, origin, id);
                }}>
                Update Profile
              </button>
            </section>
            <img src={require("../../assets/products/walkway.png")} className="profile-pic" alt="walkway" />
          </div>;
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {updateProfile})(Profile);