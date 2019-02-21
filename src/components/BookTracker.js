import queryString from "query-string";
import {fetchBookList} from "../requests/index";
import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import {TABS} from "../constants";
import {BooksList, FilteredBooksList} from "./BooksList";
import {STORAGE_KEY} from "../constants/index";

/**
 * builds search query from object using query-string lib
 * @example: {foo:1, a:2} => /?foo=1&a=2
 * @param {object} parsedQueryObject
 */
const buildSearchQuery = parsedQueryObject => `/?${queryString.stringify(parsedQueryObject)}`

/**
 * Tab component. When clicked redirect to url /?tab={clickedTab}
 */
const Tab = ({tab, title, active}) =>
    <Link to={`/?tab=${tab}`} className={`tab ${active ? 'active' : ''}`}>
        {
            active
                ? <strong>{title}</strong>
                : title
        }
    </Link>;

const EmptyList = props => <div className="emptyList bookCard">
    <div>List is empty</div>
</div>

/**
 * Book tracker component.
 * Board for manage book statuses (to read, in progress, done)
 * Allows to filter books by tags
 */
export default class BookTracker extends PureComponent {
    state = {
        books: [],
        toread: [],
        inprogress: [],
        done: [],
        ...this.props.stateFromStorage,
    }

    /**
     * in real app it supposed to be api call here
     */
    componentDidMount() {
        console.log(localStorage.getItem('l'));
        window.addEventListener("beforeunload", this.handleBeforeUnload, false);
        fetchBookList('smallList.json')
            .then(({items}) => this.setBooks(items))
            .catch(console.warn)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.handleBeforeUnload);
    }

    /**
     * when unload page save books statuses to local storage
     * @param event
     */
    handleBeforeUnload = event => {
        event.preventDefault();
        event.returnValue = '';
        if (!localStorage) {
            return;
        }
        const {books, ...trackerState} = this.state;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerState));
    }

    handleMoveBook = ({target: {dataset: {id, destination}}}) => {
        if (!id || !destination) {
            return;
        }
        const currentTab = this.getCurrentTab();
        const {[currentTab]: fromCollection, [destination]: toCollection} = this.state;
        this.setState({
            [destination]: [...toCollection, id],
            [currentTab]: fromCollection.filter(bookId => bookId !== id)
        });
    }

    handleTagSelect = ({target: {dataset: {tag}}}) => {
        const selectedTags = this.getSelectedTags();
        if (selectedTags.includes(tag)) {
            return;
        }
        const parsedSearchQuery = {
            ...this.getParsedSearchQuery(),
            tags: [ ...selectedTags, tag ].join(',')
        };
        this.props.history.push(buildSearchQuery(parsedSearchQuery));
    }

    handleClearTags = () => {
        const {tags, ...parsedSearchQuery} = this.getParsedSearchQuery();
        this.props.history.push(buildSearchQuery(parsedSearchQuery));
    }

    setBooks = books => {
        const {inprogress, done} = this.state;
        const toread = books.reduce((acc, {id}) => {
            ![...inprogress, ...done].includes(id) && acc.push(id);
            return acc
        }, []);
        this.setState({
            books,
            toread
        })
    }

    getParsedSearchQuery = () => {
        const {location: {search}} = this.props;
        return queryString.parse(search);
    }

    getCurrentTab = () => {
        const {tab} = this.getParsedSearchQuery();
        return tab || TABS[0].tab;
    }

    getSelectedTags = () => {
        const {tags} = this.getParsedSearchQuery();
        return tags ? tags.split(',') : [];
    }

    getBooksByTab = tab => {
        const bookIds = this.state[tab] || [];
        return this.state.books.filter(({id}) => bookIds.includes(id))
    }

    renderTabs = currentTab => <div className="tabs">
        {
            TABS.map(({tab, title}, key) => <Tab
                    key={key}
                    tab={tab}
                    title={`${title} (${this.state[tab].length})`}
                    active={tab === currentTab}
                />
            )
        }
    </div>

    render() {
        const currentTab = this.getCurrentTab();
        const currentBooks = this.getBooksByTab(currentTab);
        const selectedTags = this.getSelectedTags();
        const books = this.getBooksByTab(currentTab);
        const commonProps = {
            books,
            tab: currentTab,
            tagHandler: this.handleTagSelect,
            moveHandler: this.handleMoveBook
        };

        const booksList = selectedTags.length
            ? <FilteredBooksList {...commonProps} tags={selectedTags} clearHandler={this.handleClearTags}/>
            : <BooksList {...commonProps} />;

        return <div className="tracker">
            {this.renderTabs(currentTab)}
            {
                currentBooks.length
                    ? booksList
                    : <EmptyList />
            }
        </div>
    }
}
