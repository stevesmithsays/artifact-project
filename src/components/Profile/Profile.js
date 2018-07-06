//Foreign Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';

//Local Imports
import { updateProfile, getProfile, saveUser } from '../../ducks/reducer';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      style: [],
      origin: [],
      profile: []
    };
  }

  componentDidMount(){
      this.props.getProfile(this.props.user.id);
  }


   handleSubmit = async (style, origin, id) => {
    await this.props.updateProfile(style, origin, id);
    swal('Profile successfully updated.');
    await this.props.getProfile(id);
    document.querySelector('.style').value = '';
    document.querySelector('.origin').value = '';
  };



  render() {
    const { style, origin } = this.state;
    const { id } = this.props.user;
    const { profile } = this.props;
    let currentStyle;
    let currentOrigin;

    if(profile.data !== undefined && profile.data.length > 0){
        currentStyle = profile.data.map((c,i) => {
            return <span key ={i}>{c.favorite_style}</span>;
        })
        currentOrigin = profile.data.map((c,i) =>{
            return <span key = {i}>{c.favorite_origin}</span>;
        })
    }

    return (
      <div className="profile-container">
        <section className="profile-text">
          <h1>Your Profile</h1>
          <span className="tag">PREFERRED DESIGN STYLE: </span>
          <br />

{currentStyle}
          <br />
          <input
            className="style"
            type="text"
            onChange={e => {
              this.setState({ style: e.target.value });
            }}
          />
          <br />
          <span className="tag">FAVORITE COUNTRY OF ORIGIN: </span>
          <br />
          {currentOrigin}
          <br />
          <input
            className="origin"
            type="text"
            onChange={e => {
              this.setState({ origin: e.target.value });
            }}
          />
          <br />
          <button
            className="update-btn"
            onClick={() => {
              this.handleSubmit(style, origin, id);
            }}
          >
            Update Profile
          </button>
        </section>
        <img
          src={require('../../assets/products/walkway.png')}
          className="profile-pic"
          alt="walkway"
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { updateProfile, getProfile, saveUser }
)(Profile);
