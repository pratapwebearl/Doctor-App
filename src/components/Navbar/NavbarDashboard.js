import React from 'react';
// import {Redirect} from 'react-router-dom'
import styled from "styled-components";
// import { useSpring, animated, config } from "react-spring";
import { animated } from "react-spring";
import './Navbar.css'
import Brand from "./Brand";
import { Redirect } from 'react-router-dom'
import Switch from "react-switch";
import ReactTooltip from "react-tooltip";
// import Dashboard from '../Dashboard/Dashboard';
// import BurgerMenu from "./BurgerMenu";
// import CollapseMenu from "./CollapseMenu";

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token")
    let loggedIn = true
    if (token == null) {
      loggedIn = false
    }
    this.state = {
      userName: 'Nikunj Delavadiya',
      loggedIn,
      toggleChecked: false,
      navbarProfileClicked: false
    };
    // bindind method 
    this.logoutFunction = this.logoutFunction.bind(this);
    this.handleChangeToggle = this.handleChangeToggle.bind(this);
    // this.navbarProfilebtn = this.navbarProfilebtn.bind(this);
  }
  logoutFunction() {
    localStorage.removeItem("token")
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  }
  handleChangeToggle(checked) {
    this.setState({ toggleChecked: checked });
    // console.log(this.state.toggleChecked)
  }
  navbarProfilebtn(){
    this.setState({ navbarProfileClicked: true });
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
    if (this.state.loggedIn === false) {
      return <Redirect to="/login" />
    }
    // if (this.state.navbarProfileClicked === true) {
    //   return <Link to = "/dashboard"/>
    // }
    return (
      <>
        <NavBar className="barAnimation">
          <FlexContainer>
            <BrandName href="/home"><Brand /></BrandName>
            <NavLinks className="linkAnimation">
              {/* <a href="/login">Login</a>
              <a href="/sign-up">Sign Up</a> */}
              {/* <div className="heart-rate">
                <svg version="1.0" x="0px" y="0px" width="130px" height="30px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" >
                  <polyline fill="none" stroke="#2B7A79" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                  />
                </svg>
                <div className="fade-in"></div>
                <div className="fade-out"></div>
              </div> */}
              <div className="hideSmall"><p className="togglebtn">{this.state.toggleChecked ? "Doctor in" : "Doctor out"}<Switch className="toggle" onColor="#2B7A79" onChange={this.handleChangeToggle}
                checked={this.state.toggleChecked} /></p></div>
              
              <span data-tip data-for='NavNotification' data-event='click focus' ><i className="far fa-bell"></i></span>

              {/* <div className="small-size-row-second-review">
                 <div className="viewBtnReview"><button className="button-grey-review" onClick={() => this.onclickViewBtn(index)}>View</button></div>
              </div> */}

              <ReactTooltip style={{marginTop: '0px', overflow: 'scroll' }} id='NavNotification' globalEventOff='click' clickable={true} place="bottom" effect="solid" type="info" multiline={true}
               backgroundColor='#2B7A79' arrowColor='#DEF2F1' border= {true} borderColor="#2B7A79" >
                  
                   {/* {this.state.reviews.map((appointment, index) => {
                                return <>
                                    <div className="card-main-review">
                              
                                          <div ><p className="r-name">Start Date : {appointment.ConsultingDate} </p></div><br />
                                          <div className=""><b><p className="r-name">Start Date : {appointment.ConsultingDate}</p></b></div><br />
                                          <div className=""><b><p className="r-name">Price : 1000 </p></b></div>
                                          {/* <div className=""><p className="r-name">Start Date : {appointment.Name}</p></div>
                                          <div className="">End Date : <p className="">{appointment.ConsultingDate}</p></div>
                                          <div className="">Price : <p className="">{appointment.Disease}</p></div> */}
                                          
                                        
                                    {/* </div></> */}
                    {/* })} */}

                    <div style={{padding: '10px'}} className="card-main-review">
                      <div>
                        <div  style = {{float:'left'}} >Appointment Request</div><div style = {{float:'right'}}>2.37</div>
                        <br />
                        <div  style = {{marginTop:'20px'}}>28-06-21</div>
                        <div>Name : Wilson Radhadaia Age : 20 </div>
                      </div>                       
                    </div>
                    
                    <div style={{padding: '10px'}} className="card-main-review">
                      <div>
                        <div  style = {{float:'left'}} >Review Received</div><div style = {{float:'right'}}>2.37</div>
                        <br />
                        <div  style = {{marginTop:'20px'}}>28-06-21</div>
                        <div>Name : Wilson Radhadaia Age : 20 </div>
                      </div>                       
                    </div> 

                    <div style={{padding: '10px'}} className="card-main-review">
                      <div>
                        <div  style = {{float:'left'}} >Appointment Cancelation</div><div style = {{float:'right', marginTop: '0px'}}>2.37</div>
                        <br />
                        <div  style = {{marginTop:'20px'}}>28-06-21</div>
                        <div>Name : Wilson Radhadaia Age : 20 </div>
                      </div>                       
                    </div>

                    {/* <div style={{padding: '10px'}} className="card-main-review">
                      <div>
                        <div  style = {{float:'left'}} >Appointment Request</div><div style = {{float:'right'}}>2.37</div>
                        <br />
                        <div  style = {{marginTop:'20px'}}>28-06-21</div>
                        <div>Name : Wilson Radhadaia Age : 20 </div>
                      </div>                       
                    </div>         */}

                    <div style={{alignItems: 'center'}} className="small-size-row-second-review">
                        <div className="viewBtnReview"><button className="button-grey-review">View</button></div>
                    </div>         
                
              </ReactTooltip>

              <p data-tip data-for='NavProfile' data-event='click focus' className="navProfile"><i className="fas fa-user-md">
              </i><abbr className="hideSmall">{this.state.userName}</abbr><i className="fas fa-caret-down fa-caret-down-name"></i></p>
              <ReactTooltip id='NavProfile' globalEventOff='click' clickable={true} place="bottom" effect="solid" type="info" multiline={true} textColor="#FEFFFF"
               backgroundColor='#2B7A79' arrowColor='#DEF2F1' border= {true} borderColor="#2B7A79" className="NavProfileHeader" >
                <ul className="NavProfileHeader">
                  {/* <li onClick={this.navbarProfilebtn} className="NavProfileDropdown">My Profile<i className="far fa-user-circle"></i></li> */}
                  {/* <li className="NavProfileDropdown" ><i className="fas fa-tachometer-alt fa-tachometer-alt-nav"></i><a className="navDashboardLink" href="/dashboard">Your Dashboard</a></li> */}
                  <li className="toggleViewSmall">{this.state.toggleChecked ? "Doctor in" : "Doctor out"}<Switch offColor="#888" onColor="#3AAFA9" className="toggleViewSmall"  onChange={this.handleChangeToggle}
                checked={this.state.toggleChecked} /></li>
                  {/* <li onClick={this.logoutFunction} className="NavProfileDropdown"><i className="fas fa-sign-out-alt fa-sign-out-nav"></i>Logout </li> */}
                </ul>
                
              </ReactTooltip>
              {/* <span onClick={this.logoutFunction}>
                  Logout  
                  <i className="fas fa-sign-out-alt"></i>
              </span> */}
            </NavLinks>

          </FlexContainer>
        </NavBar>
        
      </>

    );
  }
};

export default Navbar;

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #3aafa9;
  z-index: 1;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 1rem 0 5rem;
  justify-content: space-between;
  height: 5rem;
  @media (max-width: 550px) {
    padding: 0 1rem;
  }
  @media (max-width: 419px) {
    padding: 0 .3rem;
  }
  @media (max-width: 381px) {
    padding: 0 .1rem;
  }
`;
const BrandName = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: #FEFFFF;
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;
  
  & span {
    color: #FEFFFF;
    font-size:1.2rem;
    background-color : #3AAFA9;
    text-transform: uppercase;
    border: 2px solid #2B7A79;
    border-radius: 25px;
    font-weight: 550;
    padding : 8px 16px;
    // border-bottom: 1px solid transparent;
    // margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: #17252A;
      // border-bottom: 1px solid #fdcb6e;
      border: 2px solid #FEFFFF;
    }
    // @media (max-width: 970px) {
    //   display: none;
    // }
  }
  & p {
    display : inline;
    color: #FEFFFF;
    font-size:1.2rem;
    background-color : #3AAFA9;
    text-transform: uppercase;
    border: 2px solid #2B7A79;
    border-radius: 25px;
    font-weight: 550;
    padding : 8px 16px;
    // border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    // cursor: pointer;
    // @media (max-width: 970px) {
    //   display: none;
    // }
    @media (max-width: 550px) {
      margin: 0 .7rem;
    }
    @media (max-width: 419px) {
      margin: 0 .2rem;
    }
    @media (max-width: 381px) {
      margin: 0 .1rem;
    }
  }
`;

// const BurgerWrapper = styled.div`
//   margin: auto 0;
//   @media (min-width: 769px) {
//     display: none;
//   }
// `;