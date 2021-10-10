import React from 'react';
import styled from "styled-components";
const Burgermenu = (props) => {
  return (
    <Wrapper onClick={props.handleNavbar}>
      <div className={ props.navbarState ? "open" : "" }>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>
    </Wrapper>
  );
}
export default Burgermenu;
const Wrapper = styled.div`
  // z-index: 100;
  position: relative;
  padding-top: .7rem;
  cursor: pointer;
  display: block;
  & span {
    background: #FEFFFF;
    display: block;
    position: relative;
    width: 3.3rem;
    height: .35rem;
    margin-bottom: .7rem;
    transition: all ease-in-out 0.2s;
  }
  .open span:nth-child(2) {
      opacity: 0;
    }
  .open span:nth-child(3) {
    transform: rotate(45deg);
    top: -11px;
  }
  .open span:nth-child(1) {
    transform: rotate(-45deg);
    top: 11px;
  }
`;