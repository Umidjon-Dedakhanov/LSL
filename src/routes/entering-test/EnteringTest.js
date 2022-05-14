import React from 'react'
import "./EnteringTest.css"
import {Switch, Route, Redirect, useLocation} from "react-router-dom"
import PaidUser from '../../components/entering-test/PaidUser'
import { useSelector } from 'react-redux'

function EnteringTest() {
  const location = useLocation();
  const token = localStorage.getItem("user-token-start");
  const user = useSelector(state => state.user)
  return token ? <Redirect
      to={{
        pathname: "/resolvingtest",
        state: {
          from: location.pathname,
        },
      }}
    /> : (
    <div className='solving_test'>
        {
            user?.userId &&
            <Switch>
                <Route path="/enteringtest/paiduser" component={PaidUser}/>
                <Redirect to="/enteringtest/paiduser"/>
            </Switch>
        }
    </div>
  )
}

export default EnteringTest