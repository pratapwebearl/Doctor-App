import React, { Component } from 'react'
import { FormFeedback } from 'reactstrap';
import { Modal } from 'react-responsive-modal';
import Switch from "react-switch";
import './Covidcare.css'

export default class Covidcare extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            data: {
                covidFacilityAvailable:false,
				// hospitalName: '',
				NoBeds: '',
				NoVacantBeds: '',
				NoofVentilators: '',
				NoBedsIcu:'',
                NoOxygenCylinder:'',
                // addressHospital:'',
			},
            oldData:{         
                covidFacilityAvailable:false,        
                // hospitalName: '',
				NoBeds: '',
				NoVacantBeds: '',
				NoofVentilators: '',
				NoBedsIcu:'',
                NoOxygenCylinder:'',
                // addressHospital:'',
            },
            errors: {},
            changeStatusbtnHospital:false,
            changeStatusbtnHospitalToggle:false,
            hospitalUpdateSuccess : false,
		};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeToggle = this.handleChangeToggle.bind(this);
    }
    handleChange(e){
    
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        },function(){
          
        //   if(this.state.data.hospitalName !== this.state.oldData.hospitalName){
        //     this.setState({
        //         changeStatusbtnHospital : true
        //     })
        //   }
          if(this.state.data.NoBeds !== this.state.oldData.NoBeds){
            this.setState({
                changeStatusbtnHospital : true
            })
          }
          else if(this.state.data.NoVacantBeds !== this.state.oldData.NoVacantBeds){
            this.setState({
                changeStatusbtnHospital : true
            })
          } 
          else if(this.state.data.NoofVentilators !== this.state.oldData.NoofVentilators){
            this.setState({
                changeStatusbtnHospital : true
            })
          } 
          else if(this.state.data.NoBedsIcu !== this.state.oldData.NoBedsIcu){
            this.setState({
                changeStatusbtnHospital : true
            })
          }
          else if(this.state.data.NoOxygenCylinder !== this.state.oldData.NoOxygenCylinder){
            this.setState({
                changeStatusbtnHospital : true
            })
          }
        //   else if(this.state.data.addressHospital !== this.state.oldData.addressHospital){
        //     this.setState({
        //         changeStatusbtnHospital : true
        //     })
        //   }
          else{
            this.setState({
                changeStatusbtnHospital : false
            })
          }
        });
    }
    handleChangeToggle(checked) {
        this.setState({
            data: {
                ...this.state.data,
                covidFacilityAvailable: checked
            },
            errors: {
                ...this.state.errors,
                covidCareStatuserror: ''
            }
        },function(){
          
        //   if(this.state.data.covidFacilityAvailable !== this.state.oldData.covidFacilityAvailable){
            this.setState({
                changeStatusbtnHospitalToggle : true
            })
        //   }
          
        //   else{
        //     this.setState({
        //         changeStatusbtnHospitalToggle : false
        //     })
        //   }
        });
        // console.log(this.state.toggleChecked)
      }
    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
  
        if (Object.keys(errors).length === 0) {
          console.log(this.state);
          this.onOpenModal();
          //Resetting the form
        } else {
            this.setState({ errors });
        }
    }
    validate = () => {
        const { data } = this.state;
        let errors = {};
        // if (data.hospitalName === '') errors.hospitalName = 'Hospital Name can not be blank.';
        if (data.NoBeds === '') errors.NoBeds = 'No. of beds can not be blank.';
        if (data.NoBeds.includes('-') ||data.NoBeds.includes('+') ) errors.NoBeds = 'Please input valid number';
        if (data.NoVacantBeds === '') errors.NoVacantBeds = 'No. of Vacant Beds can not be blank.';
        if (data.NoVacantBeds.includes('-') ||data.NoVacantBeds.includes('+') ) errors.NoBeds = 'Please input valid number';
        if (data.NoofVentilators === '') errors.NoofVentilators = 'No of Ventilators can not be blank.';
        if (data.NoofVentilators.includes('-') ||data.NoofVentilators.includes('+') ) errors.NoBeds = 'Please input valid number';
        if (data.NoOxygenCylinder === '') errors.NoOxygenCylinder = 'No of Oxygen cylinder can not be blank.';
        if (data.NoOxygenCylinder.includes('-') ||data.NoOxygenCylinder.includes('+') ) errors.NoBeds = 'Please input valid number';
        if (data.NoBedsIcu === '') errors.NoBedsIcu = 'No of Beds in ICU can not be blank';
        if (data.NoBedsIcu.includes('-') ||data.NoBedsIcu.includes('+') ) errors.NoBeds = 'Please input valid number';
        // if (data.addressHospital === '') errors.addressHospital = 'Address of Hospital can not be blank';
        // if (!data.covidFacilityAvailable) errors.covidCareStatuserror = 'Please enable Covidcare facility';
        return errors;
    }
    onOpenModal = () => {
		this.setState({ hospitalUpdateSuccess: true });
	};
	
	onCloseModal = () => {
        this.setState({
        // data: {
        //     covidFacilityAvailable:false,
        //     hospitalName: '',
        //     NoBeds: '',
        //     NoVacantBeds: '',
        //     NoofVentilators: '',
        //     NoBedsIcu:'',
        //     NoOxygenCylinder:'',
        //     addressHospital:'',
        // },
        // oldData:{     
        //     covidFacilityAvailable:false,            
        //     hospitalName: '',
        //     NoBeds: '',
        //     NoVacantBeds: '',
        //     NoofVentilators: '',
        //     NoBedsIcu:'',
        //     NoOxygenCylinder:'',
        //     addressHospital:'',
        // },
        errors: {},
        changeStatusbtnHospital:false,
        changeStatusbtnHospitalToggle:false,
        hospitalUpdateSuccess : false,
        })
    };
    componentDidMount() {
        //api call to update state info
        this.setState(
          {
            data: {                 
                covidFacilityAvailable:false,
                hospitalName: '',
				NoBeds: '',
				NoVacantBeds: '',
				NoofVentilators: '',
				NoBedsIcu:'',
                NoOxygenCylinder:'',
                addressHospital:'',
            },
            oldData:{             
                covidFacilityAvailable:false,    
                hospitalName: '',
				NoBeds: '',
				NoVacantBeds: '',
				NoofVentilators: '',
				NoBedsIcu:'',
                NoOxygenCylinder:'',
                addressHospital:'',
            },
          }, function () {
            console.log(this.state.data)
            // console.log(this.state.tempCategory)
        });
      
      }
    
    render() {
        const {errors } = this.state;
        return (
            <div className="dashboardComponentViewCovidcare">
                 <div className="covidcare-container">
                    <div className="covidcare-title">
                            <p><i className="fas fa-hospital-user fa-hospital-covidcare"></i>Covidcare Center Information</p>
                    </div>
                    <div className="covidcareinfo">
                    <form onSubmit={this.handleSubmit}>
                                <div className="rowProfile">
                                    <div className="colProfile">
                                        <label className="profilelabel">Covidcare Facility : <span className="profilelabelCovidStatus">{this.state.data.covidFacilityAvailable ? "Available" : " Not Available"}</span></label>
                                        <Switch onColor="#2B7A79" onChange={this.handleChangeToggle}
                                        checked={this.state.data.covidFacilityAvailable} />
                                         {/* <FormFeedback className="errorMessage">{errors.covidCareStatuserror}</FormFeedback> */}
                                        {/* <label className="profilelabel">Hospital Name</label> */}
                                    </div>
                                    
                                </div>
                                <div className="rowProfile">
                                    {/* <div className="colProfile">
                                        <label className="profilelabel">Hospital Name</label>
                                        <input type="text" className="inputProfile" value={this.state.data.hospitalName} name="hospitalName" onChange={this.handleChange}></input>
                                        <FormFeedback className="errorMessage">{errors.hospitalName}</FormFeedback>
                                    </div> */}
                                    <div className="colProfile">
                                        <label className="profilelabel">No. of beds</label>
                                        <input type="number" className="inputProfile" value={this.state.data.NoBeds}  name="NoBeds" onChange={this.handleChange} min="0" max="5000"></input>
                                        <FormFeedback className="errorMessage">{errors.NoBeds}</FormFeedback>
                                    </div>
                                    <div className="colProfile">
                                        <label className="profilelabel">No. of vacant beds</label>
                                        <input type="number" className="inputProfile"  onChange={this.handleChange} value={this.state.data.NoVacantBeds} name="NoVacantBeds" min="0" max="5000"></input>
                                        <FormFeedback className="errorMessage">{errors.NoVacantBeds}</FormFeedback>
                                    </div>
                                    
                                </div>
                                <div className="rowProfile">
                                    
                                    <div className="colProfile">
                                        <label className="profilelabel">No. of Ventilators</label>
                                        <input type="number" className="inputProfile" value={this.state.data.NoofVentilators}  name="NoofVentilators" onChange={this.handleChange} min="0" max="5000"></input>
                                        <FormFeedback className="errorMessage">{errors.NoofVentilators}</FormFeedback>
                                    </div>
                                    <div className="colProfile">
                                        <label className="profilelabel">No. of beds in ICU</label>
                                        <input type="number" className="inputProfile"  onChange={this.handleChange} value={this.state.data.NoBedsIcu} name="NoBedsIcu" min="0" max="5000"></input>
                                        <FormFeedback className="errorMessage">{errors.NoBedsIcu}</FormFeedback>
                                    </div>
                                </div>
                                <div className="rowProfile">
                                   
                                    {/* <div className="colProfile">
                                        <label className="profilelabel">No. of Vacant beds in ICU</label>
                                        <input type="text" className="inputProfile" value={this.state.data.NoVacantBedsIcu}  name="NoVacantBedsIcu" onChange={this.handleChange}></input>
                                        <FormFeedback className="errorMessage">{errors.NoVacantBedsIcu}</FormFeedback>
                                    </div> */}
                                    <div className="colProfile">
                                        <label className="profilelabel">No. of available oxygen cylinder</label>
                                        <input type="number" className="inputProfile"  onChange={this.handleChange} value={this.state.data.NoOxygenCylinder} name="NoOxygenCylinder" min="0" max="5000"></input>
                                        <FormFeedback className="errorMessage">{errors.NoOxygenCylinder}</FormFeedback>
                                    </div>
                                </div>
                                {/* <div className="rowProfile">
                                    <div className="colProfile">
                                        <label className="profilelabel">Address of Hospital</label>
                                        <textarea className="inputProfile textareawidth"
                                        rows={5} 
                                        value={this.state.data.textAreaValue}
                                        onChange={this.handleChange}
                                        name="addressHospital"
                                        placeholder="type address here..."
                                        />
                                        <FormFeedback className="errorMessage">{errors.addressHospital}</FormFeedback>
                                    </div>
                                </div> */}
                                {/* <input type="submit" value="Save" className={this.state.changeStatusbtnHospital || this.state.changeStatusbtnHospitalToggle  ? "sbtnProfile": "sbtnProfileDisable"}
                                disabled={!(this.state.changeStatusbtnHospital || this.state.changeStatusbtnHospitalToggle) }
                                ></input> */}
                                  <input type="submit" value="Save" className={this.state.changeStatusbtnHospital ? "sbtnProfile": "sbtnProfileDisable"}
                                disabled={!this.state.changeStatusbtnHospital }
                                ></input>
                        </form> 
                    </div>
                    {this.state.hospitalUpdateSuccess ? 
				<Modal
					open={this.state.hospitalUpdateSuccess}
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
					<p className="overLayTitleSuccessProfile">
					<svg className="successIcon" width="35" height="35" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M250 500C388.071 500 500 388.071 500 250C500 111.929 388.071 0 250 0C111.929 0 0 111.929 0 250C0 388.071 111.929 500 250 500Z" fill="#3AAFA9"/>
						<path d="M459.377 113.672L238.281 342.58L238.672 367.189H248.828L488.283 174.219C481.251 152.735 471.486 132.032 459.377 113.672Z" fill="#37A18E"/>
						<path d="M495.316 102.735L451.174 58.9846C445.315 53.1249 435.549 53.1249 429.3 58.9846L240.626 253.907L158.985 173.438C153.125 167.579 143.36 167.579 137.11 173.438L98.0471 212.111C92.1874 217.97 92.1874 227.736 98.0471 233.596L228.517 362.892C232.033 366.408 236.72 367.58 241.408 367.189C246.095 367.58 250.783 366.407 254.299 362.892L495.316 124.61C501.175 118.359 501.175 108.594 495.316 102.735Z" fill="#F2F1EF"/>
						<path d="M254.298 362.892L495.315 124.61C501.175 118.75 501.175 108.984 495.315 103.125L488.284 96.4844L241.017 339.454L104.297 206.251L98.4378 212.111C92.578 217.97 92.578 227.736 98.4378 233.596L228.908 362.893C232.424 366.409 237.111 367.581 241.798 367.19C246.095 367.58 250.782 366.408 254.298 362.892Z" fill="#E6E5E3"/>
					</svg>
					Covidcare Center Information has been updated successfully
					</p>
					<p className="overLayDesSuccess" >Go to your dashboard..</p>
					<p className="overLayDesSuccess">
						<a href="/dashboard">Dashboard</a>
					</p>
				</Modal> : null
                }
                </div>    
            </div>
        )
    }
}
