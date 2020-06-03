import React,{Component} from 'react'
import {connect} from 'react-redux'
import './Auth.css'
import * as actionCreators from '../Store/actions/index'
import {Redirect} from 'react-router-dom'
class Auth extends Component{
    constructor(props) {
        super(props)
        this.state={
                username:"",
                email:"",
                password:"",
                isSignup:false
        }
    }
    switcHandler=()=>{
        this.setState(prevstate=>{
            return {isSignup:!prevstate.isSignup}
        });
    }
    submitHandler=()=>{
        this.props.onStart(this.state.username,this.state.email,this.state.password,this.state.isSignup);
    }

    render() {
        console.log(this.state.username);
        let errorMsg=null;
        if(this.props.error) {
            errorMsg=<p>{this.props.error}</p>
        }
        let redirect=null;
        if(this.props.isAuth) {
             redirect=<Redirect to="/vehicle/list"/>
        }
        return (
            <div>
                {errorMsg}
                {redirect}
                <form >
                 <div className="registerbox">
                    <label for="fname">First Name</label>
                    <input type="text" placeholder="User name.."  onChange={(event)=>this.setState({username:event.target.value})}/>
                    <label for="fname">Email </label>
                    <input type="text" placeholder="Email" onChange={(event)=>this.setState({email:event.target.value})}/>
                    <label for="fname">Password</label>
                    <input type="password" placeholder="password" onChange={(event)=>this.setState({password:event.target.value})}/>
                    <input type="button" value="Submit" onClick={this.submitHandler}/>
                    <button type="button" onClick={this.switcHandler}>Switch To {this.state.isSignup?'Sign In':'Signup'}</button>
                </div>
              </form>
            </div>
            
        )
    }
}
const mapStatetoProps=state=>{
    return {
        isAuth:state.userid!==null,
        error:state.error,
        loading:state.loading
    }
}
const mapDispatchtoProps=dispatch=>{
    return {
        onStart:(name,email,password,mode)=>dispatch(actionCreators.auth(name,email,password,mode))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(Auth);