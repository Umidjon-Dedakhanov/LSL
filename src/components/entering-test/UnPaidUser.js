import React from 'react'
import { Link } from 'react-router-dom'
import "./Paid.css"

function UnPaidUser() {
  return (
    <div className='unpaid_user'>
        <p className='unpaid_userTitle'>Ro'yhatdan o'tib to'lov qilishingiz kerak</p>
        <Link to="/"><button className='intro__submit'>Ro'yhatdan o'tish</button></Link>
    </div>
  )
}

export default UnPaidUser