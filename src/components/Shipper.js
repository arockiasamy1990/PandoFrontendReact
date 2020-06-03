import React, {Component} from 'react';
import axios from 'axios'
class Shipper extends Component {
  constructor(props) {
    super(props)
    this.state={
        shipper:null,
        loading:true
    }
  }
  componentDidMount () {
    axios.get('http://localhost/pando/v1/api/list/shipper').then(res=>{
      console.log(res);
      this.setState({shipper:res.data.response.shipper_list,loading:false});
    }).catch(error=>{
      this.setState({loading:false});
    });
    
  }
 
   render () {
     console.log(this.state);
     let shipper_list=<tr> <td colSpan="8" style={{textAlign:"center"}}>Working on it.....</td></tr>;
     if(this.state.shipper) {
        shipper_list=this.state.shipper.map(res=>{
      return  <tr key={res.sno}>
              <td>{res.sno}</td>
              <td>{res.shipper_name}</td>
              <td>{res.shipper_contact}</td>
              <td>{res.created_at}</td>
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
                      <th>Shipper Name</th>
                      <th>Shipper ContactNumber</th>
					   <th>Created At</th>
                    </tr>
                      
                </thead>
                <tbody>
                   {shipper_list}
                </tbody>
            </table>
          </div> 
         
    
      </div>
      
  )
  
  }

}

export default Shipper;
