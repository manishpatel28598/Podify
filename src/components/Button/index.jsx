import React from 'react'
import './style.css'
import '../../index.css'
function Button({text, onClick, disabled}) {
  return (
    <div>
      <button onClick={onClick} type='submit' className='custom-btn' disabled={disabled}>{text}</button>
    </div>
  )
}

export default Button
