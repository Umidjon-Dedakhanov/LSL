import React, { useState, useEffect  } from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import userLogin from '../../redux/actions/authUser';
import './Login.css';

const UserLogin = (props) => {
  const location = useLocation();
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.user);
  console.log(user)
  const handleEnterTest = (e) => {
    e.preventDefault();
    props.userLogin({phone, password});
  }

  useEffect(() => {
      user.code = ''
  }, [user])

  return user.userId ? <Redirect
  to={{
    pathname: "/enteringtest/paiduser",
    state: {
      from: location.pathname,
    },
  }}
/> : (
    <div className='user_login'>
    <h1 className="title_user">Registered Phone Number and Password</h1>
  <form onSubmit={handleEnterTest}>
      <input className={user?.code ? 'user_loginInput err' : 'user_loginInput'} type="text" placeholder="Telephone number" value={phone} onChange={e => setPhone(e.target.value)} />
      <input className={user?.code ? 'user_loginInput err' : 'user_loginInput'} type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      { 
        user?.code === 400 &&
        <p className="validation">
            Please enter valid info!
        </p>
      }
      {
          user?.code === 404 &&
         <p className="validation">
             You have not registered yet!
         </p>
      }
      {
          user?.code === 401 &&
         <p className="validation">
             Telephone or Password is incorrect!
         </p>
      }
      {
          user?.code === 403 &&
         <p className="validation">
             You have already solved the test. P.S Wait the results!
         </p>
      }
      <button className='user_loginBtn'>Enter to test</button>
  </form>
  {
    user?.code === 402 && 
    <div className="user_info">
        <h2>You have already successfully Registered</h2>
        <h1 className="error_title">You need to proceed the PAYMENT!!!</h1>
        <p className="instruction">Pay 50 000 sums by hand or plastic card!</p>
        <a className="link" href="https://t.me/onlinetktadmin">Click here to pay the payment</a>
    </div> 
  }
  <Link to="/" className='user_loginHome'>
    <span>Go Home</span>
  </Link>
  </div>
  )
}

export default connect(null, { userLogin} )(UserLogin)