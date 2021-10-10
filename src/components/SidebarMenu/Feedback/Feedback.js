import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'
import { Modal } from 'react-responsive-modal';
import './Feedback.css'

export default class Feedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{
                rating:0,
                feedbackdata: ''
            },
            oldData:{
                rating:0,
                feedbackdata: ''           
            },
            statusFeedbackChange:false,
            statusRating:'',
            statusFeedbackSuccess:false,
            smallSize:false,
        }
        this.changeRating = this.changeRating.bind(this);
        this.onSendFeedback = this.onSendFeedback.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    updateDimensions = () => {
        if(window.innerWidth<550){
          this.setState({ smallSize : true });
        }
        else{
          this.setState({ smallSize : false });
        }
      
    };
    componentDidMount() {
        //api call to update state info
        window.addEventListener('resize', this.updateDimensions);
        this.setState(
          {
            data: {         
                rating:0,
                feedbackdata: ''           
            },
            oldData:{                 
                rating:0,
                feedbackdata: ''
            },
          }, function () {
            // console.log(this.state.data)
            // console.log(this.state.data)
        });
      
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
      }
      handleChange(e){
    
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
        },function(){
          
          if(this.state.data.feedbackdata !== this.state.oldData.feedbackdata){
            this.setState({
                statusFeedbackChange : true
            })
          }
          else{
            this.setState({
                statusFeedbackChange : false
            })
          }
        });
    }

    onSendFeedback(e) {
        // console.log("inside send")
        // console.log(this.state.data.rating)
        // console.log(this.state.data.rating=== 0)
        e.preventDefault();
        // if (this.state.data.rating=== 0) {
        //     this.setState({
        //         statusRating:'false'
        //     })
        // }
        // else{
        //     this.onOpenModal()
        // }
        this.onOpenModal()
    }
    onOpenModal = () => {
        this.setState({
            statusFeedbackSuccess:true
            
        })
	};
	
	onCloseModal = () => {
        this.setState ( {
            // data:{
            //     rating:0,
            //     feedbackdata: ''
            // },
            // oldData:{
            //     rating:0,
            //     feedbackdata: ''           
            // },
            statusFeedbackChange:false,
            statusRating:'',
            statusFeedbackSuccess:false,
            smallSize:false,
        })
    };
    // validate = () => {
    //     const {data} = this.state;
    //     let errors = {};
    //     if(data.rating==0) errors.rating = 'Please provide the rating.';
    // }
    
    changeRating( newRating, name ) {
        this.setState({
            data: {                  
                ...this.state.data,    
                rating: newRating	
              },
        },function(){
            if(this.state.data.rating !== this.state.oldData.rating){
                this.setState({
                    statusFeedbackChange : true
                })
              }
            else{
                this.setState({
                    statusFeedbackChange : false
                })
            }
            if(this.state.data.rating>0){
                this.setState({
                    statusRating:''
                })
            }
        });
      }

    render() {
        return (
            <div className="feedbackComponentViewProfile">
                <div className="feedback-container">
                    <div className="feedback-title">
                    <p><i class="fas fa-star-half-alt fa-star-half-alt-feedback"></i>Feedback</p>
                    </div>
                    <div className="feedbackinfo">
                        <p className="p-feedback">Tell us what you love about the app, or what we could be doing better.</p>
                        <textarea className="inputProfile textareawidth textareaFeedback"
                            rows={5} 
                            value={this.state.data.feedbackdata}
                            onChange={this.handleChange}
                            name="feedbackdata"
                            placeholder="give your feedback here ..."
                            />
                            <br></br>
                            <br></br>
                        <p className="p-feedback">Provide us your ratings.</p>
                        {/* {!this.state.smallSize ?  */}
                            <>
                            <div className="starRatingDiv">
                            <StarRatings
                                //  ignoreInlineStyles={true}
                                rating={this.state.data.rating}
                                name = "rating"
                                className= "star"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                starRatedColor='#2B7A79'
                                starEmptyColor='#BEBEBE'
                                starHoverColor='#2B7A79'
                                starDimension="50px"
            
                                // starSpacing="0"
                                // name='rating'
                            />
                            </div>

                            </>
                            {/* : */}
                            <>
                            <div className="starRatingDivSmall">
                                <StarRatings
                                    rating={this.state.data.rating}
                                    name = "rating"
                                    className= "star"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    starRatedColor='#2B7A79'
                                    starEmptyColor='#BEBEBE'
                                    starHoverColor='#2B7A79'
                                    starDimension="40px"
                                    starSpacing="0"
                                    // name='rating'
                                />
                            </div>
                          </>
                        {/* } */}
                        
                        {/* {this.state.statusRating ==='false'?
							<>
							<p className="loginError">Please enter rating</p>
							</> : null} */}
                        <br></br>
                        <button  
                        className={this.state.statusFeedbackChange ? "btnSendFeedbackEnable": "btnSendFeedbackDisable"} 
                        disabled={!this.state.statusFeedbackChange} 
                        onClick={this.onSendFeedback}>Send </button>
                    </div>
                </div>
                {this.state.statusFeedbackSuccess ? 
				<Modal
					open={this.state.statusFeedbackSuccess}
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
					Feedback has been sent successfully
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
