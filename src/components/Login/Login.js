import React from "react";
import HomeSvg from '../../images/home.svg'
import Avatar from '../../images/avatar.svg'
import Wave from '../../images/wave.png'
import { FormFeedback } from 'reactstrap';
import { Modal } from 'react-responsive-modal';
import ReactTooltip from "react-tooltip";
import OtpInput from 'react-otp-input';
import firebase from "../FireBaseConfig/Firebase"
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PhoneInput from 'react-phone-input-2';
import './Login.css'

class Login extends React.Component {

	constructor(props) {
		super(props);
		const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
		this.state = {
			data: {
				email: '',
				password: '',
			},
			errors: {},
			phoneOtp:'',
			userOtp: '',
			apiEmail: 'delvadiyanikunj1234@gmail.com',
			apiPassword: 'Nikunj@123',
			registrationStatus: '',
			loggedIn,
			EyeIconhidden: true,
			navbarOpen: false,
			forgotPasswordActive: false,
			openModal : false,
			// phoneOtpCode : '',
			otpVerification :'',
			otpError:'null',
			otpverifyBtnStatus: false,
			newPasswordBtnStatus:false,
			otpSendBtnStatus: false,
			otpVerificationActive: false,
			newPasswordStatus:false,
			newPassword:'',
		};

		this.toggleShow = this.toggleShow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.forgotPasswordClick = this.forgotPasswordClick.bind(this);
		this.handlePhone = this.handlePhone.bind(this);
		this.changeSendOtpBtnStatus = this.changeSendOtpBtnStatus.bind(this);
		this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
		this.isvalidPassword = this.isvalidPassword.bind(this);
		this.onSaveNewPassword = this.onSaveNewPassword.bind(this);
	}
	handleNavbar = () => {
		this.setState({ navbarOpen: !this.state.navbarOpen });
	  }
	toggleShow() {
		this.setState({ EyeIconhidden: !this.state.EyeIconhidden });
	}
	//   componentDidMount() {
	// 	if (this.props.password) {
	// 	  this.setState({ password: this.props.password });
	// 	}
	//   }
	handlePhone(value, data, event, formattedValue) {
		this.setState({ phoneOtp: value }, 
			function () {
				this.changeSendOtpBtnStatus();
				// console.log(this.state.phoneOtp.length)
		  });
	
	  }
	changeSendOtpBtnStatus(){
		if (this.state.phoneOtp.length===12){
			this.setState({ otpSendBtnStatus: true });
		}
		else{
			this.setState({ otpSendBtnStatus: false });
		}
	}

	handleChange = (e) => {
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: e.target.value
			},
			errors: {
                ...this.state.errors,
                [e.target.name]: '',
				loginStatus:'',
            }
		});
	
	}
	handleChangeNewPassword(e){
		this.setState({
			newPassword:e.target.value
		},function(){
			if(this.isvalidPassword(this.state.newPassword)){
				this.setState({
					newPasswordBtnStatus:true
				})
			}
			else{
				this.setState({
					newPasswordBtnStatus:false
				})
			}
		})
	}
	isvalidPassword(password) {
		// eslint-disable-next-line
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/.test(password);
	}
	handleChangeOTP = (userOtp) => {
		this.setState({ userOtp }) ; 
		this.otpBtnstatusChange(userOtp)
	};
	otpBtnstatusChange(userEnteredOtp){
		
		if((userEnteredOtp.length === 6) && this.state.otpError === 'OTP has been sent to your phone number'){
			this.setState({ otpverifyBtnStatus: true});
			// console.log("indise the if true ")
		}
		else{
			this.setState({ otpverifyBtnStatus: false});
			// console.log("indise the else false")
		}
	}
	
	validate = () => {
        const { data } = this.state;
        let errors = {};
		// var phoneno = /^\d{10}$/;
        if (data.email === '') errors.email = 'Email can not be blank.';
        if (data.password === '') errors.password = 'Password can not be blank.';
		if (!this.isvalidEmail(data.email)) errors.email = 'Email address must be valid';
		if ( Object.keys(errors).length === 0 && (this.state.data.email !== this.state.apiEmail || this.state.data.password !== this.state.apiPassword)) {
				errors.loginStatus = 'Please enter correct email address and password'
		};
        return errors;

    }
	isvalidEmail(email) {
		// eslint-disable-next-line
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		if (Object.keys(errors).length === 0) {
            // console.log(data);
			localStorage.setItem("token","abcdefghi")
			this.setState({
				loggedIn: !this.state.loggedIn
			});
        } else {
            this.setState({ errors });
				this.setState({
					registrationStatus: 'false'
			});
        }
		// if (this.state.data.email === this.state.apiEmail &&
		// 	this.state.data.password === this.state.apiPassword) {
		// 	localStorage.setItem("token","abcdefghi")
		// 	this.setState({
		// 			registrationStatus: 'true',
					
		// 	});
		// 	this.setState({
		// 		loggedIn: !this.state.loggedIn
		// 	});
		// 	//call dashboard
		// }
		// else {
		// 	this.setState({
		// 			registrationStatus: 'false'
		// 	});
		// }
	}
	forgotPasswordClick(){
		this.setState({
			forgotPasswordActive : true
		});
		this.onOpenModal();
	}
	onOpenModal = () => {
		this.setState({ openModal: true });
	};
	
	onCloseModal = () => {
		this.setState({ openModal: false });
		this.setState({ newPasswordStatus: false });
		this.setState({  data: {
			email: '',
			password: '',
		},
		errors: {},
		phoneOtp:'',
		userOtp: '',
		EyeIconhidden: true,
		forgotPasswordActive: false,
		openModal : false,
		// phoneOtpCode : '',
		otpVerification :'',
		otpError:'null',
		otpverifyBtnStatus:false,
		newPasswordBtnStatus:false,
		otpSendBtnStatus: false,
		otpVerificationActive: false,
		newPasswordStatus:false,
		});
	};
	onSaveNewPassword(){
		this.setState({ newPasswordStatus: true });
	}
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
		const phoneNumber = "+" + this.state.phoneOtp
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
		const { openModal } = this.state;
		// const {errors } = this.state;
		if(this.state.loggedIn){
			return <Redirect to="/dashboard"/>
		}
		const {errors } = this.state;

		return (
			<>	 
				<Navbar 
					navbarState={this.state.navbarOpen} 
					handleNavbar={this.handleNavbar}
				/>
				<img className="wave" src={Wave} alt="Login Wave" />
				<div className="container">
					<div className="img">
						<img src={HomeSvg} alt="Home Svg" />
					</div>
					<div className="login-content">
						<form className="loginForm" onSubmit={this.handleSubmit}>
						<div id="recaptcha-container"></div>
							<img src={Avatar} alt="Login Avatar" />
							<h2 className="title">LOGIN</h2>
							<div className="input-div one">
								<div className="i">
									<i className="fas fa-user"></i>
								</div>
								<div className="div">
									{/* <input type="text" className="input" onClick={() => this.handleClick()}></input> */}
									<input type="text" placeholder="Email" className="input" value={this.state.data.email}
										onChange={this.handleChange} name="email"></input>
								</div>
							</div>
							<FormFeedback className="errorMessage">{errors.email}</FormFeedback>
							
							<div className="input-div pass">
								<div className="i">
									<i className="fas fa-lock"></i>
								</div>
								<div className="div">
									<input type={this.state.EyeIconhidden ? 'password' : 'text'} value={this.state.data.password}
										onChange={this.handleChange} placeholder="Password" className="input" name="password"></input>
									{/* <i className="bi bi-eye-slash" id="togglePassword" onClick={this.toggleShow}></i> */}
									<i className="fas fa-eye-slash togglePassword" onClick={this.toggleShow}></i>
								</div>
							</div>
							<FormFeedback className="errorMessage">{errors.password}</FormFeedback>
							{/* {this.state.registrationStatus ==='false'?
							<>
							<p className="loginError">Please enter correct email and password</p>
							</> : null} */}
							<FormFeedback className="errorMessage">{errors.loginStatus}</FormFeedback>
								<p className="linkLoginpage">
									<span className="forgotPasswordLink" onClick={this.forgotPasswordClick} >Forgot Password?</span>
									<a className="signUpLink" href="/sign-up">Not Registered Yet?</a>
								</p>
							<input type="submit" className="btn" value="Login"></input>
						</form>
					</div>
				</div>
				{this.state.forgotPasswordActive ? 
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
					Forgot Password 
					</p>
					{/* <p className="overLayTitle">
					Enter verification code 
					</p> */}
					<p className="overLayDesPassword" >Enter your registered phone number</p>
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
					<button  
                	className={this.state.otpSendBtnStatus ? "btnSendOtpEnable": "btnSendOtpDisable"}
                	disabled={!this.state.otpSendBtnStatus} onClick={this.onSignInSubmit}>  
                	Send OTP  
              		</button>
					</div>
					{/* <p className="overLayDes" >OTP will be sent to <b>{this.state.phoneOtpCode}</b> phone number</p> */}
					<p className="overLayDesPassword" >Enter OTP </p>
					<OtpInput
					inputStyle={{  
						width: '2.4rem',  
						height: '2.4rem',  
						margin: '10px 0.3rem',  
						fontSize: '1rem',  
						borderRadius: 4,  
						border: '2px solid rgba(0,0,0,0.3)',  
					  }}  
					// shouldAutoFocus
					isInputNum={true}
					isDisabled={!this.state.otpSendBtnStatus}
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
                	Verify OTP  
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
					<p className="overLayDes textRed">
					<svg className="cancelIcon" width="35" height="35" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M256 0C114.836 0 0 114.836 0 256C0 397.164 114.836 512 256 512C397.164 512 512 397.164 512 256C512 114.836 397.164 0 256 0Z" fill="#F44336"/>
					<path d="M350.273 320.105C358.613 328.449 358.613 341.93 350.273 350.273C346.113 354.434 340.652 356.523 335.188 356.523C329.727 356.523 324.266 354.434 320.105 350.273L256 286.164L191.895 350.273C187.734 354.434 182.273 356.523 176.812 356.523C171.348 356.523 165.887 354.434 161.727 350.273C153.387 341.93 153.387 328.449 161.727 320.105L225.836 256L161.727 191.895C153.387 183.551 153.387 170.07 161.727 161.727C170.07 153.387 183.551 153.387 191.895 161.727L256 225.836L320.105 161.727C328.449 153.387 341.93 153.387 350.273 161.727C358.613 170.07 358.613 183.551 350.273 191.895L286.164 256L350.273 320.105Z" fill="#FAFAFA"/>
					</svg>	
					Please Enter Valid OTP</p>
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
						open={this.state.forgotPasswordActive}
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
							Forgot Password 
						</p>
						<p></p>
						<p></p>
						{/* <div className="rowProfile"> */}
						<div className="colProfile">
							<label className="profilelabel">Password</label>
							<input type='text' placeholder="Enter new password" className="inputProfile"  onChange={this.handleChangeNewPassword} value={this.state.newPassword} name="newPassword"
											data-tip data-for="passwordTip" autoComplete ="on"></input>
							<ReactTooltip id="passwordTip" place="top" effect="solid" type="info" multiline={true} backgroundColor='#2D8681'>
								Password must contain at least 1 lowercase and 1 uppercase <br/>
								alphabetical character, 1 numeric character, 1 special<br/>
								character and must be eight characters or longer<br/>
							</ReactTooltip>
							</div>
							<div className="colProfile">

							</div>
						{/* </div> */}
						
						{/* <div className="rowProfile"> */}
							{/* <div className="colProfile"> */}
							<button  
								className={this.state.newPasswordBtnStatus ? "btnVerifyOtpEnable": "btnVerifyOtpDisable"}
								disabled={!this.state.newPasswordBtnStatus} onClick={this.onSaveNewPassword}>  
								Save  
							</button>
							{/* </div> */}
						{/* </div> */}

					</Modal> : null
				}
				{this.state.newPasswordStatus ? 
					<Modal
					open={this.state.newPasswordStatus}
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
					Your profile password has been updated successfully
					</p>
					<p className="overLayDesSuccess" >Now You can Login through your email and new password..</p>
					<p className="overLayDesSuccess">
						<a href="/login">Login Here..</a>
					</p>
				</Modal> : null
				}
			</>
		);
	}

};

export default Login;