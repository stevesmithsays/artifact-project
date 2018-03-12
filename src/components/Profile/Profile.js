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
        console.log(this.state.style);
        console.log(this.state.origin);
        const {style, origin} = this.state;
        const {id} = this.props.user;
        console.log(id);
        return(
            <div className = 'profile-container'>
            <h1>Your Profile</h1>
            <div className = 'profile-info'>
            <span>Preferred Design Style: </span><input onChange = {e => {this.setState({ style: e.target.value})}} /><br/>
            <span>Favorite country of product origin: </span><input onChange = {e => {this.setState({origin: e.target.value})}} /><br/>
           
            </div>
             <button className = 'update-btn' onClick = {() => {this.props.updateProfile(style, origin, id)}}>Update Profile</button>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {updateProfile})(Profile);