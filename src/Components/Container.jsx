import React from 'react'
import '../Style/container.css'


const Container = ({ children, styles={}, className }) => {
  return (
    <div className={`container ${className}`} style={styles}>
        {children}
    </div>
  )
}

export default Container