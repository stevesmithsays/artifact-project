//Foreign Imports
import React, {Component} from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';

//Local Imports
import {updateProfile} from '../../ducks/reducer';

class Profile extends Component {
    constructor(){
        super();

        this.state = {
            style: [],
            origin: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(style, origin, id){
        this.props.updateProfile(style, origin, id);
        swal('Profile successfully updated.');
        document.querySelector('.style').value = '';
        document.querySelector('.origin').value = '';
    }

    render(){       
        const {style, origin} = this.state;
        const {id} = this.props.user;
        let inputValue = document.querySelectorAll('input.val');
        console.log(inputValue);
        
        return <div className="profile-container">
            <section className="profile-text">
              <h1>Your Profile</h1>
              <span className="tag">PREFERRED DESIGN STYLE: </span>
              <br />
              <input className="style" type="text" onChange={e => {
                  this.setState({ style: e.target.value });
                }} />
              <br />
              <span className="tag">FAVORITE COUNTRY OF ORIGIN: </span>
              <br />
              <input className="origin" type="text" onChange={e => {
                  this.setState({ origin: e.target.value });
                }} />
              <br />
              <button className="update-btn" onClick={() => {
                 this.handleSubmit(style, origin, id);
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