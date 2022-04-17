import React, { useState } from 'react';
import authorizeAdmin  from '../../redux/actions/authAdmin';
import { connect, useSelector } from 'react-redux';
import { Redirect, useLocation, Link } from 'react-router-dom';
import './Login.css';

const AdminLogin = (props) => {
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const admin = useSelector((state) => state.admin);
  console.log(admin);
  const handleAdminLogin = (e) => {
    e.preventDefault();
    props.authorizeAdmin({username, password});
  }
  
  return admin.admin ?  <Redirect
  to={{
    pathname: "/admin",
    state: {
      from: location.pathname,
    },
  }}
/> : (
    <div className='user_login'>
    <h1>Admin sign in</h1>
    <form onSubmit={handleAdminLogin}>
      <input className='user_loginInput' type="text" value={username} onChange={e => setUsername(e.target.value)}  placeholder="Username"/>
      <input className='user_loginInput' type="text" value={password} onChange={e => setPassword(e.target.value)}  placeholder="Password"/>
      <button className='user_loginBtn' type="submit">Login</button>
    </form>
    <Link to="/" className='user_loginHome'>
    <span>Go Home</span>
  </Link>
  </div>
  )
}

export default connect(null, { authorizeAdmin })(AdminLogin)