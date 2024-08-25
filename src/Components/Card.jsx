import React from 'react'
import '../Style/card.css'

const Card = ({ title, description, icon, className}) => {
  return (
    <div className={`card ${className}`}>
       {icon && icon}
        <h3 className='title'>{title}</h3>
        <p className='description'>{description}</p>
    </div>
  )
}

export default Card