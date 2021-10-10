import React, { Component } from 'react'
import { Modal } from 'react-responsive-modal';
import PhoneInput from 'react-phone-input-2';
import { FormFeedback } from 'reactstrap';
import NoDataSvg from '../../../images/DashboardHomeSvg.svg';
import './Mystaff.css'



export default class Myappointment extends Component {
  constructor(props) {
    // var today = new Date()
    // var date = '' + today.getDate() + '' +today.getMonth + '' +
    super(props);
    this.state = {
      staff: [],
      viewModelStaff:{
        Name: '',
        Designation: '',
        MobileNo: '',
        Email: '',
      },
      viewModelEditStaff:{
        Name: '',
        Designation: '',
        MobileNo: '',
        Email: '',
      },
      errors: {},
      errorsEdit: {},
      editStaffId:'',
      deleteStaffId:'',
      modelViewAddStaffStatus:false,
      modelViewEditStaffStatus:false,
      deleteStaffConfirmation:false,
    }
    this.onclickDeleteBtn = this.onclickDeleteBtn.bind(this);
    this.onclickAddStaffBtn =this.onclickAddStaffBtn.bind(this);
    this.onclickEditBtn = this.onclickEditBtn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleChangeEdit = this.handleChangeEdit.bind(this);
    this.handlePhoneEdit = this.handlePhoneEdit.bind(this);
    this.onclickAddStaffBtnModel=this.onclickAddStaffBtnModel.bind(this);
    this.onclickEditStaffBtnModel=this.onclickEditStaffBtnModel.bind(this);
    this.onDeleteStaffYes = this.onDeleteStaffYes.bind(this);
  }
  onclickEditBtn(id){
    let temporaryarray = this.state.staff.slice();
    this.setState({
        viewModelEditStaff:{
        Name: temporaryarray[id]['Name'],
        Designation: temporaryarray[id]['Designation'],
        MobileNo:temporaryarray[id]['MobileNo'],
        Email: temporaryarray[id]['Email'],
      },
      editStaffId:id,
    },function(){
    //   console.log(this.state.viewModel)
      this.onOpenModalEditStaff();
    })
  }
  onclickDeleteBtn(id){
        this.setState({
          deleteStaffId:id
        })
        this.onOpenModalStaffConfirmation();
        
    //   this.setState({
    //     staff : items
    //   })
  }
  onDeleteStaffYes(){
    var array = [...this.state.staff]; // make a separate copy of the array
        if (this.state.deleteStaffId !== -1) {
          array.splice(this.state.deleteStaffId, 1);
          this.setState({staff: array});
        }
      this.onCloseModalStaffConfirmation();
  }
  onOpenModalStaffConfirmation = () => {
		this.setState({ deleteStaffConfirmation: true,
                    deleteStaffId:'',
    });
	};
	
  onCloseModalStaffConfirmation = () => {
        this.setState({
          deleteStaffConfirmation:false,
        });
	};

  onclickAddStaffBtn(){
      this.onOpenModal();
  }
  onOpenModal = () => {
		this.setState({ modelViewAddStaffStatus: true });
	};
	
    onCloseModal = () => {
        this.setState({
            modelViewAddStaffStatus:false,
            viewModelStaff:{
                Name: '',
                Designation: '',
                MobileNo: '',
                Email: '',
              },
            errors: {},
        });
	};
    onOpenModalEditStaff = () => {
		this.setState({ modelViewEditStaffStatus: true });
	};
	
    onCloseModalEditStaff = () => {
        this.setState({
            modelViewEditStaffStatus:false,
            viewModelEditStaff:{
                Name: '',
                Designation: '',
                MobileNo: '',
                Email: '',
              },
            errorsEdit: {},
            editStaffId:'',
        });
	};
    handleChange(e){
    
        this.setState({
            viewModelStaff: {
                ...this.state.viewModelStaff,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        },function(){
        //   console.log(this.state.viewModelStaff)
        });
    }
    handlePhone(value) {
		
		this.setState(
			{
			viewModelStaff: {                   // object that we want to update
                ...this.state.viewModelStaff,    // keep all other key-value pairs
				MobileNo: value   		 // update the value of specific key
			},
            errors: {
                ...this.state.errors,
                MobileNo: ''
            }},
    function(){
       //
    })
	}
    handleChangeEdit(e){
    
        this.setState({
            viewModelEditStaff: {
                ...this.state.viewModelEditStaff,
                [e.target.name]: e.target.value
            },
            errorsEdit: {
                ...this.state.errorsEdit,
                [e.target.name]: ''
            }
        },function(){
          console.log(this.state.viewModelEditStaff)
        });
    }
    handlePhoneEdit(value) {
		
		this.setState(
			{
            viewModelEditStaff: {                   // object that we want to update
                ...this.state.viewModelEditStaff,    // keep all other key-value pairs
				MobileNo: value   		 // update the value of specific key
			},
            errorsEdit: {
                ...this.state.errorsEdit,
                MobileNo: ''
            }},
    function(){
       //
    })
	}
    onclickAddStaffBtnModel(e){
        e.preventDefault();
        const errors = this.validate();
  
        if (Object.keys(errors).length === 0) {
        //   console.log("success")
            const newStaff = this.state.viewModelStaff;
            this.setState({
                staff: [...this.state.staff, newStaff]
            })
            this.onCloseModal();
        } else {
            this.setState({ errors });
        }
    }
    validate = () => {
      const { viewModelStaff } = this.state;
      let errors = {};
      if (viewModelStaff.Name === '') errors.Name = 'Name can not be blank.';
      // if (viewModelStaff.Name.indexOf(' ') >= 0) errors.Name = 'Name can not contain whitespace';
      if(/\d/.test(viewModelStaff.Name) === true) errors.Name = 'Name can not contain numbers';
      if (viewModelStaff.Designation === '') errors.Designation = 'Designation can not be blank.';
      // if (viewModelStaff.Designation.indexOf(' ') >= 0) errors.Designation = 'Designation cannot contain whitespace';
      if(/\d/.test(viewModelStaff.Designation) === true) errors.Designation = 'Designation cannot contain numbers';
      if (viewModelStaff.Email === '') errors.Email = 'Email can not be blank.';
      if (!this.isvalidEmail(viewModelStaff.Email)) errors.Email = 'Please enter valid email address';
      if (viewModelStaff.MobileNo === '') errors.MobileNo = 'Please enter valid phone number';
      if (viewModelStaff.MobileNo.length <= 11) errors.MobileNo = 'Please enter valid phone number';
      return errors;
    }
    isvalidEmail(email) {
      // eslint-disable-next-line
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    onclickEditStaffBtnModel(e){
        e.preventDefault();
        const errorsEdit = this.validateEditStaff();
  
        if (Object.keys(errorsEdit).length === 0) {
          let temporaryarray = this.state.staff.slice();
          temporaryarray[this.state.editStaffId]['Name'] = this.state.viewModelEditStaff.Name;
          temporaryarray[this.state.editStaffId]['Designation'] = this.state.viewModelEditStaff.Designation;
          temporaryarray[this.state.editStaffId]['MobileNo'] = this.state.viewModelEditStaff.MobileNo;
          temporaryarray[this.state.editStaffId]['Email'] = this.state.viewModelEditStaff.Email;
          this.setState({
            staff : temporaryarray
          },function(){
          //   console.log(this.state.staff)
          })
            this.onCloseModalEditStaff();
        } else {
            this.setState({ errorsEdit });
        }
    }
    validateEditStaff = () => {
        const { viewModelEditStaff } = this.state;
        let errorsEdit = {};
        if (viewModelEditStaff.Name === '') errorsEdit.Name = 'Name can not be blank.';
        // if (viewModelEditStaff.Name.indexOf(' ') >= 0) errorsEdit.Name = 'Name can not contain whitespace';
        if(/\d/.test(viewModelEditStaff.Name) === true) errorsEdit.Name = 'Name can not contain numbers';
        if (viewModelEditStaff.Designation === '') errorsEdit.Designation = 'Designation can not be blank.';
        // if (viewModelEditStaff.Designation.indexOf(' ') >= 0) errorsEdit.Designation = 'Designation cannot contain whitespace';
        if(/\d/.test(viewModelEditStaff.Designation) === true) errorsEdit.Designation = 'Designation cannot contain numbers';
        if (viewModelEditStaff.Email === '') errorsEdit.Email = 'Email can not be blank.';
        if (!this.isvalidEmail(viewModelEditStaff.Email)) errorsEdit.Email = 'Please enter valid email address';
        if (viewModelEditStaff.MobileNo === '') errorsEdit.MobileNo = 'Please enter valid phone number';
        if (viewModelEditStaff.MobileNo.length<=11) errorsEdit.MobileNo = 'Please enter valid phone number';
        return errorsEdit;
    }
  componentDidMount() {
    //api call to update state info
    this.setState(
      {
        staff: [
          { Name: 'Nikunj Delavadiya', Designation: 'Assistant', MobileNo: '916552544512',Email: 'nikunj@gmail.com'},
          { Name: 'Navdeep Dadhania',Designation: 'Assistant', MobileNo: '916641223785',Email: 'Navdeep@gamil.com'},
          { Name: 'Nihal Shaikh',Designation: 'Assistant', MobileNo: '916552544512',Email: 'Nihal@gamil.com'},
          { Name: 'Dharmesh Rathod',Designation: 'Assistant', MobileNo: '916552544512',Email: 'Dharmesh@gmail.com'},
          { Name: 'Aliabbas Attarwala',Designation: 'Assistant', MobileNo: '916552544512',Email: 'ali@email.com'}
        ]
      })
  }
  render() {
    const {errors } = this.state;
    const {errorsEdit } = this.state;
    return (
      <div className="staffComponentViewProfile">
        <div className="staff-container">
          <div className="staff-title">
            <p><i className="fas fa-users fa-users-staff"></i> My Staff</p>
          </div>
          
        <div className="staffinfo">
          <p className="profilelabelMain"><span className="profilelabelMainContent">Staff Member</span></p>
          {this.state.staff.length === 0 ? 
          <>
          <div className="noAppointmentSvgDiv">
            <img src={NoDataSvg} alt="noDataSvg" className="noAppointmentSvg"></img>
            <p className="svgLabel">No Staff Found</p>
          </div>
          </>
          :
          <>
            {this.state.staff.map((staff, index) => {
              return <>
                <div className="card-main">
                  <div className="small-size-row-first-staff">
                    <div className="s-name-div"><p className="s-name">{staff.Name}</p></div>
                    <div className="s-designation-div">Designation: <p className="s-designation">{staff.Designation}</p></div>
                    <div className="s-mobileNo-div">Mobile Number: <p className="s-mobileNo">{staff.MobileNo}</p></div>
                    <div className="s-email-div">Email: <p className="s-email">{staff.Email}</p></div>
                  </div>
                 
                  <div className="small-size-row-second-staff">
                    <div className="editBtn"><button className="button-green-staff" onClick={() => this.onclickEditBtn(index)}>Update</button></div>
                    <div className="deleteBtn"><button className="button-red-staff" onClick={() => this.onclickDeleteBtn(index)}>Delete</button></div>
                  </div>
                </div></>
            })}
            </>
          }
        <button className="button-green-staff-add" onClick={() => this.onclickAddStaffBtn()}>Add Staff</button>
        </div>
          {this.state.modelViewAddStaffStatus ? 
				<Modal
					open={this.state.modelViewAddStaffStatus}
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
                <p className="overLayTitle">
					Add Staff
				</p>
                <form onSubmit={this.onclickAddStaffBtnModel}>
                <div className="rowProfile">
                        <div className="colProfile">
                            <label className="profilelabel">Name</label>
                            <input type="text" className="inputProfile" value={this.state.viewModelStaff.Name} name="Name" onChange={this.handleChange}></input>
                            <FormFeedback className="errorMessageStaff">{errors.Name}</FormFeedback>
                        </div>
                    </div>
                    <div className="rowProfile">
                        <div className="colProfile">
                            <label className="profilelabel">Designation</label>
                            <input type="text" className="inputProfile" value={this.state.viewModelStaff.Designation} name="Designation" onChange={this.handleChange}></input>
                            <FormFeedback className="errorMessageStaff">{errors.Designation}</FormFeedback>
                        </div>
                    </div>
                    <div className="rowProfile">
                        <div className="colProfile">
                            <label className="profilelabel">Mobile Number</label>
                            <PhoneInput className="inputProfile"
                                inputProps={{
                                name: 'MobileNo',
                                // required: true,
                                    }}
                                country={'in'}
                                onlyCountries={['in']}
                                value={this.state.viewModelStaff.MobileNo}
                                onChange={this.handlePhone}
                                disableDropdown={true}
                                countryCodeEditable={true}
                            />
                            <FormFeedback className="errorMessageStaff">{errors.MobileNo}</FormFeedback>
                        </div>
                    </div>
                    <div className="rowProfile">
                        <div className="colProfile">
                        <label className="profilelabel">Email</label>
                        <input type="text" className="inputProfile" value={this.state.viewModelStaff.Email}  name="Email" onChange={this.handleChange}></input>
                        <FormFeedback className="errorMessageStaff">{errors.Email}</FormFeedback>
                        </div>
                    </div>
                    {/* <input type="submit" className="button-green-staff-add">Save</input> */}
                    <input type="submit" value="Save" 
                      className="button-green-staff-add"></input>
                </form>
                    
				</Modal> : null
			}
            {this.state.modelViewEditStaffStatus ? 
				<Modal
					open={this.state.modelViewEditStaffStatus}
          onClose={this.onCloseModalEditStaff}
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
                <p className="overLayTitle">
					Edit Staff
				</p>
                <form onSubmit={this.onclickEditStaffBtnModel}>
                <div className="rowProfile">
                        <div className="colProfile">
                            <label className="profilelabel">Name</label>
                            <input type="text" className="inputProfile" value={this.state.viewModelEditStaff.Name} name="Name" onChange={this.handleChangeEdit}></input>
                            <FormFeedback className="errorMessageStaff">{errorsEdit.Name}</FormFeedback>
                        </div>
                    </div>
                    <div className="rowProfile">
                        <div className="colProfile">
                            <label className="profilelabel">Designation</label>
                            <input type="text" className="inputProfile" value={this.state.viewModelEditStaff.Designation} name="Designation" onChange={this.handleChangeEdit}></input>
                            <FormFeedback className="errorMessageStaff">{errorsEdit.Designation}</FormFeedback>
                        </div>
                    </div>
                    <div className="rowProfile">
                        <div className="colProfile">
                            <label className="profilelabel">Mobile Number</label>
                            <PhoneInput className="inputProfile"
                                inputProps={{
                                name: 'MobileNo',
                                // required: true,
                                    }}
                                country={'in'}
                                onlyCountries={['in']}
                                value={this.state.viewModelEditStaff.MobileNo}
                                onChange={this.handlePhoneEdit}
                                disableDropdown={true}
                                countryCodeEditable={true}
                            />
                            <FormFeedback className="errorMessageStaff">{errorsEdit.MobileNo}</FormFeedback>
                        </div>
                    </div>
                    <div className="rowProfile">
                        <div className="colProfile">
                        <label className="profilelabel">Email</label>
                        <input type="text" className="inputProfile" value={this.state.viewModelEditStaff.Email}  name="Email" onChange={this.handleChangeEdit}></input>
                        <FormFeedback className="errorMessageStaff">{errorsEdit.Email}</FormFeedback>
                        </div>
                    </div>
                    {/* <input type="submit" className="button-green-staff-add">Save</input> */}
                    <input type="submit" value="Save" 
                      className="button-green-staff-add"></input>
                </form>
                    
				</Modal> : null
			}
          {this.state.deleteStaffConfirmation ? 
				<Modal
					open={this.state.deleteStaffConfirmation}
          onClose={this.onCloseModalStaffConfirmation}
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
          <p className="overLayTitle">
					  Delete Staff Confirmation
				  </p>
          <label className="profilelabel">Are you sure want to delete this staff member?</label>
          <button  
                	className="deletebtnYes"
                	onClick={this.onDeleteStaffYes}>  
                	Yes
          </button>
          <button  
                	className="cancelbtnstaff"
                	onClick={this.onCloseModalStaffConfirmation}>  
                	Cancel
          </button>
                    
				</Modal> : null
			}
        </div>
      </div>
    )
  }
}