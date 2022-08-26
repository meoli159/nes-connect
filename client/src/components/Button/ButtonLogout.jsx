import React from 'react';
import './ButtonLogout.css';
import { Link } from 'react-router-dom';

const STYLES = ['btns--primary', 'btns--outline', 'btns--test'];

const SIZES = ['btns--medium', 'btns--large'];

export const ButtonLogout = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to='/' className='btns-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}>
        {children}
      </button>
    </Link>
  );
};