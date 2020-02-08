import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colours, spacing, breakpoint } from '../styles/theme';
import { buildSlug } from '../util';

const Pagination = ({ numPages, currentPage, category }) => {
    if (numPages <= 1) {
        return null;
    }

    return (
        <List>
            {Array.from({ length: numPages }).map((_, i) => {
                const index = i + 1;
                const baseLink = '/blog/';
                const cat = category || '';
                const link =
                    index === 1
                        ? buildSlug(baseLink, cat)
                        : buildSlug(baseLink, cat, 'page', index);

                return (
                    <Page current={currentPage === index} key={link}>
                        {currentPage === index ? <span>{index}</span> : <a href={link}>{index}</a>}
                    </Page>
                );
            })}
        </List>
    );
};

const List = styled.ul`
    display: flex;
    justify-content: center;
    list-style: outside none none;
    border-top: 1px solid ${colours.borders};
    width: 60%;
    padding: 0;
    @media (max-width: ${breakpoint.mobile}) {
        width: 80%;
    }
`;

const Page = styled.li`
    min-width: 50px;
    margin: -1px 5px 0;
    text-align: center;
    border-top: 1px solid ${({ current }) => (current ? 'black' : 'transparent')};
    ${({ current }) => current && `padding: ${spacing.medium};`}
    a {
        text-decoration: none;
        border-bottom: 0;
        padding: ${spacing.medium};
    }
`;

Pagination.propTypes = {
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    category: PropTypes.string,
};

export default Pagination;
