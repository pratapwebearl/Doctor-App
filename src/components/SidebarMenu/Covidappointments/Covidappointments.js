import React, { Component } from 'react'
import { Modal } from 'react-responsive-modal';
import NoDataSvg from '../../../images/DashboardHomeSvg.svg';
import './Covidappoinements.css'



export default class Covidappointment extends Component {
  constructor(props) {
    // var today = new Date()
    // var date = '' + today.getDate() + '' +today.getMonth + '' +
    super(props);
    this.state = {
      appointment: [],
      viewModel:{
        Name: '',
        Time: '',
        Disease: '',
        currentStatus: '',
        Description:'',
        Date:'',
        Gender:'',
        Age:'',
      },
      modelViewStatus:false,
    }
    this.onclickAcceptBtn = this.onclickAcceptBtn.bind(this);
    this.onclickRejectBtn = this.onclickRejectBtn.bind(this);
    this.onclickViewBtn = this.onclickViewBtn.bind(this);
  }
  onclickAcceptBtn(id){
    // let index = this.state.appointment.findIndex(x=> x.id === id); 
    if (id !== -1){
        let temporaryarray = this.state.appointment.slice();
        temporaryarray[id]['currentStatus'] = "Accepted";
        // console.log(temporaryarray)
        // setArray(temporaryarray);
        this.setState({
          appointment : temporaryarray
        })
    }
    else {
        console.log('no match');
    }
  }
  onclickRejectBtn(id){
    if (id !== -1){
      let temporaryarray = this.state.appointment.slice();
      temporaryarray[id]['currentStatus'] = "Rejected";
      // console.log(temporaryarray)
      // setArray(temporaryarray);
      this.setState({
        appointment : temporaryarray
      })
  }
  else {
      console.log('no match');
  }
  }
  onclickViewBtn(id){
    let temporaryarray = this.state.appointment.slice();
    this.setState({
      viewModel:{
        Name: temporaryarray[id]['Name'],
        Time: temporaryarray[id]['Time'],
        Disease:temporaryarray[id]['Disease'],
        currentStatus: temporaryarray[id]['currentStatus'],
        Description:temporaryarray[id]['Description'],
        Date:temporaryarray[id]['Date'],
        Gender:temporaryarray[id]['Gender'],
        Age:temporaryarray[id]['Age'],
      },
    },function(){
      console.log(this.state.viewModel)
      this.onOpenModal();
    })
  }
  onOpenModal = () => {
		this.setState({ modelViewStatus: true });
	};
	
	onCloseModal = () => {
    this.setState({
      modelViewStatus:false,
      viewModel:{},
    });
	};
  onclickVisietd(){
    //mark as visited
  }
  onclickNotVisietd(){
    //mark as not visited
  }
  onclickCancelAppointment(){
    //cancel appointment
  }
  componentDidMount() {
    //api call to update state info
    this.setState(
      {
        appointment: [
          { Name: 'Nikunj Delavadiya',Time: '10:00',Disease: 'Insomnia',currentStatus: 'Accepted',Description:'none',Date:'20-07-2021', Gender:'Male',Age:'21'},
          { Name: 'Navdeep Dadhania',Time: '11:00',Disease: 'Diarrhea',currentStatus: 'Rejected',Description:'none',Date:'21-07-2021',Gender:'Male',Age:'21'},
          { Name: 'Nihal Shaikh',Time: '12:00',Disease: 'Dengue',currentStatus: 'Accepted',Description:'none',Date:'22-07-2021',Gender:'Male',Age:'21'},
          { Name: 'Dharmesh Rathod',Time: '13:00',Disease: 'Malaria',currentStatus: 'Accepted',Description:'none',Date:'23-07-2021',Gender:'Male',Age:'21'},
          { Name: 'Aliabbas Attarwala',Time: '14:00',Disease: 'Diabetes',currentStatus: 'Accepted',Description:'none',Date:'24-07-2021',Gender:'Male',Age:'21'}
        ]
      })
  }
  render() {
    return (
      <div className="appointmentComponentViewProfile">
        <div className="appointment-container">
          <div className="appointment-title">
            <p><i className="fas fa-virus fa-virus-appoinrment"></i>Covid Appointments</p>
          </div>
          {this.state.appointment.length === 0 ? 
          <>
          <div className="noAppointmentSvgDiv">
            <img src={NoDataSvg} alt="noDataSvg" className="noAppointmentSvg"></img>
            <p className="svgLabel">No Appointment Found</p>
          </div>
          </>
          :
          <>
            <div className="appointmentinfo">
          <p className="profilelabelMain"><span className="profilelabelMainContent">Current Appointments</span></p>
            {this.state.appointment.map((item, index) => {
              return <>
                <div className="card-main">
                  <div className="small-size-row-first">
                    <div className="p-name-div"><p className="p-name">{item.Name}</p></div>
                    <div className="p-appointment-time-div">Time: <p className="p-appointment-time">{item.Time}</p></div>
                    <div className="p-appointment-date-div">Date: <p className="p-appointment-date">{item.Date}</p></div>
                    <div className="p-disease-div">Disease: <p className="p-disease">{item.Disease}</p></div>
                    <div className="p-status-accepted-div">
                      Status: <p className={item.currentStatus ==="Accepted" ? "p-status-accepted" : "p-status-rejected" }>{item.currentStatus}</p>
                    </div>
                  </div>
                 
                  <div className="small-size-row-second">
                    <div className="acceptBtn"><button className="button-green" onClick={() => this.onclickAcceptBtn(index)}>Accept</button></div>
                    <div className="rejectBtn"><button className="button-red" onClick={() => this.onclickRejectBtn(index)}>Reject</button></div>
                    <div className="viewBtn"><button className="button-grey" onClick={()=> this.onclickViewBtn(index)}>View</button></div>
                  </div>
                </div></>
            })}

          </div>
          {this.state.modelViewStatus ? 
				<Modal
					open={this.state.modelViewStatus}
					onClose={this.onCloseModal}
					center
					classNames={{
					overlay: 'customOverlay',
					modal: 'customModal',
					}}
					closeIcon={<>
					<svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M100 12.8692L81.7352 0L39.8782 36.076L13.1659 12.8692L0 25.0352L26.1035 49.0155L0 72.8231L13.1659 84.9508L41.8569 60.9001L79.9087 100L100 89.1702L81.7352 72.8231L54.1096 49.0155L100 12.8692Z" fill="black"/>
						</svg>
					</>}
				>
			    <div className="card-main-model">
                  <div className="small-size-row-first-model">
                    <div className="p-name-div-model"><p className="p-name">{this.state.viewModel.Name}</p></div>
                    <div className="p-appointment-time-div-model">Time: <p className="p-appointment-time">{this.state.viewModel.Time}</p></div>
                    <div className="p-appointment-date-div-model">Date: <p className="p-appointment-date">{this.state.viewModel.Date}</p></div>
                    <div className="p-disease-div-model">Disease: <p className="p-disease">{this.state.viewModel.Disease}</p></div>
                    <div className="p-disease-div-model">Discription: <p className="p-disease">{this.state.viewModel.Description}</p></div>
                    <div className="p-disease-div-model">Gender: <p className="p-disease">{this.state.viewModel.Gender}</p></div>
                    <div className="p-disease-div-model">Age: <p className="p-disease">{this.state.viewModel.Age}</p></div>
                    <div className="p-status-accepted-div-model">
                      Status: <p className={this.state.viewModel.currentStatus ==="Accepted" ? "p-status-accepted" : "p-status-rejected" }>{this.state.viewModel.currentStatus}</p>
                    </div>
                  </div>
                 
                  <div className="small-size-row-second-model">
                    {/* <label className="profilelabel">Mark as :</label> */}
                    <div className="Btn-model"><button className="button-green-model" onClick={() => this.onclickVisietd()}>Visited</button></div>
                    <div className="Btn-model"><button className="button-green-model" onClick={() => this.onclickNotVisietd()}>Not Visited</button></div>
                    <div className="Btn-model"><button className="button-red-model" onClick={()=> this.onclickCancelAppointment()}>Cancel</button></div>
                  </div>
                </div>
				</Modal> : null
			}
          </>
          }
        
        </div>
      </div>
    )
  }
}