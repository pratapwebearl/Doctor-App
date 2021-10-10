import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'
import NoDataSvg from '../../../images/DashboardHomeSvg.svg';
import { Modal } from 'react-responsive-modal';
import './Reviews.css'

export default class Reviews extends Component {
    constructor(props) {
        // var today = new Date()
        // var date = '' + today.getDate() + '' +today.getMonth + '' +
        super(props);
        this.state = {
            reviews: [],
            viewModel: {
                Name: '',
                Disease: '',
                Description: '',
                ConsultingDate: '',
                ConsultingTime: '',
                Gender: '',
                Age: '',
                ReviewStar: '',
                ReviewMsg: '',
            },
            modelViewStatus: false,
            smallSize: false,
        }
        this.onclickViewBtn = this.onclickViewBtn.bind(this);
    }

    onclickViewBtn(id) {
        let temporaryarray = this.state.reviews.slice();
        this.setState({
            viewModel: {
                Name: temporaryarray[id]['Name'],
                Gender: temporaryarray[id]['Gender'],
                Age: temporaryarray[id]['Age'],
                Disease: temporaryarray[id]['Disease'],
                ConsultingDate: temporaryarray[id]['ConsultingDate'],
                ConsultingTime: temporaryarray[id]['ConsultingTime'],
                Description: temporaryarray[id]['Description'],
                ReviewStar: temporaryarray[id]['ReviewStar'],
                ReviewMsg: temporaryarray[id]['ReviewMsg'],
            },
        }, function () {
            console.log(this.state.viewModel)
            this.onOpenModal();
        })
    }
    onOpenModal = () => {
        this.setState({ modelViewStatus: true });
    };

    onCloseModal = () => {
        this.setState({
            modelViewStatus: false,
            viewModel: {},
        });
    };

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
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }
    updateDimensions = () => {
        if (window.innerWidth < 436) {
            this.setState({ smallSize: true });
        }
        else {
            this.setState({ smallSize: false });
        }
    };
    render() {
        return (
            <div className="reviewComponentViewProfile">
                <div className="review-container">
                    <div className="review-title">
                        <p><i class="fas fa-edit fa-reviews"></i>Reviews</p>
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
                                <p className="profilelabelMain"><span className="profilelabelMainContent">My Reviews</span></p>
                                {this.state.reviews.map((appointment, index) => {
                                    return <>
                                        <div className="card-main-review">
                                            <div className="small-size-row-first-review">
                                                <div className="r-name-div"><p className="r-name">{appointment.Name}</p></div>
                                                {/* <div className="h-appointment-time-div">Time: <p className="h-appointment-time">{appointment.AppointmentTime}</p></div> */}
                                                <div className="r-appointment-date-div">Date: <p className="r-appointment-date">{appointment.ConsultingDate}</p></div>
                                                <div className="r-disease-div">Disease: <p className="r-disease">{appointment.Disease}</p></div>
                                                <div className="r-star-div">
                                                    {/* {console.log(this.state.smallSize)} */}
                                                    {/* {!this.state.smallSize ? */}
                                                    <div className="starRatingDivReview">
                                                    <StarRatings
                                                            //  ignoreInlineStyles={true}
                                                            rating={appointment.ReviewStar}
                                                            name="rating"
                                                            className="star"
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
                                                    <div className="starRatingDivSmallReview">
                                                    <StarRatings
                                                            rating={appointment.ReviewStar}
                                                            name="rating"
                                                            className="star"
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
                                            <div className="small-size-row-second-review">
                                                <div className="viewBtnReview"><button className="button-grey-review" onClick={() => this.onclickViewBtn(index)}>View</button></div>
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
                                            <path d="M100 12.8692L81.7352 0L39.8782 36.076L13.1659 12.8692L0 25.0352L26.1035 49.0155L0 72.8231L13.1659 84.9508L41.8569 60.9001L79.9087 100L100 89.1702L81.7352 72.8231L54.1096 49.0155L100 12.8692Z" fill="black" />
                                        </svg>
                                    </>}
                                >
                                    <div className="card-main-model-review">
                                        <div className="small-size-row-first-review-model">
                                            <div className="r-div-model"><p className="r-name-model">{this.state.viewModel.Name}</p></div>
                                            <div className="r-div-model">Age: <p className="r-age">{this.state.viewModel.Age}</p></div>
                                            <div className="r-div-model">Gender: <p className="r-gender">{this.state.viewModel.Gender}</p></div>
                                            <div className="r-div-model">Disease: <p className="r-disease">{this.state.viewModel.Disease}</p></div>
                                            <div className="r-div-model">Description: <p className="r-description">{this.state.viewModel.Description}</p></div>
                                            <div className="r-div-model">Counsulting Date: <p className="r-counsulting-date">{this.state.viewModel.ConsultingDate}</p></div>
                                            <div className="r-div-model">Counsulting Time: <p className="r-counsulting-time">{this.state.viewModel.ConsultingTime}</p></div>

                                            <div className="r-div-model">
                                                {/* {console.log(this.state.smallSize)} */}

                                                <StarRatings
                                                    //  ignoreInlineStyles={true}
                                                    rating={this.state.viewModel.ReviewStar}
                                                    name="rating"
                                                    className="star"
                                                    numberOfStars={5}
                                                    starRatedColor='#2B7A79'
                                                    starEmptyColor='#BEBEBE'
                                                    starHoverColor='#2B7A79'
                                                    starDimension="30px"
                                                    starSpacing="2px"
                                                    isSelectable={false}
                                                />
                                            </div>
                                            <div className="r-div-model-review">Review: <p className="r-description">{this.state.viewModel.ReviewMsg}</p></div>
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