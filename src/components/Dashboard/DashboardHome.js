import React, { Component } from 'react'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import DashboardHomeSvg from '../../images/DashboardHomeSvg.svg'
import './DashboardHome.css'

export default class Dashboardhome extends Component {
    constructor(props){
        super(props)
       
        this.state = {
            profilecompleted : false,
        }
    }
    componentDidMount() {
        //api call to check profile
        this.setState({ profilecompleted : false });

        if(!this.state.profilecompleted){
            store.addNotification({
                title: "Profile Updation",
                message: "Please complete your profile, Hospital details and covid care center information",
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                showIcon:'true',
                dismiss: {
                  duration: 10000,
                  onScreen: true,
                  showIcon : true,
                  click:false,
                }
              });
        }
        
      }
    render() {

        return (
            <>
            <div className="dashboardComponentView">
                <div className="dashhome-container">
                    <div className="dashboard-title">
                        <p><span><i className="fas fa-tachometer-alt"></i>Your Dashboard</span></p>
                    </div>
                    <div className="dashboardhomesvgDiv">
                        <img src={DashboardHomeSvg} className="dashboardhomesvg" alt="HomeSvg"></img>
                    </div>
                </div>
            </div>

              <ReactNotification />
              </>
        )
    }
}
