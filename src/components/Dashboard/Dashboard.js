import React, { Component } from 'react'
import { Redirect } from 'react-router'
import NavbarDashboard from "../Navbar/NavbarDashboard";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent,SubMenu  } from 'react-pro-sidebar';
// import { slide as Menu } from 'react-burger-menu'
import { FaUserCircle , FaTasks , FaHistory, FaAdversal} from "react-icons/fa";
import { MdHelp,MdFeedback,MdRateReview} from "react-icons/md";
import { AiOutlineDashboard} from  "react-icons/ai";
import { HiOutlineLogout} from  "react-icons/hi";
import {RiVirusFill} from "react-icons/ri";
import Myprofile from '../SidebarMenu/Myprofile/Myprofile' 
import MyHospital from '../SidebarMenu/Myprofile/Myhospital'
import Covidcare from '../SidebarMenu/Myprofile/Covidcare'
import Mystaff from '../../components/SidebarMenu/Myprofile/Mystaff'
import Myappointment  from '../SidebarMenu/Myappointments/Myappointment';
import Covidappointment  from '../SidebarMenu/Covidappointments/Covidappointments';
import History  from '../SidebarMenu/History/History';
import Reviews from '../SidebarMenu/Reviews/Reviews';
import Feedback from '../SidebarMenu/Feedback/Feedback';
import Helpandsupport from '../SidebarMenu/Helpandsupport/Helpandsupport';
import Advertising from '../SidebarMenu/Advertising/Advertising';

// import Adh  from '../SidebarMenu/Adh/Adh';

import DashboardHome from './DashboardHome';

import 'react-pro-sidebar/dist/css/styles.css';
import './Dashboard.css'
import Adh from '../SidebarMenu/Adh/Adh';

export default class Dashboard extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        this.state = {
            loggedIn,
            toggleChecked: false,
            menuCollapsed: false,
            activeMenu: 'null',
        }
        this.logoutFunction = this.logoutFunction.bind(this);
        this.handleChangeToggle = this.handleChangeToggle.bind(this);
        this.onClickMenu = this.onClickMenu.bind(this);
        // this.renderSwitch = this.renderSwitch.bind(this);
    }
    logoutFunction(){
        localStorage.removeItem("token")
        this.setState({
            loggedIn : !this.state.loggedIn
        })
    }
    handleChangeToggle(checked) {
        this.setState({ toggleChecked: checked });
        // console.log(this.state.toggleChecked)
      }
      updateDimensions = () => {
          if(window.innerWidth<1100){
            this.setState({ menuCollapsed : true });
          }
          else{
            this.setState({ menuCollapsed : false });
          }
        
      };
      onClickMenu(clickedMenu){
        this.setState({ activeMenu : clickedMenu });
      }
      componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
      }
     
   
    render() {
        if(this.state.loggedIn === false){
            return <Redirect to = "/login"/>
        }
        const activeMenuComponent = () => {
            switch(this.state.activeMenu) {
      
              case "profile":   return <Myprofile/>;
              case "hospital":   return <MyHospital/>;
              case "covidcare": return <Covidcare/>;
              case "staff": return <Mystaff/>;
              case "appointments":  return <Myappointment/>;
              case "covidappointments":  return <Covidappointment/>;
              case "history":   return <History/>;
              case "reviews": return <Reviews/>;
              case "feedback": return <Feedback/>;
              case "help":  return <Helpandsupport/>;
              case "ads":  return <Advertising/>;
              case "adh":  return <Adh/>;
      
              default:  return <DashboardHome/>
            }
          }
        return (
            <>
            <NavbarDashboard/>
            <div className="sidebarDiv">
                <div className="prosidebarcollapsedNot">
                <ProSidebar className = "dashboardSidebar" width="270px" >
                    <SidebarHeader>
                        <Menu iconShape="circle">
                            <MenuItem className={this.state.activeMenu === 'dashhome'? "active" :"null"} onClick={() => this.onClickMenu('dashhome')} icon={<AiOutlineDashboard />}>My DashBoard</MenuItem>
                        </Menu>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="circle">
                            {/* <SubMenu title="Components"> */}
                            {/* <MenuItem  >My Profile */}
                                <SubMenu title="My Profile" icon={<FaUserCircle />}>
                                    <MenuItem className={this.state.activeMenu === 'profile'? "active" :"null"} onClick={() => this.onClickMenu('profile')}>
                                        <i className="far fa-user-circle submenuIcon leftShifticon"></i>
                                        Doctor's profile</MenuItem>
                                    <MenuItem className={this.state.activeMenu === 'hospital'? "active" :"null"} onClick={() => this.onClickMenu('hospital')}>
                                        <i className="far fa-hospital submenuIcon">
                                            </i>My Hospital</MenuItem>
                                    <MenuItem className={this.state.activeMenu === 'covidcare'? "active" :"null"} onClick={() => this.onClickMenu('covidcare')}>
                                        <i className="fas fa-virus submenuIcon"></i>
                                        Covid Care</MenuItem>
                                    <MenuItem className={this.state.activeMenu === 'staff'? "active" :"null"} onClick={() => this.onClickMenu('staff')}>
                                    <i className="fas fa-users submenuIcon"></i> 
                                        My Staff</MenuItem>
                                </SubMenu>
                            {/* </MenuItem> */}

                            <MenuItem icon={<FaTasks/>} className={this.state.activeMenu === 'appointments'? "active" :"null"} onClick={() => this.onClickMenu('appointments')} >My Appointments</MenuItem>
                            <MenuItem icon={<RiVirusFill/>} className={this.state.activeMenu === 'covidappointments'? "active" :"null"} onClick={() => this.onClickMenu('covidappointments')} >Covid Appointments</MenuItem>
                            <MenuItem icon={<FaHistory/>} className={this.state.activeMenu === 'history'? "active" :"null"} onClick={() => this.onClickMenu('history')}>Appointments History</MenuItem>
                            <MenuItem icon={<MdRateReview/>} className={this.state.activeMenu === 'reviews'? "active" :"null"} onClick={() => this.onClickMenu('reviews')}>Reviews</MenuItem>
                            <MenuItem icon={<MdFeedback/>} className={this.state.activeMenu === 'feedback'? "active" :"null"} onClick={() => this.onClickMenu('feedback')} >Feedback/Suggestions</MenuItem>
                            <MenuItem icon={<MdHelp/>} className={this.state.activeMenu === 'help'? "active" :"null"} onClick={() => this.onClickMenu('help')}>Help and Support</MenuItem>
                            <MenuItem  icon={<FaAdversal/>} className={this.state.activeMenu === 'ads'? "active" :"null"} onClick={() => this.onClickMenu('ads')}>Advertising</MenuItem>
                            
                            <MenuItem  icon={<FaAdversal/>} className={this.state.activeMenu === 'adh'? "active" :"null"} onClick={() => this.onClickMenu('adh')}>Advertisement History</MenuItem>
                            
                            {/* </SubMenu> */}
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="circle">
                            <MenuItem icon={<HiOutlineLogout/>} onClick={this.logoutFunction}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
                </div>
                <div className="prosidebarcollapsedSmall">
                <ProSidebar collapsed = {true} className = "dashboardSidebar" width="270px" >
                    <SidebarHeader>
                        <Menu iconShape="circle">
                            <MenuItem className={this.state.activeMenu === 'dashhome'? "active" :"null"} onClick={() => this.onClickMenu('dashhome')} icon={<AiOutlineDashboard />}>My DashBoard</MenuItem>
                        </Menu>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="circle">
                            {/* <SubMenu title="Components"> */}
                            {/* <MenuItem  >My Profile */}
                                <SubMenu title="My Profile" icon={<FaUserCircle />}>
                                    <MenuItem className={this.state.activeMenu === 'profile'? "active" :"null"} onClick={() => this.onClickMenu('profile')}>
                                        <i className="far fa-user-circle submenuIcon leftShifticon"></i>
                                        My Doctor Profile</MenuItem>
                                    <MenuItem className={this.state.activeMenu === 'hospital'? "active" :"null"} onClick={() => this.onClickMenu('hospital')}>
                                        <i className="far fa-hospital submenuIcon">
                                            </i>My Hospital</MenuItem>
                                    <MenuItem className={this.state.activeMenu === 'covidcare'? "active" :"null"} onClick={() => this.onClickMenu('covidcare')}>
                                        <i className="fas fa-virus submenuIcon"></i>
                                        Covid Care</MenuItem>
                                    <MenuItem className={this.state.activeMenu === 'staff'? "active" :"null"} onClick={() => this.onClickMenu('staff')}>
                                    <i className="fas fa-users submenuIcon"></i> 
                                        My Staff</MenuItem>
                                </SubMenu>
                            {/* </MenuItem> */}

                            <MenuItem icon={<FaTasks/>} className={this.state.activeMenu === 'appointments'? "active" :"null"} onClick={() => this.onClickMenu('appointments')} >My Appointments</MenuItem>
                            <MenuItem icon={<RiVirusFill/>} className={this.state.activeMenu === 'covidappointments'? "active" :"null"} onClick={() => this.onClickMenu('covidappointments')} >Covid Appointments</MenuItem>
                            <MenuItem icon={<FaHistory/>} className={this.state.activeMenu === 'history'? "active" :"null"} onClick={() => this.onClickMenu('history')}>Appointments History</MenuItem>
                            <MenuItem icon={<MdRateReview/>} className={this.state.activeMenu === 'reviews'? "active" :"null"} onClick={() => this.onClickMenu('reviews')}>Reviews</MenuItem>
                            <MenuItem icon={<MdFeedback/>} className={this.state.activeMenu === 'feedback'? "active" :"null"} onClick={() => this.onClickMenu('feedback')} >Feedback/Suggestions</MenuItem>
                            <MenuItem icon={<MdHelp/>} className={this.state.activeMenu === 'help'? "active" :"null"} onClick={() => this.onClickMenu('help')}>Help and Support</MenuItem>
                            <MenuItem  icon={<FaAdversal/>} className={this.state.activeMenu === 'ads'? "active" :"null"} onClick={() => this.onClickMenu('ads')}>Advertising</MenuItem>
                            <MenuItem  icon={<FaAdversal/>} className={this.state.activeMenu === 'adh'? "active" :"null"} onClick={() => this.onClickMenu('adh')}>Advertisement History</MenuItem>
                            {/* </SubMenu> */}
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="circle">
                            <MenuItem icon={<HiOutlineLogout/>} onClick={this.logoutFunction}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
                </div>

            </div>
            {activeMenuComponent()}
            </>
        )
    }
}
