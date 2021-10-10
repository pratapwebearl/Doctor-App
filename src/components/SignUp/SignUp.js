import React from "react";
import {Redirect} from 'react-router-dom'
import HomeSvg from '../../images/home.svg';
import Avatar from '../../images/avatar.svg';
import Wave from '../../images/wave.png';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import { FormFeedback } from 'reactstrap';
import ReactTooltip from "react-tooltip";
import 'react-phone-input-2/lib/style.css';
import "react-responsive-modal/styles.css";
import { Modal } from 'react-responsive-modal';
import OtpInput from 'react-otp-input';
import firebase from "../FireBaseConfig/Firebase"
import './SignUp.css';
import Navbar from "../Navbar/Navbar";

const options = [
	{ value: 'Cardiologist', label: 'Cardiologist' },
	{ value: 'Dentist', label: 'Dentist' },
	{ value: 'Surgeon', label: 'Surgeon' }
];
class SignUp extends React.Component {
	constructor(props) {
		super(props);
		const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
		this.state = {
			data: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
				city:'',
				phone:'',
				category:''
			},
			tempCategory:'',
			userOtp: '',
			errors: {},
			EyeIconhidden: true,
			tooltipIsActive: true,
			otpVerificationActive: false,
			openModal : false,
			phoneOtpCode : '',
			otpVerification :'',
			otpError:'null',
			otpverifyBtnStatus: false,
			loggedIn,
			navbarOpen: false,
		};
		// this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.toggleShow = this.toggleShow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePhone = this.handlePhone.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.isvalidPassword = this.isvalidPassword.bind(this);
		this.handleChangeOTP = this.handleChangeOTP.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.otpBtnstatusChange = this.otpBtnstatusChange.bind(this);

		this.onSignInSubmit = this.onSignInSubmit.bind(this);
		this.configureCaptcha = this.configureCaptcha.bind(this);
		this.onSubmitOTP = this.onSubmitOTP.bind(this);
		
	}
	handleNavbar = () => {
		this.setState({ navbarOpen: !this.state.navbarOpen });
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
			if (this.isvalidPassword(this.state.data.password)){
				this.setState({ tooltipIsActive: false });
			}
			else {
				this.setState({ tooltipIsActive: true });
			}
		});
		
    }
	handlePhone(value, data, event, formattedValue) {
		
		this.setState(prevState => (
			{
			data: {                   // object that we want to update
				...prevState.data,    // keep all other key-value pairs
				phone: value   		 // update the value of specific key
			},
			errors: {
				...this.state.errors,
				phone: ''
			}
		}))
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
	  }

	validate = () => {
        const { data } = this.state;
        let errors = {};
		// var phoneno = /^\d{10}$/;
        if (data.firstName === '') errors.firstName = 'First name can not be blank.';
		if (data.firstName.indexOf(' ') >= 0) errors.firstName = 'First name can not contain whitespace';
        if (data.lastName === '') errors.lastName = 'Last name can not be blank.';
		if (data.lastName.indexOf(' ') >= 0) errors.lastName = 'Last name can not contain whitespace';
        if (data.email === '') errors.email = 'Email address can not be blank.';
		if (!this.isvalidEmail(data.email)) errors.email = 'Email address must be valid';
		
        if (data.password === '') errors.password = 'Password can not be blank';
		if (data.password !== '' && !this.isvalidPassword(data.password)) errors.password = 'Password must match to the given pattern';
		if (data.password.indexOf(' ') >= 0) errors.password = 'Password can not contain whitespace';
		if (data.confirmPassword === '') errors.confirmPassword = 'Password can not be blank';
        if ((data.confirmPassword !== '' || data.confirmPassword !== '') && data.confirmPassword !== data.password) errors.confirmPassword = 'Confirm Password must match to password.';
		if (data.confirmPassword.indexOf(' ') >= 0) errors.confirmPassword = 'Confirm Password can not contain whitespace';
		if (data.city === '') errors.city = 'Please enter valid city';
		if (data.city.indexOf(' ') >= 0) errors.city = 'City can not contain whitespace';
		if (data.phone === '') errors.phone = 'Please enter valid phone number';
		if (data.phone.length<=11) errors.phone = 'Please enter valid phone number';
		if (data.category === '') errors.category = 'Category can not be blank';

		// if (this.isvalidPassword(this.state.password)){
		// 	this.setState({ tooltipIsActive: !this.state.tooltipIsActive });
		// 	console.log(this.state.tooltipIsActive);
		// }
        return errors;

    }
	isvalidEmail(email) {
		// eslint-disable-next-line
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	isvalidPassword(password) {
		// eslint-disable-next-line
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/.test(password);
	}

    handleSubmit = (e) => {
        e.preventDefault();
        // const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            // console.log(data);
			this.setState({ otpVerificationActive: !this.state.otpVerificationActive });
			this.onOpenModal();
			this.setPhoneAt();
            //Resetting the form
        } else {
            this.setState({ errors });
        }
    }

	toggleShow() {
		this.setState({ EyeIconhidden: !this.state.EyeIconhidden });
	}
	// componentDidMount() {
	// 	
	// }
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
		this.setState({ openModal: false });
		this.setState({  data: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			city:'',
			phone:'',
			category:''
		},
		tempCategory:'',
		userOtp: '',
		errors: {},
		EyeIconhidden: true,
		tooltipIsActive: true,
		otpVerificationActive: false,
		openModal : false,
		phoneOtpCode : '',
		otpVerification :'',
		otpError:'null',
		otpverifyBtnStatus:false,

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
		// const {tooltipIsActive} = this.state;
		if(this.state.loggedIn){
			return <Redirect to="/dashboard"/>
		}
		return (
			<><Navbar 
					navbarState={this.state.navbarOpen} 
					handleNavbar={this.handleNavbar}
				/>
	 		  	<img className="swave" src={Wave} alt="Login Wave" />
				<div className="scontainer">
					<div className="simg">
						<img src={HomeSvg} alt="Home Svg" />
					</div>
					<div className="slogin-content">
						<form className="registerForm" onSubmit={this.handleSubmit}>
							<div id="recaptcha-container"></div>
							<img src={Avatar} alt="Login Avatar" />
							<h2 className="stitle">Register</h2>
							<div className="sinput-div sone">
								<div className="si">
									<i className="fas fa-user"></i>
								</div>
								<div className="sdiv">
									<input type="text" placeholder="First Name" className="input" value={this.state.data.firstName} name="firstName" onChange={this.handleChange}></input>
								</div> 
							</div>
							<FormFeedback className="transformError">{errors.firstName}</FormFeedback>
							<div className="sinput-div stwo">
								<div className="si">
									<i className="fas fa-user"></i>
								</div>
								<div className="sdiv">
									<input type="text" placeholder="Last Name" value={this.state.data.lastName} className="" name="lastName" onChange={this.handleChange}></input>
								</div>
							</div>
							<FormFeedback className="transformError">{errors.lastName}</FormFeedback>
							<div className="sinput-div sthree">
								<div className="si">
									<i className="fas fa-envelope"></i>
								</div>
								<div className="sdiv">
									<input type="text" placeholder="Email" value={this.state.data.email} className="input" name="email" onChange={this.handleChange}></input>
								</div>
							</div>
							<FormFeedback className="transformError">{errors.email}</FormFeedback>
							<div className="sinput-div spass">
								<div className="i">
									<i className="fas fa-lock"></i>
								</div>
								<div className="sdiv">
									<input type={this.state.EyeIconhidden ? 'password' : 'text'}
									onChange={this.handleChange} placeholder="Password" className="input" 
									value={this.state.data.password}
									name="password"
									data-tip data-for="passwordTip" autoComplete ="on"
									></input>
									{/* {console.log(!this.state.tooltipIsActive)} */}
									<ReactTooltip id="passwordTip" place="top" effect="solid" type="info" multiline={true} backgroundColor='#2D8681'
									disable={!this.state.tooltipIsActive? true : false}>
									Password must contain at least 1 lowercase and 1 uppercase <br/>
									alphabetical character, 1 numeric character, 1 special<br/>
									character and must be eight characters or longer<br/>
     								</ReactTooltip>
									{/* <i className="bi bi-eye-slash" id="togglePassword" onClick={this.toggleShow}></i> */}
									
								</div>
							</div>
							<FormFeedback className="passwordError">{errors.password}</FormFeedback>
							<div className="sinput-div spassconfirm">
								<div className="i">
									<i className="fas fa-lock"></i>
								</div>
								<div className="sdiv">
									<input type={this.state.EyeIconhidden ? 'password' : 'text'} name="confirmPassword"
									onChange={this.handleChange} placeholder="Confirm Password" className="input" 
									value={this.state.data.confirmPassword} autoComplete ="on"></input>
									<i className="fas fa-eye-slash togglePassword" onClick={this.toggleShow}></i>
									{/* <i className="bi bi-eye-slash" id="togglePassword" onClick={this.toggleShow}></i> */}
									{/* <i className="fas fa-eye-slash togglePassword" onClick={this.ctoggleShow}></i> */}
								</div>
							</div>
							<FormFeedback className="cpasswordError">{errors.confirmPassword}</FormFeedback>
							<div className="sinput-div sthree">
                                <div className="si">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="sdiv">
								<input type="text" placeholder="City" className="input" value={this.state.data.city} name="city" onChange={this.handleChange}></input>
                                </div>
                            </div>
							<FormFeedback className="cpasswordError">{errors.city}</FormFeedback>
							<div className="phone">
								{/* <div className="pi">
									<i className="fas fa-phone-alt"></i>
								</div> */}
								<PhoneInput className="reactPhoneInput"
									inputProps={{
									name: 'phone',
									required: true,
								  	}}
									country={'in'}
									onlyCountries={['in']}
									value={this.state.data.phone}
									onChange={this.handlePhone}
									disableDropdown={true}
									countryCodeEditable={true}
								/>
								<FormFeedback className="phoneError">{errors.phone}</FormFeedback>
							</div>
							<div className="category">
								<Select options={options} placeholder="Select Category" name="category" onChange={this.handleCategory} value={this.state.tempCategory} />
								<FormFeedback className="categoryError">{errors.category}</FormFeedback>
							</div>
							<a className="loginLink" href="/login">Already Registered ?</a>
							<input type="submit" className="sbtn"></input>
						</form>
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
					<p className="overLayTitleSuccess">
					<svg className="successIcon" width="35" height="35" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M250 500C388.071 500 500 388.071 500 250C500 111.929 388.071 0 250 0C111.929 0 0 111.929 0 250C0 388.071 111.929 500 250 500Z" fill="#3AAFA9"/>
						<path d="M459.377 113.672L238.281 342.58L238.672 367.189H248.828L488.283 174.219C481.251 152.735 471.486 132.032 459.377 113.672Z" fill="#37A18E"/>
						<path d="M495.316 102.735L451.174 58.9846C445.315 53.1249 435.549 53.1249 429.3 58.9846L240.626 253.907L158.985 173.438C153.125 167.579 143.36 167.579 137.11 173.438L98.0471 212.111C92.1874 217.97 92.1874 227.736 98.0471 233.596L228.517 362.892C232.033 366.408 236.72 367.58 241.408 367.189C246.095 367.58 250.783 366.407 254.299 362.892L495.316 124.61C501.175 118.359 501.175 108.594 495.316 102.735Z" fill="#F2F1EF"/>
						<path d="M254.298 362.892L495.315 124.61C501.175 118.75 501.175 108.984 495.315 103.125L488.284 96.4844L241.017 339.454L104.297 206.251L98.4378 212.111C92.578 217.97 92.578 227.736 98.4378 233.596L228.908 362.893C232.424 366.409 237.111 367.581 241.798 367.19C246.095 367.58 250.782 366.408 254.298 362.892Z" fill="#E6E5E3"/>
					</svg>
					Registration Successful
					</p>
					<p className="overLayDesSuccess" >Now You can Login through your email and password..</p>
					<p className="overLayDesSuccess">
						<a href="/login">Login Here..</a>
					</p>
				</Modal> : null
			}

			</>
		);
	}
};

export default SignUp;