//Foreign Imports
import React, {Component} from 'react';
import { connect } from 'react-redux';

//Local Imports
import { saveUser } from '../../ducks/reducer';



class Home extends Component {
    componentDidMount(){      
      this.props.saveUser();              
    }


    render(){
               
        return <div className="home-container">
            <div className="text-container">
              <h1 id ='welcome'>Welcome to Artifact Fine Goods</h1>
              <h2 id = 'tagline'>Gifts from Around the World</h2>
            </div>
          </div>;
    }
}

const mapStateToProps = state => state;

//Don't forget to export any functions that are imported from your reducer (saveUser)
export default connect(mapStateToProps, {saveUser})(Home);