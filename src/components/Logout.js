import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../Store/actions/index'
import {Redirect} from 'react-router-dom'
class Logout extends Component {
   componentDidMount(){
       this.props.onLogout();
   } 
    render() {
        return <Redirect to='/' />

    }

}
const mapDispatchtoprops=dispatch=>{
    return {
        onLogout:()=>dispatch(actionCreators.authLogout())
    }
}
export default connect(null,mapDispatchtoprops)(Logout);