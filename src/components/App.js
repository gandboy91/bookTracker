import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import queryString from "query-string";
import {fetchBookList} from "./requests/index";
import './App.css';

const TABS = [
    {
        tab: 'toread',
        title: 'To read'
    },
    {
        tab: 'inprogress',
        title: 'In progress'
    },
    {
        tab: 'done',
        title: 'Done'
    },
];

const Tab = ({tab, title, active}) =>
    <Link to={`/?tab=${tab}`} className={`tab ${active ? 'active' : ''}`}>
        {
            active
                ? <strong>{title}</strong>
                : title
        }
    </Link>;

class BookTracker extends Component {
    state = {
        ...this.props.stateFromSession,
        books: []
    }

    componentDidMount() {
        fetchBookList('smallList.json')
            .then(({items}) => this.setState({books: items}))
            .catch(console.warn)
    }

    render() {
        const {location: {search}} = this.props;
        const {tab} = queryString.parse(search);
        const currentTab = tab || TABS[0].tab;
        return <div className="tracker">
            <div className="tabs">
                {
                    TABS.map(({tab, title}, key) => <Tab
                            key={key}
                            tab={tab}
                            title={title}
                            active={tab === currentTab}
                        />
                    )
                }
            </div>
        </div>
    }
}

const WrongRoute = props => <h1>Wrong url, dude!</h1>

class App extends Component {
    static propTypes = {
        stateFromSession: PropTypes.object
    }

    static defaultProps = {
        stateFromSession: {}
    }

    render() {
        const stateFromSession = this.props.stateFromSession || {};
        const bookTrackerRender = props => <BookTracker {...props} stateFromSession={stateFromSession} />;

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
