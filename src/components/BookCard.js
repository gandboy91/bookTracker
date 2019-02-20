import React from 'react';
import PropTypes from 'prop-types';
import {Tag} from "./Tag";
const BookTitle = ({children}) => <div className="bookTitle">
    {children}
</div>

/**
 * Book card component. Represents book item in book list.
 * Takes tag handler callback and moveButton component
 */
export const BookCard = ({author, title, description, tags, tagHandler, moveButton}) => <div className="bookCard">
    <div>{author}</div>
    <div className="bookHeader">
        <BookTitle>{title}</BookTitle>
        {moveButton}
    </div>
    <div>
        {description}
    </div>
    <div className="tags">
        {tags.map((tag, key) => <Tag key={`book-t-${key}`} onClick={tagHandler}>{tag}</Tag>)}
    </div>
</div>

BookCard.propTypes = {
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    moveButton: PropTypes.element.isRequired,
    description: PropTypes.string,
    tags: PropTypes.array,
    tagHandler: PropTypes.func
}