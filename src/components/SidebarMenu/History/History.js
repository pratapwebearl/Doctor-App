import React, { Component } from 'react'
import { Modal } from 'react-responsive-modal';
import NoDataSvg from '../../../images/DashboardHomeSvg.svg';
import StarRatings from 'react-star-ratings'
import './History.css'



export default class MyappointmentHistory extends Component {
  constructor(props) {
    // var today = new Date()
    // var date = '' + today.getDate() + '' +today.getMonth + '' +
    super(props);
    this.state = {
        appointmentHistory: [],
        viewModel:{
            Name: '',
            AppointmentType: '',
            AppointmentTime: '',
            Disease: '',
            Status: '',
            Description:'',
            ConsultingDate:'',
            ConsultingTime:'',
            Gender:'',
            Age:'',
            ReviewStar:'',
            ReviewMsg:'',
        },
        modelViewStatus:false,
        smallSize:false,
    }
    this.onclickViewBtn = this.onclickViewBtn.bind(this);
  }

  onclickViewBtn(id){
    let temporaryarray = this.state.appointmentHistory.slice();
    this.setState({
      viewModel:{
        Name: temporaryarray[id]['Name'],
        Gender:temporaryarray[id]['Gender'],
        Age:temporaryarray[id]['Age'],
        AppointmentType: temporaryarray[id]['AppointmentType'],
        AppointmentTime: temporaryarray[id]['AppointmentTime'],
        Disease: temporaryarray[id]['Disease'],
        Status: temporaryarray[id]['Status'],
        ConsultingDate:temporaryarray[id]['ConsultingDate'],
        ConsultingTime:temporaryarray[id]['ConsultingTime'],
        Description:temporaryarray[id]['Description'],
        ReviewStar:temporaryarray[id]['ReviewStar'],
        ReviewMsg:temporaryarray[id]['ReviewMsg'],
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

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    //api call to update state info
    this.setState(
      {
        appointmentHistory: [
          { Name: 'Nikunj Delavadiya',AppointmentType: 'Covid',AppointmentTime: '10:00',Disease: 'Insomnia',Status: 'Accepted',Description:'none',ConsultingDate:'20-07-2021',ConsultingTime:'15:00', Gender:'Male',Age:'21',ReviewStar:4,ReviewMsg:'this online appointment booking service is very good and time saving process'},
          { Name: 'Navdeep Dadhania',AppointmentType: 'Covid',AppointmentTime: '11:00',Disease: 'Diarrhea',Status: 'Rejected',Description:'none',ConsultingDate:'21-07-2021',ConsultingTime:'15:00',Gender:'Male',Age:'21',ReviewStar:5,ReviewMsg:'this online appointment booking service is very good and time saving process'},
          { Name: 'Nihal Shaikh',AppointmentType: 'Covid',AppointmentTime: '12:00',Disease: 'Dengue',Status: 'Accepted',Description:'none',ConsultingDate:'22-07-2021',ConsultingTime:'15:00',Gender:'Male',Age:'21',ReviewStar:4,ReviewMsg:'this online appointment booking service is very good and time saving process'},
          { Name: 'Dharmesh Rathod',AppointmentType: 'Covid',AppointmentTime: '13:00',Disease: 'Malaria',Status: 'Accepted',Description:'none',ConsultingDate:'23-07-2021',ConsultingTime:'15:00',Gender:'Male',Age:'21',ReviewStar:4,ReviewMsg:'this online appointment booking service is very good and time saving process'},
          { Name: 'Aliabbas Attarwala',AppointmentType: 'Covid',AppointmentTime: '14:00',Disease: 'Diabetes',Status: 'Accepted',Description:'none',ConsultingDate:'24-07-2021',ConsultingTime:'15:00',Gender:'Male',Age:'21',ReviewStar:5,ReviewMsg:'this online appointment booking service is very good and time saving process'}
        ]
      })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  updateDimensions = () => {
    if(window.innerWidth<436){
      this.setState({ smallSize : true });
    }
    else{
      this.setState({ smallSize : false });
    }
  
};
  render() {
    return (
      <div className="appointmentHistoryComponentViewProfile">
        <div className="appointmentHistory-container">
          <div className="appointmentHistory-title">
            <p><i class="fas fa-history fa-history-appointment"></i>History</p>
          </div>
          {this.state.appointmentHistory.length === 0 ? 
          <>
          <div className="noHistorySvgDiv">
            <img src={NoDataSvg} alt="noDataSvg" className="noHistorySvg"></img>
            <p className="svgLabel">No History Found</p>
          </div>
          </>
          :
          <>
            <div className="appointmentHistoryinfo">
          <p className="profilelabelMain"><span className="profilelabelMainContent">Appointments History</span></p>
            {this.state.appointmentHistory.map((appointment, index) => {
              return <>
                <div className="card-main">
                  <div className="small-size-row-first-history">
                    <div className="h-name-div"><p className="h-name">{appointment.Name}</p></div>
                    <div className="h-appointment-type-div">Type: <p className="h-appointment-type">{appointment.AppointmentType}</p></div>
                    {/* <div className="h-appointment-time-div">Time: <p className="h-appointment-time">{appointment.AppointmentTime}</p></div> */}
                    <div className="h-appointment-date-div">Date: <p className="h-appointment-date">{appointment.ConsultingDate}</p></div>
                    <div className="h-disease-div">Disease: <p className="h-disease">{appointment.Disease}</p></div>
                    <div className="h-status-accepted-div">
                      Status: <p className={appointment.Status ==="Accepted" ? "h-status-accepted" : "h-status-rejected" }>{appointment.Status}</p>
                    </div>
                    <div className="h-star-div">
                        {/* {console.log(this.state.smallSize)} */}
                        {/* {!this.state.smallSize ?  */}
                            <div className="starRatingDivHistory">
                            <StarRatings
                                //  ignoreInlineStyles={true}
                                rating={appointment.ReviewStar}
                                name = "rating"
                                className= "star"
                                numberOfStars={5}
                                starRatedColor='#2B7A79'
                                starEmptyColor='#BEBEBE'
                                starHoverColor='#2B7A79'
                                starDimension="30px"
                                starSpacing="2px"
                                isSelectable={false}
                            />
                            </div>
                            
                        
                            {/* : */}
                            <div className="starRatingDivSmallHistory">
                            <StarRatings
                                rating={appointment.ReviewStar}
                                name = "rating"
                                className= "star"
                                numberOfStars={5}
                                starRatedColor='#2B7A79'
                                starEmptyColor='#BEBEBE'
                                starHoverColor='#2B7A79'
                                starDimension="25px"
                                starSpacing="0"
                                isSelectable={false}
                            />
                            </div>

                            
                        {/* } */}
                    </div>
                    {/* <div className="h-reviewmsg-div">Review:<p className="h-reviewmsg">{appointment.ReviewMsg}</p></div> */}
                  </div>
                  <div className="small-size-row-second-history">
                    <div className="viewBtnHistory"><button className="button-grey-history" onClick={()=> this.onclickViewBtn(index)}>View</button></div>
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
			    <div className="card-main-model-history">
                <div className="small-size-row-first-history-model">
                    <div className="h-div-model"><p className="h-name-model">{this.state.viewModel.Name}</p></div>
                    <div className="h-div-model">Age: <p className="h-age">{this.state.viewModel.Age}</p></div>
                    <div className="h-div-model">Gender: <p className="h-gender">{this.state.viewModel.Gender}</p></div>
                    <div className="h-div-model">Appointment Type: <p className="h-appointment-type">{this.state.viewModel.AppointmentType}</p></div>
                    <div className="h-div-model">Appointment Time: <p className="h-appointment-time">{this.state.viewModel.AppointmentTime}</p></div>
                    <div className="h-div-model">Disease: <p className="h-disease">{this.state.viewModel.Disease}</p></div>
                    <div className="h-div-model">Description: <p className="h-description">{this.state.viewModel.Description}</p></div>
                    <div className="h-div-model">
                      Status: <p className={this.state.viewModel.Status ==="Accepted" ? "h-status-accepted" : "h-status-rejected" }>{this.state.viewModel.Status}</p>
                    </div>
                    <div className="h-div-model">Counsulting Date: <p className="h-counsulting-date">{this.state.viewModel.ConsultingDate}</p></div>
                    <div className="h-div-model">Counsulting Time: <p className="h-counsulting-time">{this.state.viewModel.ConsultingTime}</p></div>

                    <div className="h-div-model">
                        {/* {console.log(this.state.smallSize)} */}
              
                            <StarRatings
                                //  ignoreInlineStyles={true}
                                rating={this.state.viewModel.ReviewStar}
                                name = "rating"
                                className= "star"
                                numberOfStars={5}
                                starRatedColor='#2B7A79'
                                starEmptyColor='#BEBEBE'
                                starHoverColor='#2B7A79'
                                starDimension="30px"
                                starSpacing="2px"
                                isSelectable={false}
                            />
                    </div>
                    <div className="h-div-model-review">Review: <p className="h-description">{this.state.viewModel.ReviewMsg}</p></div>
                  </div>
                  {/* <div className="small-size-row-second-history">
                    <div className="viewBtnHistory"><button className="button-grey-history" onClick={()=> this.onclickViewBtn(index)}>View</button></div>
                  </div> */}
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