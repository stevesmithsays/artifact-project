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
        console.log(this.props.user);
        
        return(<div className = 'home-container'>                  
            </div>
        )
    }
}

const mapStateToProps = state => state;

//Don't forget to export any functions that are imported from your reducer (saveUser)
export default connect(mapStateToProps, {saveUser})(Home);