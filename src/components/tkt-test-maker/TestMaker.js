import React from "react";
// import { useRouteMatch, Switch, Route, NavLink, } from 'react-router-dom';
import './TestMaker.css'
import CreateTest from "../createTest/CreateTest";

const TestMaker = () => {
  // const { path, url } = useRouteMatch();
  return (
    <div className="main__panel">
      {/* <div className="test_tabs">
        <div className="tab_wrapper">
          <NavLink activeClassName="link_activetabs" className="link_tabs" to={`${url}/multiple`}>Multiple Choice</NavLink>
          <NavLink activeClassName="link_activetabs" className="link_tabs" to={`${url}/matching`}>Matching Options</NavLink>
        </div>
        <button className="cancel_test">Cancel Test</button>
      </div>
    <Switch>
      <Route path={`${path}/matching`}>
        <Matching/>    
      </Route>
      <Route path={`${path}/multiple`}>
        <CreateMultiple/>
      </Route>
    </Switch> */}
    <CreateTest/>
    </div>
  );
};

export default TestMaker;