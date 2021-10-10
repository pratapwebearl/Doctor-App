import React, { Component } from 'react'
// import StarRatings from 'react-star-ratings'
import NoDataSvg from '../../../images/DashboardHomeSvg.svg';


// import uploadImagesSvg from '../../../images/uploadImagesSvg.svg';
// import { Modal } from 'react-responsive-modal';
import './Adh.css'

export default class Adh extends Component {
  constructor(props) {
    super(props);
    this.state = {
        reviews: [],
        
    }
    this.onclickViewBtn = this.onclickViewBtn.bind(this);
}

onclickViewBtn(id) {
    let temporaryarray = this.state.reviews.slice();
    this.setState({
        
    }, function () {
        console.log(this.state.viewModel)
        this.onOpenModal();
    })
}


componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    //api call to update state info
    this.setState(
        {
            reviews: [
                { Name: 'Nikunj Delavadiya', Disease: 'Insomnia', Description: 'none', ConsultingDate: '20-07-2021', ConsultingTime: '15:00', Gender: 'Male', Age: '21', ReviewStar: 4, ReviewMsg: 'this online appointment booking service is very good and time saving process' },
                { Name: 'Navdeep Dadhania', Disease: 'Diarrhea', Description: 'none', ConsultingDate: '21-07-2021', ConsultingTime: '15:00', Gender: 'Male', Age: '21', ReviewStar: 5, ReviewMsg: 'this online appointment booking service is very good and time saving process' },
                { Name: 'Nihal Shaikh', Disease: 'Dengue', Description: 'none', ConsultingDate: '22-07-2021', ConsultingTime: '15:00', Gender: 'Male', Age: '21', ReviewStar: 4, ReviewMsg: 'this online appointment booking service is very good and time saving process' },
                { Name: 'Dharmesh Rathod', Disease: 'Malaria', Description: 'none', ConsultingDate: '23-07-2021', ConsultingTime: '15:00', Gender: 'Male', Age: '21', ReviewStar: 4, ReviewMsg: 'this online appointment booking service is very good and time saving process' },
                { Name: 'Aliabbas Attarwala', Disease: 'Diabetes', Description: 'none', ConsultingDate: '24-07-2021', ConsultingTime: '15:00', Gender: 'Male', Age: '21', ReviewStar: 5, ReviewMsg: 'this online appointment booking service is very good and time saving process' }
            ]
        })
}

render() {
    return (
        <div className="reviewComponentViewProfile">
            <div className="review-container">
                <div className="review-title">
                    <p><i class="fas fa-edit fa-reviews"></i>Advertisement History</p>
                </div>
                {this.state.reviews.length === 0 ?
                    <>
                        <div className="noReviewSvgDiv">
                            <img src={NoDataSvg} alt="noDataSvg" className="noReviewSvg"></img>
                            <p className="svgLabel">No Reviews Found</p>
                        </div>
                    </>
                    :
                    <>
                        <div className="reviewinfo">
                            <p className="profilelabelMain"><span className="profilelabelMainContent">Advertisement History</span></p>
                            {this.state.reviews.map((appointment, index) => {
                                return <>
                                    <div className="card-main-review">
                                        <div className="small-size-row-first-review">
                                          <div className=""><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavTLKLGetnQlgh_VIe6ITCUTmaV7RCUzBXVC6GUXuDQ6NhQEIXRahmtPK6p0FvQnNhm0&usqp=CAU" alt="noImages" className="uploadImagesSvg"></img></div>
                                                                  
                                            {/* <div className="h-reviewmsg-div">Review:<p className="h-reviewmsg">{appointment.ReviewMsg}</p></div> */}
                                        </div>
                                        <div className="">

                                          <div className=""><p className="r-name">Start Date : {appointment.ConsultingDate} </p></div><br />
                                          <div className=""><b><p className="r-name">Start Date : {appointment.ConsultingDate}</p></b></div><br />
                                          <div className=""><b><p className="r-name">Price : 1000 </p></b></div>
                                          {/* <div className=""><p className="r-name">Start Date : {appointment.Name}</p></div>
                                          <div className="">End Date : <p className="">{appointment.ConsultingDate}</p></div>
                                          <div className="">Price : <p className="">{appointment.Disease}</p></div> */}
                                          
                                        </div>
                                    </div></>
                            })}

                        </div>
                        
                    </>
                }

            </div>
        </div>
    )
}
}