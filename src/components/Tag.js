import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Tag = ({children, onClick}) => <a className="tag" onClick={onClick} data-tag={children}>#{children}</a>

Tag.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

Tag.defaultProps = {
    onClick: () => {}
}