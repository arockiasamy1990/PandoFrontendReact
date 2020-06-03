import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css'

const header=(props)=>{
    return (
        <div className="nav">
            <ul>
                {props.isAuth?<li> <NavLink to="/vehicle/list" activeClassName="active">Vehicle List</NavLink></li>:null}
                {props.isAuth?<li> <NavLink to="/shipper/list" activeClassName="active">Shipper List</NavLink></li>:null}
                {props.isAuth?<li> <NavLink to="/trip/list" activeClassName="active">Trip List</NavLink></li>:null}
                {props.isAuth?<li> <NavLink to="/logout" activeClassName="active">Logout</NavLink></li>:<li><NavLink to="/register" activeClassName="active">Login/Register</NavLink></li>}
                
            </ul>
            
        </div>
        
    )
}

export default header;