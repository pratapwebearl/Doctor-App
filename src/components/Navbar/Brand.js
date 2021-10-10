  
import React from 'react'
import styled from "styled-components";

import logo from "../../images/logo_nav.svg";

const Brand = () => {
  return (
  <>
    <Image src={logo} alt="Company Logo" />
    <LogoName>Doctor's <Dark>App</Dark></LogoName>
  </>
  )
}

export default Brand

const Image = styled.img`
  height: 60%;
  margin: auto 0;
  @media (max-width: 370px) {
    display:none;
  }
`;
const LogoName = styled.p`
  color : #DEF2F1;
  text-decoration : none;
  margin: auto 0;
  border-left : 5px solid #2B7A79;
  border-radius : 5px;
  padding : 10px 7px;
  margin-left : 10px;
  font-weight: bold;
  
`;
const Dark = styled.span`
color : #2B7A79;
`;