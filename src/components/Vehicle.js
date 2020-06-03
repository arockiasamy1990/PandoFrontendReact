import React, {Component} from 'react';
import axios from 'axios'
class Vehicle extends Component {
  constructor(props) {
    super(props)
    this.state={
        vehicle:null,
        loading:true
    }
  }
  componentDidMount () {
    axios.get('http://localhost/pando/v1/api/list/vehicle').then(res=>{
      console.log(res);
      this.setState({vehicle:res.data.response.vehicle_list,loading:false});
    }).catch(error=>{
      this.setState({loading:false});
    });
    
  }
 
   render () {
     console.log(this.state);
     let vehicle_list=<tr> <td colSpan="8" style={{textAlign:"center"}}>Working on it.....</td></tr>;
     if(this.state.vehicle) {
      vehicle_list=this.state.vehicle.map(veh=>{
      return  <tr key={veh.sno}>
              <td>{veh.sno}</td>
              <td>{veh.vehicle_number}</td>
              <td>{veh.maker}</td>
              <td>{veh.model}</td>
              <td>{veh.maximum_capacity}</td>
              <td>{veh.owner_name}</td>
              <td>{veh.owner_contact}</td>
              <td>{veh.created_at}</td>
            </tr>
      });
     }
    return ( 
      <div>
       
         <div style={{"width":"100%","textAlign":"center"}}>
          <table  style={{"width":"100%"}}>
                <thead>
                  <tr>
                      <th>S.No</th>
                      <th>Vehicle Number</th>
                      <th>Maker</th>
                      <th>Model</th>
                      <th>Max capactiy</th>
                      <th>Owner Name</th>
                      <th>Owner ContactNumber</th>
					<th>Created At</th>
                    </tr>
                      
                </thead>
                <tbody>
                   {vehicle_list}
                </tbody>
            </table>
          </div> 
         
    
      </div>
      
  )
  
  }

}

export default Vehicle;
