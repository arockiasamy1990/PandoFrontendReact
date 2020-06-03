import React, {Component} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Route,Switch, Redirect} from 'react-router-dom'
import  Vehicle from './components/Vehicle'
import  Shipper from './components/Shipper'
import Logout from './components/Logout'
import  Trip from './components/Trip'
import './App.css';
import Auth from './components/Auth';
import {connect} from 'react-redux'
import * as actionCreators from './Store/actions/index'
class App extends Component {
  componentDidMount(){
    this.props.onAuthcheck()
  }
   render () {
     let routespro=(
        <Switch>
          <Route exact path="/" component={Auth}/>
          <Route path="/register" component={Auth}/>
         <Redirect to="/"/>
        </Switch>
      )
      if(this.props.isAuth) {
         routespro=(
          <Switch>
            <Route exact path="/" component={Vehicle}/>
            <Route path="/vehicle/list" component={Vehicle}/>
            <Route path="/shipper/list" component={Shipper}/>
            <Route path="/trip/list" component={Trip}/>
            <Route path="/logout" component={Logout}/>
            <Redirect to="/"/>
          </Switch>
        )
      }
      return ( 
        <div>
          <Header isAuth={this.props.isAuth}/>
              {routespro}
          <Footer/>
        </div>
        
    )
  
  }

}
const mapStatetoProps=state=>{
  return {
      isAuth:state.userid!==null
  }
}
const mapDispatchtoprops=dispatch=>{
  return {
    onAuthcheck:()=>dispatch(actionCreators.authCheckState())
  }
}

export default connect(mapStatetoProps,mapDispatchtoprops)(App);
