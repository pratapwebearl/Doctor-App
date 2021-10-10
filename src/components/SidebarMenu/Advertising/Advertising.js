import React, { Component } from 'react'
import ImageUploading from "react-images-uploading";
import { FormFeedback } from 'reactstrap';
import { Modal } from 'react-responsive-modal';
// import { DateRangePicker } from 'react-date-range';
// import { addDays } from 'date-fns';
// import 'react-date-range/dist/styles.css'; 
// import 'react-date-range/dist/theme/default.css'; 
import uploadImagesSvg from '../../../images/uploadImagesSvg.svg';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import './Advertising.css'


export default class Advertising extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            images:[],
            oldimages:[],
            imageSaveBtnStatus:false,
            hospitalUpdateImages : false,
            // billenable:false,
            startingDate:'',
            endingdDate:'',
            priceperDay:'100',
            dates: null,
            totalSelectedDays:'0',
            totalPayableAmount:'0',
            paymentSuccessMsg:false,
            errors: {},
		};
        //binding method
  
        this.onChangeImages = this.onChangeImages.bind(this);
        // this.onSaveImages = this.onSaveImages.bind(this);
        this.changeDate = this.changeDate.bind(this)
        this.onclickPaymentBtn = this.onclickPaymentBtn.bind(this);
    }
    onChangeImages(imageList, addUpdateIndex){
        // data for submit
        // console.log(imageList);
        this.setState({
            images : imageList,
            errors: {
                ...this.state.errors,
                noImage: ''
            }
        },function(){
            // console.log(this.state.images)
            // console.log(this.state.oldimages)
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
    
    changeDate(dates){
           
            this.setState({
                dates:dates,
                startingDate:dates[0],
                endingdDate:dates[1],
                errors: {
                    ...this.state.errors,
                    noSelectedDate: ''
                }
            },function(){
                console.log(this.state.dates)
                // To calculate the time difference of two dates
                var time_difference = dates[1].getTime() - dates[0].getTime();  
                //calculate days difference by dividing total milliseconds in a day  
                var days_difference = Math.round(time_difference / (1000 * 60 * 60 * 24)); 
                var total_amount = 100 * days_difference; 
                this.setState({
                    totalSelectedDays: days_difference,
                    totalPayableAmount: total_amount
                })
            })
        }
    // onSaveImages(){
    //     this.onOpenModalImages();
    // }
    // onOpenModalImages = () => {
	// 	this.setState({   hospitalUpdateImages : true });
	// };
	// onCloseModalImages = () => {
    //     this.setState({
    //         // data: {
    //         //     hospitalName: '',
    //         //     addressHospital:'',
    //         // },
    //         // oldData:{                 
    //         //     hospitalName: '',
    //         //     addressHospital:'',
    //         // },
    //         hospitalUpdateImages : false,
    //         imageSaveBtnStatus:false,
    //         })
	// };
    onOpenModal = () => {
		this.setState({ paymentSuccessMsg: true });
	};
    onCloseModal = () => {
        this.setState({
            // images:[],
            // oldimages:[],
            // imageSaveBtnStatus:false,
            // hospitalUpdateImages : false,
            // billenable:false,
            // startingDate:'',
            // endingdDate:'',
            // priceperDay:'100',
            // dates: null,
            // totalSelectedDays:'0',
            // totalPayableAmount:'0',
            paymentSuccessMsg:false,
            errors: {},
        })
    };
    validate = () => {
       console.log(this.state.startingDate);
        let errors = {};
        if (!this.state.startingDate) errors.noSelectedDate = 'Please select the starting and ending date.';
        if (this.state.images.length === 0) errors.noImage = 'Please select at least one images.';
        
        return errors;
    }
    onclickPaymentBtn(){
        const errors = this.validate();
        if (Object.keys(errors).length === 0) {
            console.log(this.state);
            this.onOpenModal();
          } else {
              this.setState({ errors });
          }
    }
    componentDidMount() {
        //api call to update state info
        this.setState(
          {
            images:[],
            oldimages:[],
            startingDate:'',
            endingdDate:'',
            totalSelectedDays:'0',
            totalPayableAmount:'0',
          }, function () {
            console.log(this.state.data)
            // console.log(this.state.tempCategory)
        });
      
      }
    render() {
        // const selectionRange = {
        //     startDate: new Date(),
        //     endDate: new Date(),
        //     key: 'selection',
        //   }
        const {errors } = this.state;
        return (
            <div className="dashboardComponentViewAdvertising">
                 <div className="Advertising-container">
                    <div className="Advertising-title">
                            <p><i className="fas fa-ad fa-ad-advertisement"></i>My Advertisement</p>
                    </div>
                   
                        <div className="Advertisinginfo">
                            <div>
                            <p className="uploadMaxImageLine"> *Upload images (Max. 8)</p>
                            <FormFeedback className="errorMessagePayment">{errors.noImage}</FormFeedback>
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
                            
                            {/* <button  
                                className={this.state.imageSaveBtnStatus ? "imageSaveBtnEnable": "imageSaveBtnDisable"}
                                disabled={!this.state.imageSaveBtnStatus} onClick={this.onSaveImages}>  
                                Save Images 
                            </button> */}
                            </div>
                            <hr className="profileFielddivide"></hr>
                            <div>
                                <p className="profilelabelMain"><span className="profilelabelMainContent">Payment Information</span></p>
                                <label className="selectDateTitle">Select time period </label>
                                <DateRangePicker className="dateRangePicker"
                                    onChange={this.changeDate}
                                    value={this.state.dates}
                                    format="dd-MM-yyyy"
                                    rangeDivider="to"
                                />
                                 <FormFeedback className="errorMessagePayment">{errors.noSelectedDate}</FormFeedback>
                                <label className="selectDateTitle">Price per Day </label>
                                <input type="number" className="priceperdaybox" value={this.state.priceperDay}  name="priceperday" disabled></input>
                                <label className="selectDateTitle">Total selected days </label>
                                <input type="number" className="priceperdaybox" value={this.state.totalSelectedDays}  name="totalSelectedDays" disabled></input>
                                <label className="selectDateTitle">Total payable amount( in ₹) </label>
                                <input type="number" className="priceperdaybox" value={this.state.totalPayableAmount}  name="totalPayableAmount" disabled></input>
                                <button onClick={this.onclickPaymentBtn}
                                className="paymentBtnEnable">  
                                Pay Now
                                </button>
                            </div>
                            
                        </div>
                {this.state.paymentSuccessMsg ? 
				<Modal
					open={this.state.paymentSuccessMsg}
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
					Payment successfully
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
