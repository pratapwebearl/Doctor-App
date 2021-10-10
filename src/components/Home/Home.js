import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import Button from '../../components/Button/Button';
import HomeSvg from '../../images/home2.svg'
import './Home.css'
import Navbar from "../Navbar/Navbar";
import NavbarDashboard from "../Navbar/NavbarDashboard";


export default class Home extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        this.state = {
            loggedIn,
            navbarOpen: false,
        }
       
    }
     handleNavbar = () => {
            this.setState({ navbarOpen: !this.state.navbarOpen });
          }
    render() {
        if(this.state.loggedIn){
			return <Redirect to="/dashboard"/>
		}
        return (
            <>
            {this.state.loggedIn ? <>
            <NavbarDashboard/>
            </> : <>
            <Navbar 
					navbarState={this.state.navbarOpen} 
					handleNavbar={this.handleNavbar}
				/>
            </>}
            <section className="sectionHome">
                <div className="row">
                    <div className="column left">
                        <div className="title">
                            <span className="line-2">Let us build a healthy world </span>
                            <span className="line-1">with our online <span className="bold">Doctor’s <span className="spanApp">app</span></span></span>
                            {/* <span className="line-2"></span> */}
                        </div>
                        <br></br>
                        <div className="description">
                            <span className="line-1">A place where healthcare professionals</span>
                            <span className="line-2">reside for your immediate care.</span>
                        </div>
                        <br></br>
                        {this.state.loggedIn ? 
                        <>
                        <a href="/dashboard" className="SignUpandDashboardBtn">
                        <Button text="Dashboard"/>
                        </a>
                        </> :
                        <a href="/sign-up" className="SignUpandDashboardBtn">
                        <Button text="Register Now"/>
                        </a>
                         }
                    </div>
                    <div className="column right">
                        <div className="homeRightsvgDiv">
                            <img className="homeRightsvg" src={HomeSvg} alt="homeSvg"></img>
                        </div>
                        
                    </div>
                </div>
            </section>
            </>
        )
    }
}
