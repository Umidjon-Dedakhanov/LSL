import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './Admin.css';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {SIDEBAR_STATIC_DATA} from '../../static/sidebar__data';

const Admin = () => {
    const { path } = useRouteMatch();
    return (
        <div className='admin__panel'>
            <Sidebar/>
            <div className="admin__container">
                <Switch>
                    {
                        SIDEBAR_STATIC_DATA.map(sidebar_route => 
                            <Route key={sidebar_route.id} path={`${path}/${sidebar_route.route}`}>
                                {sidebar_route.component}
                            </Route>    
                        )
                    }
                </Switch>
            </div>
        </div>
    )
}

export default Admin