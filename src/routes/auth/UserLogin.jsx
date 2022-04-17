import React, { useState } from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import userLogin from '../../redux/actions/authUser';
import './Login.css';

const UserLogin = (props) => {
  const location = useLocation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.user);
  const handleEnterTest = (e) => {
    e.preventDefault();
    props.userLogin({phone, password});
  }
  return user.userId ? <Redirect
  to={{
    pathname: "/enteringtest/paiduser",
    state: {
      from: location.pathname,
    },
  }}
/> : (
    <div className='user_login'>
    <h1>Sign in</h1>
  <form onSubmit={handleEnterTest}>
      <input className='user_loginInput' type="text" placeholder="Telephone number" value={phone} onChange={e => setPhone(e.target.value)} />
      <input className='user_loginInput' type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      <button className='user_loginBtn'>Enter to test</button>
  </form>
  <Link to="/" className='user_loginHome'>
    <span>Go Home</span>
  </Link>
  </div>
  )
}

export default connect(null, { userLogin} )(UserLogin)