import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import BookTracker from "./BookTracker";
import './styles/App.css';

/**
 * 404 component for wrong query
 */
const WrongRoute = props => <h1>Wrong url, dude!</h1>

/**
 * root Component
 * perfoms basic routing logic
 */
class App extends Component {
    static propTypes = {
        stateFromStorage: PropTypes.object
    }

    static defaultProps = {
        stateFromStorage: {}
    }

    render() {
        const {stateFromStorage} = this.props;
        const bookTrackerRender = props => <BookTracker {...props} stateFromStorage={stateFromStorage} />;

        return <div>
            <Router>
                <Switch>
                    <Route path="/" exact render={bookTrackerRender}/>
                    <Route component={WrongRoute} />
                </Switch>
            </Router>
        </div>
    }
}

export default App;
