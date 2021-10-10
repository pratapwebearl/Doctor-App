import React, { Component } from 'react'
// import Navbar from "./components/Navbar/Navbar";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token")
    let loggedIn = true
    if(token == null){
      loggedIn = false
    }
    this.state = {
      navbarOpen: false,
			loggedIn,
		};

    // bindind method 
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    return (
      <>
        {/* <Navbar 
          navbarState={this.state.navbarOpen} 
          handleNavbar={this.handleNavbar}
        /> */}
      
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/home" />
        </Switch>
      </BrowserRouter>
      </>
    )
  }
}

export default App