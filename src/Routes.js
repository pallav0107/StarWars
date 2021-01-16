import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PeopleComponet from './views/PeopleComponent'
const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" name="People Component" component={PeopleComponet} />
            </Switch>
        </Router>
    )
}

export default Routes;
