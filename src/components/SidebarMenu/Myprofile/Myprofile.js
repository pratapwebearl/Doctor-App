import React, { Component } from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import ReactTooltip from "react-tooltip";
import { FormFeedback } from 'reactstrap';
import { Modal } from 'react-responsive-modal';
import OtpInput from 'react-otp-input';
import firebase from "../../FireBaseConfig/Firebase";
import profileDefaultImg from "../../../images/profileImageDefault.png"
// import FileUploadWithPreview from "file-upload-with-preview";
// import "file-upload-with-preview/dist/file-upload-with-preview.min.css";
import { Multiselect } from 'multiselect-react-dropdown';
import './Myprofile.css';

const options = [
	{ value: 'Cardiologist', label: 'Cardiologist' },
	{ value: 'Audiologist', label: 'Audiologist' },
	{ value: 'Dentist', label: 'Dentist' },
	{ value: 'Surgeon', label: 'Surgeon' }
];
export default class Myprofile extends Component {
  constructor(props) {
		super(props);
		
		this.state = {
			data: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				phone:'',
				category:'',
        city:'',
        experience:'',
        DegreeDocument:'No File Selected',
        LicenseDocument:'No File Selected',
        profileImg:'No File Selected',
        selectedTimeSlot:[],
			},
      oldData :{ 
        firstName: '',
				lastName: '',
				email: '',
				password: '',
				phone:'',
				category:'',
        city:'',
        experience:'',
        DegreeDocument:'No File Selected',
        LicenseDocument:'No File Selected',
        profileImg:'No File Selected',
        selectedTimeSlot:[],
      },
      timeSlotOptions: [{time: '09-10', id: 1},{time: '10-11', id: 2},
      {time: '11-12', id: 3},{time: '12-13', id: 4},{time: '13-14', id: 5}
      ,{time: '14-15', id: 6},{time: '15-16', id: 7},{time: '16-17', id: 8}
      ,{time: '17-18', id: 9},{time: '18-19', id: 10},{time: '19-20', id: 11}
      ,{time: '20-21', id: 12}
    ],
      profileUpdateSuccess:false,
      errors: {},
      EyeIconhidden: true,
      tempCategory:'',
      oldPhone:'',
      userOtp: '',
      otpVerificationActive: false,
			openModal : false,
			phoneOtpCode : '',
			otpVerification :'',
			otpError:'null',
			otpverifyBtnStatus: false,
      btnStatusSlot: false,
      // profileupdateBtnStatus:false,
      changeStatusFirstLastPhoneEmailCity:false,
      changeStatusPhone:false,
      changeStatusCategory:false,
      changeStatusDegree:false,
      changeStatusLicense:false,
      changeStatusProfileImg:false,
		};
		// this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.uploadDegree = this.uploadDegree.bind(this);
    this.uploadLicense = this.uploadLicense.bind(this);
    this.uploadProfileImg = this.uploadProfileImg.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isvalidPassword = this.isvalidPassword.bind(this);
    this.handleChangeOTP = this.handleChangeOTP.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.otpBtnstatusChange = this.otpBtnstatusChange.bind(this);

		this.onSignInSubmit = this.onSignInSubmit.bind(this);
		this.configureCaptcha = this.configureCaptcha.bind(this);
		this.onSubmitOTP = this.onSubmitOTP.bind(this);
    this.updateProfileBtnstatus = this.updateProfileBtnstatus.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
	}
  uploadDegree(e){
    // console.warn(e.target.files)
    const files = e.target.files
    const formData = new FormData();
    formData.append('Degree_Document',files[0]);
    // console.log(files[0].name)
    if(files.length){
      this.setState(
        {
          data: {                  
            ...this.state.data,    
            DegreeDocument: files[0].name,	
          },
          errors: {
            ...this.state.errors,
            DegreeDocument: '',
          }
        }, function () {
        // console.log(this.state.data.DegreeDocument);
      });
      if(files[0].name !== this.state.oldData.DegreeDocument){
        this.setState({
          changeStatusDegree : true
        })
      }
      else{
        this.setState({
          changeStatusDegree : false
        })
      }
    }
    else{
      this.setState(
        {
          data: {                  
            ...this.state.data,    
            DegreeDocument: 'No File Selected',	
          },
          errors: {
            ...this.state.errors,
            DegreeDocument: '',
        } }, function () {
          this.setState({
            changeStatusDegree : false
          })
        // console.log(this.state.data.DegreeDocument);
      });
    }
    // console.log(this.state.data.DegreeDocument);
    // console.log(files[0].name)
    // fetch('https://127.0.0.1:8000/api/store', {
    //   method : "POST",
    //   body: formData
    // }).then((resp) => {
    //   resp.json().then((result)=>{
    //     console.warn("result",result)
    //   })
    // })
  }
  uploadLicense(e){
    // console.warn(e.target.files)
    const files = e.target.files
    const formData = new FormData();
    formData.append('Degree_Document',files[0]);
    // console.log(files[0].name)
    if(files.length){
      this.setState(
        {
          data: {                  
            ...this.state.data,    
            LicenseDocument: files[0].name,	
          },
          errors: {
            ...this.state.errors,
            LicenseDocument: '',
        }
        }, function () {
        // console.log(this.state.data.LicenseDocument);
      });
      if(files[0].name !== this.state.oldData.LicenseDocument){
        this.setState({
          changeStatusLicense : true
        })
      }
      else{
        this.setState({
          changeStatusLicense : false
        })
      }
    }
    else{
      this.setState(
        {
          data: {                  
            ...this.state.data,    
            LicenseDocument: 'No File Selected',	
          },
          errors: {
            ...this.state.errors,
            LicenseDocument: '',
        }
        }, function () {
          this.setState({
            changeStatusLicense : false
          })
        // console.log(this.state.data.LicenseDocument);
      });
    }
    
    // console.log(this.state.data.DegreeDocument);
    // console.log(files[0].name)
    // fetch('https://127.0.0.1:8000/api/store', {
    //   method : "POST",
    //   body: formData
    // }).then((resp) => {
    //   resp.json().then((result)=>{
    //     console.warn("result",result)
    //   })
    // })
  }
  uploadProfileImg(e) {

    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        // this.setState(prevState => ({
        //   data: {                   
        //     ...prevState.data,    
        //     profileImg: reader.result   
        //   }
        // },function(){
        //   console.log(this.state.data.profileImg)
        // }))
        if(e.target.files.length){
          this.setState(
            {
              data: {                  
                ...this.state.data,    
                profileImg:  reader.result   ,	
              },
              errors: {
                ...this.state.errors,
                profileImg: '',
            }
            }, function () {
            // console.log(this.state.data.profileImg);
          });
          if(e.target.files[0].name !== this.state.oldData.profileImg){
            this.setState({
              changeStatusProfileImg: true
            })
          }
          else{
            this.setState({
              changeStatusProfileImg : false
            })
          }
        }
        else{
          this.setState(
            {
              data: {                  
                ...this.state.data,    
                profileImg: 'No File Selected',	
              },
              errors: {
                ...this.state.errors,
                profileImg: '',
            }
            }, function () {
              this.setState({
                changeStatusProfileImg : false
              })
            // console.log(this.state.data.profileImg);
          });
        }
        
      }
    }
    if(e.target.files.length){
      reader.readAsDataURL(e.target.files[0])
    }
  };
  
  toggleShow() {
		this.setState({ EyeIconhidden: !this.state.EyeIconhidden });
	}
  onSelectSlot(selectedList, selectedItem){
    // console.log(selectedList,selectedItem)
    this.setState({
      selectedTimeSlot: selectedList,
      // btnStatusSlot: true,
    },function(){
      if(Object.keys(this.state.selectedTimeSlot).length > 0){
        this.setState({
          btnStatusSlot: true,
        })
      }
      else{
        this.setState({
          btnStatusSlot: false,
        })
      }
      // console.log(Object.keys(this.state.selectedTimeSlot).length )
    })
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
        
        if(this.state.data.firstName !== this.state.oldData.firstName){
          this.setState({
            changeStatusFirstLastPhoneEmailCity : true
          })
        }
        else if(this.state.data.lastName !== this.state.oldData.lastName){
          this.setState({
            changeStatusFirstLastPhoneEmailCity : true
          })
        }
        else if(this.state.data.email !== this.state.oldData.email){
          this.setState({
            changeStatusFirstLastPhoneEmailCity : true
          })
        } 
        else if(this.state.data.password !== this.state.oldData.password){
          this.setState({
            changeStatusFirstLastPhoneEmailCity : true
          })
        }
        else if(this.state.data.city !== this.state.oldData.city){
          this.setState({
            changeStatusFirstLastPhoneEmailCity : true
          })
        }
        else if(this.state.data.experience !== this.state.oldData.experience){
          this.setState({
            changeStatusFirstLastPhoneEmailCity : true
          })
        }
        else{
          this.setState({
            changeStatusFirstLastPhoneEmailCity : false
          })
        }
      });
  }
  handlePhone(value) {
		
		this.setState(
			{
			data: {                   // object that we want to update
                ...this.state.data,    // keep all other key-value pairs
				phone: value   		 // update the value of specific key
			},
            errors: {
                ...this.state.errors,
                phone: ''
            }},
    function(){
        // console.log(this.state.data.phone)
        // console.log(this.state.oldData.phone)
             if(this.state.data.phone !== this.state.oldData.phone){
            this.setState({
              changeStatusPhone : true
            })
          }
          else{
            this.setState({
              changeStatusPhone : false
            })
          }
            // console.log(this.state.changeStatusPhone)
    })
	}
  handleCategory(selectedOption) {

      this.setState(prevState => ({
        data: {                   
          ...prevState.data,    
          category: selectedOption.value    
        },
        errors: {
          ...this.state.errors,
          category: ''
        },
        tempCategory:selectedOption
      }))
      if(selectedOption.value !== this.state.oldData.category){
        this.setState({
          changeStatusCategory : true
        })
      }
      else{
        this.setState({
          changeStatusCategory : false
        })
      }
  }
  updateProfileBtnstatus(){
    // console.log(this.state.data)
    // console.log(this.state.oldData)
    // console.log(this.state.data.firstName !== this.state.oldData.firstName)
    // if(this.state.data.firstName !== this.state.oldData.firstName){
    //   this.setState({
    //     profileupdateBtnStatus : !this.state.profileupdateBtnStatus
    //   })
    // }
  }
  handleSubmit = (e) => {
      e.preventDefault();
      const errors = this.validate();

      if (Object.keys(errors).length === 0) {
        // console.log(this.state);
        if(this.state.oldPhone !== this.state.data.phone){
          this.setState({ otpVerificationActive: !this.state.otpVerificationActive });
          this.onOpenModal();
          this.setPhoneAt();
        }
        else{
          this.setState({ profileUpdateSuccess: !this.state.profileUpdateSuccess });
        }

          //Resetting the form
      } else {
          this.setState({ errors });
      }
  }
  validate = () => {
      const { data } = this.state;
      let errors = {};
      if (data.firstName === '') errors.firstName = 'First name can not be blank.';
      if (data.firstName.indexOf(' ') >= 0) errors.firstName = 'First name can not contain whitespace';
      if (data.lastName === '') errors.lastName = 'Last name can not be blank.';
      if (data.lastName.indexOf(' ') >= 0) errors.lastName = 'Last name can not contain whitespace';
      if (data.email === '') errors.email = 'Email can not be blank.';
      if (!this.isvalidPassword(data.password)) errors.password = 'Password must match to the given pattern';
      if (data.phone === '') errors.phone = 'Please enter valid phone number';
      if (data.phone.length<=11) errors.phone = 'Please enter valid phone number';
      if (data.category === '') errors.category = 'Category can not be blank';
      if (data.city === '') errors.city = 'City can not be blank';
      if (data.city.indexOf(' ') >= 0) errors.city = 'City can not contain whitespace';
      if (data.experience === '' || data.experience === null) errors.experience = 'Experience can not be blank';
      if (data.DegreeDocument === 'No File Selected') errors.DegreeDocument = 'Degree Document can not be blank';
      if (data.LicenseDocument === 'No File Selected') errors.LicenseDocument = 'License Document can not be blank';
      if (data.profileImg === 'No File Selected') errors.profileImg = 'Profile Image can not be blank';
      return errors;
  }
  isvalidPassword(password) {
		// eslint-disable-next-line
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/.test(password);
	}
  componentDidMount() {
    //api call to update state info
    this.setState(
      {
        data: {                    
        firstName: 'Nikunj',
				lastName: 'Delavadiya',
				email: 'delvadiyanikunj1234@gmail.com',
				password: 'Nikunj@123',
        
				phone:'917046777696',// eslint-disable-line prefer-template
				category:'Dentist',
        city:'Botad',
        experience:null,
        DegreeDocument:'No File Selected',
        LicenseDocument:'No File Selected',
        profileImg:'No File Selected',
        },
        oldData:{                 
            firstName: 'Nikunj',
            lastName: 'Delavadiya',
            email: 'delvadiyanikunj1234@gmail.com',
            password: 'Nikunj@123',
          
            phone:'917046777696',  // eslint-disable-line prefer-template
            category:'Dentist',
            city:'Botad',
            experience: null,
            DegreeDocument:'No File Selected',
            LicenseDocument:'No File Selected',
            profileImg:'No File Selected',
        },
        tempCategory :{
          label: 'Dentist',
          value: 'Dentist'
      },
        oldPhone:'917046777696',
      }, function () {
        console.log(this.state.data)
        // console.log(this.state.tempCategory)
    });
  
  }
  handleChangeOTP = (userOtp) => {this.setState({ userOtp }) ; this.otpBtnstatusChange(userOtp)};
	// handleChangeOTP(userOtp){
	// 		this.setState({ userOtp : userOtp})
	// 		console.log(this.state.userOtp);
	// 		this.otpBtnstatusChange();
	// } 
	onOpenModal = () => {
		this.setState({ openModal: true });
		this.onSignInSubmit();
	};
	
	onCloseModal = () => {
    this.setState({profileUpdateSuccess:false});
		this.setState({ openModal: false });
		this.setState({  
    //   data: {
		// 	firstName: '',
		// 	lastName: '',
		// 	email: '',
		// 	password: '',
		// 	confirmPassword: '',
		// 	phone:'',
		// 	category:''
		// },
    profileUpdateSuccess:false,
		userOtp: '',
		errors: {},
		EyeIconhidden: true,
		otpVerificationActive: false,
		openModal : false,
		phoneOtpCode : '',
		otpVerification :'',
		otpError:'null',
		otpverifyBtnStatus:false,
    changeStatusFirstLastPhoneEmailCity:false,
    changeStatusPhone:false,
    changeStatusCategory:false,
    changeStatusDegree:false,
    changeStatusLicense:false,
    changeStatusProfileImg:false,
		});
	};
	setPhoneAt = () => {
		var phone = this.state.data.phone;
		phone = phone.substring(2,11);
		for(var i=2;i<6;i++)
		{
			phone = phone.substring(0,i) + '*' + phone.substring(i+1);
		}
		
		this.setState({phoneOtpCode : phone})
		// console.log(this.state.phoneOtpCode);
	}
	otpBtnstatusChange(userEnteredOtp){
		
		// console.log('state otp  '+this.state.userOtp)
		// console.log('user entered otp '+userEnteredOtp);
		// console.log('user entered otp length '+userEnteredOtp.length)
		// console.log(this.state.otpError)
		// console.log('button status  '+this.state.otpverifyBtnStatus)
		
		if((userEnteredOtp.length === 6) && this.state.otpError === 'OTP has been sent to your phone number'){
			this.setState({ otpverifyBtnStatus: true});
			console.log("indise the if true ")
		}
		else{
			this.setState({ otpverifyBtnStatus: false});
			console.log("indise the else false")
		}
	}
	// verifyOtp = () => {
	// 	this.onSubmitOTP();
		// this.onSignInSubmit();
		// console.log(this.state)
		// if(this.state.userOtp === this.state.apiOtp){
		// 	console.log(this.state.data);
		// 	//Call an api here
		// 	this.setState({ otpVerification: 'true'})
		// }
		// else(
		// 	this.setState({ otpVerification: 'false'})
		// )
	// }
	// sendOtp = () =>{
	// 	this.setState({
	// 		sentOtpButton: true,
	// 	});
	// }
	configureCaptcha = () =>{
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
		  'size': 'invisible',
		  'callback': (response) => {
			// reCAPTCHA solved, allow signInWithPhoneNumber.
			this.onSignInSubmit();
			console.log("Recaptca varified")
		  },
		  defaultCountry: "IN"
		});
	  }
	  onSignInSubmit = () => {
		// e.preventDefault()
		this.configureCaptcha()
		const phoneNumber = "+" + this.state.data.phone
		console.log(phoneNumber)
		const appVerifier = window.recaptchaVerifier;
		firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
			.then((confirmationResult) => {
			  // SMS sent. Prompt user to type the code from the message, then sign the
			  // user in with confirmationResult.confirm(code).
			  window.confirmationResult = confirmationResult;
			  console.log("OTP has been sent")
			  this.setState({otpError : 'OTP has been sent to your phone number'})
			  // ...
			}).catch((error) => {
			  // Error; SMS not sent
			  // ...
			  console.log("SMS not sent")
			  console.log(error)
			  this.setState({otpError : 'SMS not sent. Please try again later'})
			});
	  }
	  onSubmitOTP = () =>{
		// e.preventDefault()
		const code = this.state.userOtp
		console.log(code)
		window.confirmationResult.confirm(code).then((result) => {
		  // User signed in successfully.
		  const user = result.user;
		  console.log(JSON.stringify(user))
		//   alert("User is verified")
		  this.setState({ otpVerification: 'true'})
		  // ...
		}).catch((error) => {
		  // User couldn't sign in (bad verification code?)
		  // ...
		  this.setState({ otpVerification: 'false'})
		  console.log(error)
		});
	  }


  render() {
    const {errors } = this.state;
    const { openModal } = this.state;
    return (
      <div className="dashboardComponentViewProfile">
        <div className="profile-container">
          <div className="profile-title">
                <p><i className="fas fa-user-circle fa-user-circle-profile"></i>Your Profile</p>
          </div>
          <div className="profileinfo">
              <form onSubmit={this.handleSubmit}>
              <div id="recaptcha-container"></div>
                <div className="rowProfile">
                  <div className="colProfile">
                    <label className="profilelabel">Profile Image</label>
                    <div className="profile-img-holder">
                      {this.state.data.profileImg ==='No File Selected'?
                        <>
                          <img src={profileDefaultImg} className="profileimg" alt="doctor profile"></img>
                        </>:
                        <>
                          <img src={this.state.data.profileImg} className="profileimg" alt="doctor profile"></img>
                        </>
                      }
                       <FormFeedback className="errorMessage">{errors.profileImg}</FormFeedback>
                      <input type="file" name="profileImg" id="profileImg" accept="image/*" onChange={(e)=>this.uploadProfileImg(e)}/>
                      <div className="btnUploadImage">
                          
                          <label htmlFor="profileImg" className="profileImgUpload">
                          <i className="fas fa-upload fa-upload-profileImg"></i>
                            Choose Profile Image</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rowProfile">
                  <div className="colProfile">
                    <label className="profilelabel">First Name</label>
                    <input type="text" className="inputProfile" value={this.state.data.firstName} name="firstName" onChange={this.handleChange}></input>
                    <FormFeedback className="errorMessage">{errors.firstName}</FormFeedback>
                  </div>
                    <div className="colProfile">
                      <label className="profilelabel">Last Name</label>
                      <input type="text" className="inputProfile" value={this.state.data.lastName}  name="lastName" onChange={this.handleChange}></input>
                      <FormFeedback className="errorMessage">{errors.lastName}</FormFeedback>
                    </div>
                </div>
                <div className="rowProfile">
                  <div className="colProfile">
                    <label className="profilelabel">Email</label>
                    <input type="email" className="inputProfile" value={this.state.data.email}  name="email" onChange={this.handleChange} required></input>
                    <FormFeedback className="errorMessage">{errors.email}</FormFeedback>
                  </div>
                    <div className="colProfile">
                      <label className="profilelabel">Password</label>
                      <input type={this.state.EyeIconhidden ? 'password' : 'text'} className="inputProfile"  onChange={this.handleChange} value={this.state.data.password} name="password"
									data-tip data-for="passwordTip" autoComplete ="on"></input>
                  <i className="fas fa-eye-slash togglePasswordProfile" onClick={this.toggleShow}></i>
                  <FormFeedback className="errorMessage">{errors.password}</FormFeedback>
                      <ReactTooltip id="passwordTip" place="top" effect="solid" type="info" multiline={true} backgroundColor='#2D8681'>
                        Password must contain at least 1 lowercase and 1 uppercase <br/>
                        alphabetical character, 1 numeric character, 1 special<br/>
                        character and must be eight characters or longer<br/>
     								  </ReactTooltip>
                    </div>
                </div>
                <div className="rowProfile">
                  <div className="colProfile">
                    <label className="profilelabel">Phone No.</label>
                    <div data-tip data-for="phoneTip">
                    <PhoneInput className="inputProfile"
                      inputProps={{
                      name: 'phone',
                      // required: true,
                        }}
                      country={'in'}
                      onlyCountries={['in']}
                      value={this.state.data.phone}
									    onChange={this.handlePhone}
                      disableDropdown={true}
                      countryCodeEditable={true}
                    />
                    </div>
                    <ReactTooltip id="phoneTip" place="top" effect="solid" type="info" multiline={true} backgroundColor='#2D8681'>
									  If you change your phone number then again <br/>
                    you have to verify it through otp<br/>
     								</ReactTooltip>
                    <FormFeedback className="errorMessage">{errors.phone}</FormFeedback>
                  </div>
                    <div className="colProfile">
                      <label className="profilelabel">Category</label>
                      <Select options={options} placeholder="Select Category" name="category" onChange={this.handleCategory} value={this.state.tempCategory} />
                      <FormFeedback className="errorMessage">{errors.category}</FormFeedback>
                    </div>
                </div>
                <div className="rowProfile">
                    <div className="colProfile">
                      <label className="profilelabel">City</label>
                      <input type="text" className="inputProfile" value={this.state.data.city}  name="city" onChange={this.handleChange}></input>
                      <FormFeedback className="errorMessage">{errors.city}</FormFeedback>
                    </div>
                    <div className="colProfile">
                      <label className="profilelabel">Experience (year)</label>
                      <input type="number" className="inputProfile" value={this.state.data.experience}  name="experience" onChange={this.handleChange} min="0" max="100"></input>
                      <FormFeedback className="errorMessage">{errors.experience}</FormFeedback>
                    </div>
                </div>
                <div className="rowProfile">
                  <div className="colProfile">
                    <label className="profilelabel">Degree Document</label>
                    <input type="file" className="inputProfile" accept=".pdf" name="DegreeDocument" onChange={(e)=>this.uploadDegree(e)}/>
                    <p className="documentName">Degree Document : {this.state.data.DegreeDocument === "No File Selected" ? "No File Uploaded" :
                      <>
                      {this.state.data.DegreeDocument}
                      </>
                      }</p>
                       <FormFeedback className="errorMessage">{errors.DegreeDocument}</FormFeedback>
                  </div>
                    <div className="colProfile">
                      <label className="profilelabel">License Document</label>

                      <input type="file" className="inputProfile" accept=".pdf" name="LicenseDocument" onChange={(e)=>this.uploadLicense(e)}/>
      
                      <p className="documentName">License Document : {this.state.data.LicenseDocument === "No File Selected" ? "No File Uploaded" :
                      <>
                      {this.state.data.LicenseDocument}
                      </>
                      }</p>
                      <FormFeedback className="errorMessage">{errors.LicenseDocument}</FormFeedback>
                    </div>
                </div>
                
                <div className="rowProfile marginBottom">
                  <div className="colProfile">
                    {/* {console.log(this.state.changeStatusFirstLastPhoneEmailCity)}
                    { console.log(this.state.changeStatusPhone)}
                    { console.log(this.state.changeStatusCategory)}
                    {console.log(this.state.changeStatusDegree)}
                    {console.log(this.state.changeStatusDegree)} */}
                   
                
                    <input type="submit" value="Save" 
                      className={this.state.changeStatusFirstLastPhoneEmailCity || 
                      this.state.changeStatusPhone || this.state.changeStatusCategory 
                       || this.state.changeStatusDegree || this.state.changeStatusLicense ||this.state.changeStatusProfileImg  ? 
                       "sbtnProfile": "sbtnProfileDisable"}
                      disabled={!(this.state.changeStatusFirstLastPhoneEmailCity ||
                      this.state.changeStatusPhone ||
                      this.state.changeStatusCategory||
                      this.state.changeStatusDegree||
                      this.state.changeStatusLicense||
                      this.state.changeStatusProfileImg
                      )}></input>
                  </div>
                </div>
              </form> 
              <hr className="profileFielddivide"></hr>
              <div className="rowProfile marginBottomTimeslot">
                  {/* <div className="colProfile"> */}
                    <label className="profilelabelMain"><span className="profilelabelMainContent">Time Slot Selection</span></label>
                    <p className="profilelabel">Monday</p>
                      <Multiselect
                        options={this.state.timeSlotOptions} 
                        selectedValues={this.state.selectedValue}
                        onSelect={this.onSelectSlot}
                        onRemove={this.onRemove}
                        displayValue="time"
                        placeholder="Select slot"
                      />
              </div>
              <div className="rowProfile marginBottomTimeslot">
                  {/* <div className="colProfile"> */}
                    <p className="profilelabel">Tuesday</p>
                      <Multiselect
                        options={this.state.timeSlotOptions} 
                        selectedValues={this.state.selectedValue}
                        onSelect={this.onSelectSlot}
                        onRemove={this.onRemove}
                        displayValue="time"
                        placeholder="Select slot"
                      />
              </div>
              <div className="rowProfile marginBottomTimeslot">
                  {/* <div className="colProfile"> */}
                    <p className="profilelabel">Wednesday</p>
                      <Multiselect
                        options={this.state.timeSlotOptions} 
                        selectedValues={this.state.selectedValue}
                        onSelect={this.onSelectSlot}
                        onRemove={this.onRemove}
                        displayValue="time"
                        placeholder="Select slot"
                      />
              </div>
              <div className="rowProfile marginBottomTimeslot">
                  {/* <div className="colProfile"> */}
                    <p className="profilelabel">Thursday</p>
                      <Multiselect
                        options={this.state.timeSlotOptions} 
                        selectedValues={this.state.selectedValue}
                        onSelect={this.onSelectSlot}
                        onRemove={this.onRemove}
                        displayValue="time"
                        placeholder="Select slot"
                      />
              </div>
              <div className="rowProfile marginBottomTimeslot">
                  {/* <div className="colProfile"> */}
                    <p className="profilelabel">Friday</p>
                      <Multiselect
                        options={this.state.timeSlotOptions} 
                        selectedValues={this.state.selectedValue}
                        onSelect={this.onSelectSlot}
                        onRemove={this.onRemove}
                        displayValue="time"
                        placeholder="Select slot"
                      />
              </div>
              <div className="rowProfile marginBottomTimeslot">
                  {/* <div className="colProfile"> */}
                    <p className="profilelabel">Saturday</p>
                      <Multiselect
                        options={this.state.timeSlotOptions} 
                        selectedValues={this.state.selectedValue}
                        onSelect={this.onSelectSlot}
                        onRemove={this.onRemove}
                        displayValue="time"
                        placeholder="Select slot"
                      />
              </div>
              <div className="rowProfile marginBottomTimeslot">
                  {/* <div className="colProfile"> */}
                    <p className="profilelabel">Sunday</p>
                      <Multiselect
                        options={this.state.timeSlotOptions} 
                        selectedValues={this.state.selectedValue}
                        onSelect={this.onSelectSlot}
                        onRemove={this.onRemove}
                        displayValue="time"
                        placeholder="Select slot"
                      />
              </div>
              <div className="rowProfile marginBottomTimeslot">
                {/* {console.log( this.state.btnStatusSlot)} */}
                <button  
                     className={ this.state.btnStatusSlot ? 
                       "sbtnProfile": "sbtnProfileDisable"}
                      >
                    Save Slot 
                </button>
              </div>

          </div>
        </div>
        {this.state.otpVerificationActive ? 
				<>
				<Modal
					open={openModal}
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
					Enter verification code 
					</p>
					<p className="overLayDes" >OTP will be sent to <b>{this.state.phoneOtpCode}</b> phone number</p>
					<OtpInput
					inputStyle={{  
						width: '2.4rem',  
						height: '2.4rem',  
						margin: '10px 0.3rem',  
						fontSize: '1rem',  
						borderRadius: 4,  
						border: '2px solid rgba(0,0,0,0.3)',  
					  }}  
					shouldAutoFocus
					isInputNum={true}
					onChange={this.handleChangeOTP}
					value={this.state.userOtp}
					numInputs={6}
					separator={<span>-</span>}
					/> 
					{/* <button  
                	className="btnSendOtp"  
                	onClick={this.sendOtp}>  
                	Send OTP 
              		</button> */}
					<button  
                	className={this.state.otpverifyBtnStatus ? "btnVerifyOtpEnable": "btnVerifyOtpDisable"}
                	disabled={!this.state.otpverifyBtnStatus} onClick={this.onSubmitOTP}>  
                	Verify  OTP  
              		</button>
					{this.state.otpError === "null" ? <></> :
					<p className="overLayDes">{this.state.otpError}</p>
					}
					

					{/* {this.state.otpVerificationMesaage ? <p className="successMsg">{this.state.otpVerificationMesaage}{this.state.otpVerificationMesaage === "Registration Successful"
					? <>
					<svg width="30" height="30" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M250 500C388.071 500 500 388.071 500 250C500 111.929 388.071 0 250 0C111.929 0 0 111.929 0 250C0 388.071 111.929 500 250 500Z" fill="#3AAFA9"/>
						<path d="M459.377 113.672L238.281 342.58L238.672 367.189H248.828L488.283 174.219C481.251 152.735 471.486 132.032 459.377 113.672Z" fill="#37A18E"/>
						<path d="M495.316 102.735L451.174 58.9846C445.315 53.1249 435.549 53.1249 429.3 58.9846L240.626 253.907L158.985 173.438C153.125 167.579 143.36 167.579 137.11 173.438L98.0471 212.111C92.1874 217.97 92.1874 227.736 98.0471 233.596L228.517 362.892C232.033 366.408 236.72 367.58 241.408 367.189C246.095 367.58 250.783 366.407 254.299 362.892L495.316 124.61C501.175 118.359 501.175 108.594 495.316 102.735Z" fill="#F2F1EF"/>
						<path d="M254.298 362.892L495.315 124.61C501.175 118.75 501.175 108.984 495.315 103.125L488.284 96.4844L241.017 339.454L104.297 206.251L98.4378 212.111C92.578 217.97 92.578 227.736 98.4378 233.596L228.908 362.893C232.424 366.409 237.111 367.581 241.798 367.19C246.095 367.58 250.782 366.408 254.298 362.892Z" fill="#E6E5E3"/>
						</svg>
					</> : <>
					<svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M256 0C114.836 0 0 114.836 0 256C0 397.164 114.836 512 256 512C397.164 512 512 397.164 512 256C512 114.836 397.164 0 256 0Z" fill="#F44336"/>
					<path d="M350.273 320.105C358.613 328.449 358.613 341.93 350.273 350.273C346.113 354.434 340.652 356.523 335.188 356.523C329.727 356.523 324.266 354.434 320.105 350.273L256 286.164L191.895 350.273C187.734 354.434 182.273 356.523 176.812 356.523C171.348 356.523 165.887 354.434 161.727 350.273C153.387 341.93 153.387 328.449 161.727 320.105L225.836 256L161.727 191.895C153.387 183.551 153.387 170.07 161.727 161.727C170.07 153.387 183.551 153.387 191.895 161.727L256 225.836L320.105 161.727C328.449 153.387 341.93 153.387 350.273 161.727C358.613 170.07 358.613 183.551 350.273 191.895L286.164 256L350.273 320.105Z" fill="#FAFAFA"/>
					</svg>
					</>
					}</p>: null} */}
					{this.state.otpVerification === "false" ? 
					<>
					<p className="overLayDes">
					<svg className="cancelIcon" width="35" height="35" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M256 0C114.836 0 0 114.836 0 256C0 397.164 114.836 512 256 512C397.164 512 512 397.164 512 256C512 114.836 397.164 0 256 0Z" fill="#F44336"/>
					<path d="M350.273 320.105C358.613 328.449 358.613 341.93 350.273 350.273C346.113 354.434 340.652 356.523 335.188 356.523C329.727 356.523 324.266 354.434 320.105 350.273L256 286.164L191.895 350.273C187.734 354.434 182.273 356.523 176.812 356.523C171.348 356.523 165.887 354.434 161.727 350.273C153.387 341.93 153.387 328.449 161.727 320.105L225.836 256L161.727 191.895C153.387 183.551 153.387 170.07 161.727 161.727C170.07 153.387 183.551 153.387 191.895 161.727L256 225.836L320.105 161.727C328.449 153.387 341.93 153.387 350.273 161.727C358.613 170.07 358.613 183.551 350.273 191.895L286.164 256L350.273 320.105Z" fill="#FAFAFA"/>
					</svg>	
					Please Enter Correct OTP</p>
					</>
					: 
					<>
					</>
					}
				</Modal>
				</>
				: null}
        {this.state.otpVerification ==="true" ? 
				<Modal
					open={this.state.otpVerification}
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
					Your profile has been updated successfully
					</p>
					<p className="overLayDesSuccess" >Go to your dashboard..</p>
					<p className="overLayDesSuccess">
						<a href="/dashboard">Dashboard</a>
					</p>
				</Modal> : null
			}

      {this.state.profileUpdateSuccess ? 
				<Modal
					open={this.state.profileUpdateSuccess}
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
					Your profile has been updated successfully
					</p>
					<p className="overLayDesSuccess" >Go to your dashboard..</p>
					<p className="overLayDesSuccess">
						<a href="/dashboard">Dashboard</a>
					</p>
				</Modal> : null
			}
      </div>
    )
  }
}
