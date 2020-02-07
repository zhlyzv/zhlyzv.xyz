import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { buildSlug } from '../util';

const categoryList = ({ categories, currentCategory }) => {
    const otherCategories = categories.filter(cat => cat !== currentCategory);
    const items = otherCategories.map((cat, i) => (
        <Category key={i}>
            <Link to={buildSlug('blog', cat)}>{cat}</Link>
        </Category>
    ));

    return (
        <Wrapper>
            <Heading>{currentCategory}</Heading>
            <ListTitle>Other categories:</ListTitle>
            <List>{items}</List>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 25px 0;
`;

const Heading = styled.h1`
    margin-bottom: 40px;
`;

const ListTitle = styled.p`
    margin-bottom: 10px;
`;

const List = styled.ul`
    list-style: none;
    display: block;
    margin: 0;
    padding: 0;
`;

const Category = styled.li`
    display: inline-block;
    margin: 0 5px;
    font-size: 0.9rem;
    &:first-of-type {
        margin-left: 0;
    }
`;

categoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    currentCategory: PropTypes.string.isRequired,
};

export default categoryList;
