import React, {Component} from 'react';
import axios from 'axios'
import './Trip.css'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

class Trip extends Component {
  constructor(props) {
    super(props)
    this.state={
        trip:null,
        loading:true,
        search:"",
        filter:false
    }
  }
  componentDidMount () {
    console.log(this.props);
    axios.get('http://localhost/pando/v1/api/list/trip').then(res=>{
      console.log(res);
      this.setState({trip:res.data.response.trip_list,loading:false});
    }).catch(error=>{
      this.setState({loading:false});
    });
    
   }
   filterHander=()=>{
       const searchdata={
                search:this.state.search
        }
        axios.post('http://localhost/pando/v1/api/list/trip',{searchdata}).then(res=>{
            console.log(res);
            this.setState({trip:res.data.response.trip_list,loading:false,filter:true});

        }).catch(error=>{
            this.setState({loading:false,filter:true});
        });
   
    }    
    resetHandler=()=>{
        this.setState({search:"",filter:false});
        console.log(this.props);
        axios.get('http://localhost/pando/v1/api/list/trip').then(res=>{
        console.log(res);
        this.setState({trip:res.data.response.trip_list,loading:false});
        }).catch(error=>{
        this.setState({loading:false});
        });
    }
   exportHandler=()=> {
   
    const method = 'GET';
    const url = 'http://localhost/pando/trip/list?export=excel&date_range='+this.state.search;
    axios.request({
        url,

        method,

        responseType: 'blob', //important

      })

      .then(({ data }) => {

        const downloadUrl = window.URL.createObjectURL(new Blob([data]));

        const link = document.createElement('a');

        link.href = downloadUrl;

        link.setAttribute('download', 'report.xls'); 

        document.body.appendChild(link);

        link.click();

        link.remove();

      });
   }
  
  handleEvent=(event,picker)=>{
    console.log(picker);
    this.setState({
      search: picker.startDate.format('YYYY/MM/DD')+"-"+picker.endDate.format('YYYY/MM/DD')
    });
  }
  handlecancel=(event,picker)=>{
    console.log(picker);
    this.setState({
      search: ""
    });
  }
   render () {
     console.log(this.state.search);
     let trip_list=<tr> <td colSpan="10" style={{textAlign:"center"}}>Working on it.....</td></tr>;
     let reset_button=null;
     if(this.state.filter) {
        reset_button=<button onClick={this.resetHandler} style={{width:"10%",margin:"5px"}}>Reset Filter</button>
     }
     if(this.state.trip) {
        trip_list=this.state.trip.map(res=>{
      return  <tr key={res.sno}>
              <td>{res.sno}</td>
              <td>{res.trip_id}</td>
              <td>{res.vehicle_number}</td>
              <td>{res.owner_name}</td>
              <td>{res.consigment_number}</td>
              <td>{res.material_code}</td>
              <td>{res.weight}</td>
              <td>{res.shipper_name}</td>
              <td>{res.start_date}</td>
              <td>{res.booked_date}</td>
            </tr>
      });
     }
    return ( 
      <div>

        <div className="searcharea">
         
        <DateRangePicker onEvent={this.handleEvent}  onCancel={this.handlecancel}>
            <input type="text" value={this.state.search} onChange={(event)=>this.setState({search:event.target.value})} placeholder="Date Filter" style={{width:"30%"}}/>
          </DateRangePicker>
            <button onClick={this.filterHander} style={{width:"10%",margin:"5px"}}>Filter Record</button>
            {reset_button}
            <button onClick={this.exportHandler} style={{width:"10%",margin:"5px"}}>Excel Export</button>
        </div>
         <div style={{"width":"100%","textAlign":"center"}}>
          <table  style={{"width":"100%"}}>
                <thead>
                  <tr>
                      <th>S.No</th>
                      <th>Trip Id</th>
                      <th>Vehicle Number</th>
                      <th>Vehicle Owner</th>
                      <th>Consignment Number</th>
                      <th>Material Code</th>
                      <th>Weight</th>
                      <th>Shipper</th>
					  <th>Start Date</th>
                      <th>Booked date</th>
                    </tr>
                      
                </thead>
                <tbody>
                   {trip_list}
                </tbody>
            </table>
          </div> 
         
    
      </div>
      
  )
  
  }

}

export default Trip;
