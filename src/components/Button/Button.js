import React from 'react';
import './Button.css';

const Button = ({text, onClick}) => {
    return (
        <button className="button" onClick={onClick}><span className="button-text">{text}</span></button>
    );
}

export default Button;