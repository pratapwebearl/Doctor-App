import React  from 'react';
// import {Redirect} from 'react-router-dom'
import styled from "styled-components";
// import { useSpring, animated, config } from "react-spring";
import { animated } from "react-spring";
import './Navbar.css'
import Brand from "./Brand";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";

class Navbar extends React.Component  {

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token")
    let loggedIn = true
    if(token == null){
      loggedIn = false
    }
    this.state = {
			loggedIn,
		};
    // bindind method 
  }

  render() {
    return (
      <>
      <NavBar className="barAnimation">
          <FlexContainer>
          <BrandName href="/home"><Brand /></BrandName> 
            <NavLinks className="linkAnimation">
              <a href="/login">Login</a>
              <a href="/sign-up">Sign Up</a>
            </NavLinks>
            <BurgerWrapper>
              <BurgerMenu
                navbarState={this.props.navbarState} 
                handleNavbar={this.props.handleNavbar}
              />
            </BurgerWrapper>
          </FlexContainer>
        </NavBar>
        <CollapseMenu 
          navbarState={this.props.navbarState} 
          handleNavbar={this.props.handleNavbar}
        />
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
  padding: 0 3rem 0 5rem;
  justify-content: space-between;
  height: 5rem;
  @media (max-width: 420px) {
    padding: 0 1.5rem;
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
  
  & a {
    color: #FEFFFF;
    background-color : #2B7A79;
    text-transform: uppercase;
    border: 2px solid #2B7A79;
    border-radius: 25px;
    font-weight: 600;
    padding : 7px 22px;
    // border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: #17252A;
      // border-bottom: 1px solid #fdcb6e;
      border: 2px solid #FEFFFF;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
 
const BurgerWrapper = styled.div`
  margin: auto 0;
  @media (min-width: 769px) {
    display: none;
  }
`;