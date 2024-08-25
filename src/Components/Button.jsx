import React from 'react';
import '../Style/button.css';

const Button = ({ type="button", text, Icon, styles={}, disabled, fullwidth=false, onClick, ...rest}) => {
  return (
    <button type={type} style={styles} disabled={disabled} className={`${fullwidth && 'full__width'}`} onClick={onClick} {...rest}>
        { Icon && Icon}
        {text}
    </button>
  )
}

export default Button