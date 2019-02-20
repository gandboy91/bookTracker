import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {BookCard} from "./BookCard";
import {TAB_TO_ACTION} from "../constants/index";
import {filterByTags} from "../helpers/filters/index";
import {Tag} from "./Tag";

/**
 * Move button component. Takes moving book callback and arguments to call it.
 * pass params as data-attributes
 */
const MoveButton = ({id, destination, onClick, children}) => <a
    className="moveButton"
    data-id={id}
    data-destination={destination}
    onClick={onClick}
>
    {children}
</a>

/**
 * Make list of books from passed collection. Takes move book ans select tag callbacks
 */
export const BooksList = ({books, tab, moveHandler, tagHandler}) => {
    const moveAction = TAB_TO_ACTION.get(tab);
    return books.map(({id, author, title, description, tags}) => <BookCard
            key={`book-${id}`}
            author={author}
            title={title}
            tags={tags}
            tagHandler={tagHandler}
            description={description}
            moveButton={
                <MoveButton id={id} destination={moveAction.destination} onClick={moveHandler}>
                    {moveAction.title}
                </MoveButton>
            }
        />)
}

BooksList.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
    tab: PropTypes.string.isRequired,
    moveHandler: PropTypes.func.isRequired
}

/**
 * HOC Applies filter by tags to list component
 * @param ListComponent
 */
const filteredByTags = ListComponent => class FilteredByTags extends PureComponent {
    render() {
        const {tags, books, clearHandler, ...props} = this.props;
        return <div>
            <div className="bookCard filterInfo">
                <span>
                    Filtered by tags:
                    {tags.map((tag, key) => <Tag key={`filter-t-${tag}`}>{tag}</Tag>)}
                </span>&nbsp;
                <a onClick={clearHandler}>(clear)</a>
            </div>
            <ListComponent books={filterByTags(books, tags)} {...props}/>
        </div>
    }
}

export const FilteredBooksList = filteredByTags(BooksList);