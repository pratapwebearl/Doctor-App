import React, { Component } from 'react';
import { FormFeedback } from 'reactstrap';
import { Modal } from 'react-responsive-modal';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageUploading from "react-images-uploading";
import uploadImagesSvg from '../../../images/uploadImagesSvg.svg';
import NoLogSvg from '../../../images/noLogSvg.svg';
import './Myhospital.css';

export default class Myhospital extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            data: {
				hospitalName: '',
                mapLink:'',
                phone:'',
                email:'',
                addressHospital:'',
			},
            oldData:{                 
                hospitalName: '',
                mapLink:'',
                phone:'',
                email:'',
                addressHospital:'',
            },
            // hospitalImages : [],
            images:[],
            oldimages:[],
            inoutlog:[],
            errors: {},
            changeStatusPhone:false,
            changeStatusbtnHospital:false,
            hospitalUpdateSuccess : false,
            imageSaveBtnStatus:false,
            hospitalUpdateImages : false,
            inoutShowLog : false,
		};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.onChangeImages = this.onChangeImages.bind(this);
        this.onSaveImages = this.onSaveImages.bind(this);
        this.onShowLog = this.onShowLog.bind(this);
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
          
          if(this.state.data.hospitalName !== this.state.oldData.hospitalName){
            this.setState({
                changeStatusbtnHospital : true
            })
          }
          else if(this.state.data.mapLink !== this.state.oldData.mapLink){
            this.setState({
                changeStatusbtnHospital : true
            })
          }
          else if(this.state.data.email !== this.state.oldData.email){
            this.setState({
                changeStatusbtnHospital : true
            })
          } 
          else if(this.state.data.addressHospital !== this.state.oldData.addressHospital){
            this.setState({
                changeStatusbtnHospital : true
            })
          } 
          else{
            this.setState({
                changeStatusbtnHospital : false
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
    handleSubmit (e) {
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
    onSaveImages(){
        this.onOpenModalImages();
    }
    validate = () => {
        const { data } = this.state;
        let errors = {};
        if (data.hospitalName === '') errors.hospitalName = 'Hospital Name can not be blank.';
        if (data.mapLink === '') errors.mapLink = 'Google Map Link can not be blank.';
        if (data.phone === '') errors.phone = 'Please enter valid phone number';
        if (data.phone.length<=11) errors.phone = 'Please enter valid phone number';
        if (data.email === '') errors.email = 'Email can not be blank.';
        if (data.addressHospital === '') errors.addressHospital = 'Address can not be blank.';
        return errors;
    }
    onOpenModal = () => {
		this.setState({ hospitalUpdateSuccess: true });
	};
    onOpenModalImages = () => {
		this.setState({   hospitalUpdateImages : true });
	};
	onCloseModalImages = () => {
        this.setState({
            // data: {
            //     hospitalName: '',
            //     addressHospital:'',
            // },
            // oldData:{                 
            //     hospitalName: '',
            //     addressHospital:'',
            // },
            hospitalUpdateImages : false,
            imageSaveBtnStatus:false,
            })
	};
	onCloseModal = () => {
        this.setState({
        // data: {
        //     hospitalName: '',
        //     addressHospital:'',
        // },
        // oldData:{                 
        //     hospitalName: '',
        //     addressHospital:'',
        // },
        errors: {},
        changeStatusPhone:false,
        changeStatusbtnHospital:false,
        hospitalUpdateSuccess : false,
        })
    };
    // equals = (a, b) => a.length !== b.length && a.every((v, i) => v ===[i]);
    onChangeImages(imageList, addUpdateIndex){
        // data for submit
        // console.log(imageList);
        this.setState({
            images : imageList
        },function(){
            // console.log(this.state.images)
            // console.log(this.state.oldimages)
            // console.log(this.state.images !== this.state.oldimages)
            if(JSON.stringify(this.state.images) !== JSON.stringify(this.state.oldimages)){
                this.setState({
                    imageSaveBtnStatus : true
                })
              }
              else{
                this.setState({
                    imageSaveBtnStatus : false
                })
              }

        })
        // setImages(imageList);
      };
    onShowLog(){
        this.onOpenModalLog();
    }
    onOpenModalLog = () => {
		this.setState({   inoutShowLog : true });
	};
	onCloseModalLog = () => {
        this.setState({
            // inoutlog:[],
            inoutShowLog:false
       })
	};
    componentDidMount() {
        //api call to update state info
        this.setState(
          {
            data: {                    
                hospitalName: 'Akshar Hospital',
                mapLink:'https://www.google.com/maps/place/Akshar+Hospital/@22.1735312,71.6583514,17z/data=!4m9!1m2!2m1!1sakshar+hospital+botad!3m5!1s0x3958dde8f18f7e3b:0x25f0e0beb569775c!8m2!3d22.1732918!4d71.6618409!15sChVha3NoYXIgaG9zcGl0YWwgYm90YWSSARJtYXRlcm5pdHlfaG9zcGl0YWw',
                phone:'917046777696',
                email:'AksharHospital@gmail.com',
                addressHospital:'Paliyad Rd, near marketing yard, Kharama, Botad, Gujarat 364710',
            },
            oldData:{                 
                hospitalName: 'Akshar Hospital',
                mapLink:'https://www.google.com/maps/place/Akshar+Hospital/@22.1735312,71.6583514,17z/data=!4m9!1m2!2m1!1sakshar+hospital+botad!3m5!1s0x3958dde8f18f7e3b:0x25f0e0beb569775c!8m2!3d22.1732918!4d71.6618409!15sChVha3NoYXIgaG9zcGl0YWwgYm90YWSSARJtYXRlcm5pdHlfaG9zcGl0YWw',
                // eslint-disable-next-line 
                // eslint-disable-line prefer-template 
                phone:'917046777696',
                email:'AksharHospital@gmail.com',
                addressHospital:'Paliyad Rd, near marketing yard, Kharama, Botad, Gujarat 364710',
            },
            images:[
            
            ],
            oldimages:[
            
            ],
            inoutlog:[
                {in:'10:00',out:'11:30'},
                {in:'12:30',out:'04:30'},
                {in:'05:00',out:'06:30'},
            ],
        //    hospitalImages : [
               
        //         {
        //           original: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        //           thumbnail: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        //           originalHeight:'100%',
        //         //   originalWidth:'100%',
        //         },
        //         {
        //           original: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        //           thumbnail: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        //           originalHeight:'100%',
        //         //   originalWidth:'100%',
        //         },
        //         {
        //             original: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80',
        //             thumbnail: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80',
        //             originalHeight:'100%',
        //             // originalWidth:'100%',
        //         },
        //         {
        //             original: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //             thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //             originalHeight:'100%',
        //             // originalWidth:'100%',
        //         },
        //         {
        //             original: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        //             thumbnail: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        //             originalHeight:'100%',
        //           //   originalWidth:'100%',
        //           },
        //           {
        //             original: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //             thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //             originalHeight:'100%',
        //             // originalWidth:'100%',
        //         },
        //         {
        //             original: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        //             thumbnail: 'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        //             originalHeight:'100%',
        //             // originalWidth:'100%',
        //         },
        //         {
        //             original: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //             thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //             originalHeight:'100%',
        //             // originalWidth:'100%',
        //         },
                  
        //       ],
            oldPhone:'917046777696',
          }, function () {
            console.log(this.state.data)
            // console.log(this.state.tempCategory)
        });
      
      }

    render() {
        const {errors } = this.state;
        return (
            <div className="dashboardComponentViewHospital">
                <div className="hospital-container">
                    <div className="hospital-title">
                            <p><i className="fas fa-hospital fa-hospital-info"></i>Hospital's Detail</p>
                    </div>
                    <div className="hospitalinfo">
                        <form onSubmit={this.handleSubmit}>
                                <div className="rowProfile">
                                    <div className="colProfile">
                                        <label className="profilelabel">Hospital Name</label>
                                        <input type="text" className="inputProfile" value={this.state.data.hospitalName} name="hospitalName" onChange={this.handleChange}></input>
                                        <FormFeedback className="errorMessage">{errors.hospitalName}</FormFeedback>
                                    </div>
                                    <div className="colProfile">
                                        <label className="profilelabel">Google Map Link<span className="MapLink"><a className="linkTag" href={this.state.data.mapLink} target="_blank" rel="noopener noreferrer">Open in google maps<i className="fas fa-map-marked fa-map-marked-link"></i></a></span></label>
                                        <input type="text" className="inputProfile" value={this.state.data.mapLink} name="mapLink" onChange={this.handleChange}></input>
                                        <FormFeedback className="errorMessage">{errors.mapLink}</FormFeedback>
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
                                        <FormFeedback className="errorMessage">{errors.phone}</FormFeedback>
                                    </div>
                                    <div className="colProfile">
                                        <label className="profilelabel">Email</label>
                                        <input type="email" className="inputProfile" value={this.state.data.email}  name="email" onChange={this.handleChange} required></input>
                                        <FormFeedback className="errorMessage">{errors.email}</FormFeedback>
                                    </div>
                                </div>
                                <div className="rowProfile">
                                    <div className="colProfile">
                                        <label className="profilelabel">Address of Hospital</label>
                                        <textarea className="inputProfile textareawidth"
                                        rows={5} 
                                        value={this.state.data.addressHospital}
                                        onChange={this.handleChange}
                                        name="addressHospital"
                                        placeholder="type address here..."
                                        />
                                        <FormFeedback className="errorMessage">{errors.addressHospital}</FormFeedback>
                                    </div>
                                </div>
                                <input type="submit" value="Save" className={this.state.changeStatusbtnHospital || this.state.changeStatusPhone  ? "sbtnProfile": "sbtnProfileDisable"}
                                disabled={!(this.state.changeStatusbtnHospital || this.state.changeStatusPhone) }
                                ></input>
                        </form>
                        <div>
                            <hr className="profileFielddivide"></hr>
                            <p className="profilelabelMain"><span className="profilelabelMainContent">Doctor in/out log:</span></p>
                                <button  
                                className= "imageSaveBtnEnable"
                                onClick={this.onShowLog}> <i class="far fa-clock fa-clock-log"></i>Show Log
                                </button>
                        </div>

                        <hr className="profileFielddivide"></hr>
                        <p className="profilelabelMain"><span className="profilelabelMainContent">Hospital images</span></p>
                       

                        {/* <div className="hospitalImagesView">
                            <ImageGallery items={this.state.hospitalImages} 
                                        autoPlay={true}
                                        // slideDuration='450'
                            />
                        </div> */}
                        {/* <p className="profilelabelMain"><span className="profilelabelMainContent">Hospital images update/delete</span></p> */}
                        <p className="uploadMaxImageLine"> *Upload images (Max. 8)</p>
                        <div>
                            <ImageUploading
                                multiple
                                value={this.state.images}
                                onChange={this.onChangeImages}
                                maxNumber={8}
                                dataURLKey="data_url"
                            >
                                {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                                }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    <button
                                    style={isDragging ? { color: "#2B7A79" } : null}
                                    className="btn-hospital-images"
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    >
                                    <i className="fas fa-upload fa-upload-hospitalImage"></i>Click or Drop here
                                    </button>
                                    &nbsp;
                                    <button onClick={onImageRemoveAll} className="btn-hospital-images"><i className="far fa-trash-alt fa-trash-alt-images"></i>Remove all images</button>
                                    {this.state.images.length === 0 ? 
                                    <>
                                     <div className="uploadImagesSvgDiv">
                                        <img src={uploadImagesSvg} alt="noImages" className="uploadImagesSvg"></img>
                                        <p className="svgLabelImages">No Images Found</p>
                                    </div>
                                    </>
                                    :
                                    <>
                                        {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                        <img src={image.data_url} alt="" className="image-view-hospital"/>
                                        <div className="image-item__btn-wrapper">
                                            <button onClick={() => onImageUpdate(index)} className="btn-hospital-images">Update</button>
                                            <button onClick={() => onImageRemove(index)} className="btn-hospital-images">Remove</button>
                                        </div>
                                    </div>
                                    ))}
                                    </>
                                    }
                              
                                </div>
                                )}
                            </ImageUploading>
                            
                            <button  
                                className={this.state.imageSaveBtnStatus ? "imageSaveBtnEnable": "imageSaveBtnDisable"}
                                disabled={!this.state.imageSaveBtnStatus} onClick={this.onSaveImages}>  
                                Save Images 
                            </button>
                        </div>
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
					Hospital information has been updated successfully
					</p>
					<p className="overLayDesSuccess" >Go to your dashboard..</p>
					<p className="overLayDesSuccess">
						<a href="/dashboard">Dashboard</a>
					</p>
				</Modal> : null
                }
                {this.state.hospitalUpdateImages ? 
				<Modal
					open={this.state.hospitalUpdateImages}
					onClose={this.onCloseModalImages}
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
					Hospital images has been updated successfully
					</p>
					<p className="overLayDesSuccess" >Go to your dashboard..</p>
					<p className="overLayDesSuccess">
						<a href="/dashboard">Dashboard</a>
					</p>
				</Modal> : null
                }
                 {this.state.inoutShowLog ? 
				<Modal
					open={this.state.inoutShowLog}
					onClose={this.onCloseModalLog}
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
				    Doctor in/out log
				</p>
            {this.state.inoutlog.length === 0 ?
                <>
                    <div className="noLogSvgDiv">
                        <img src={NoLogSvg} alt="noLogSvg" className="noLogSvg"></img>
                        <p className="svgLabelLog">No Log Found</p>
                    </div>
                </>
                :
                <>
                <div className="showLogMainHeading">
                        <div className="inTime">
  
                            <p className="logTimeHeading">
                                <i className="fas fa-sign-in-alt fa-sign-in-alt-log"></i>In</p>
                        </div>
                        |
                        <div className="outTime">
                            <p className="logTimeHeading">
                                <i class="fas fa-sign-out-alt fa-sign-out-alt-log"></i>Out</p>
                        </div>
                </div>
				{this.state.inoutlog.map((log,index) => {
                  
                    return <>
                        <div className="showLogMain">
                            <div className="inTime">
                                <p className="logTime">{log.in}</p>
                            </div>
                            |
                            <div className="outTime">
                                <p className="logTime">{log.out}</p>
                            </div>
                        </div>
                        </>
                })}
                </>
            }   
				</Modal> : null
                }
                </div>
            </div>
        )
    }
}
