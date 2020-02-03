import React from 'react';
import styled from 'styled-components';

const Pagination = ({ numPages, currentPage, contextPage }) => {
    if (numPages <= 1) {
        return null;
    }

    return (
        <List>
            {Array.from({ length: numPages }).map((item, i) => {
                const index = i + 1;

                const baseLink = `/blog/${contextPage ? `${contextPage}/` : ''}`;
                const link = index === 1 ? baseLink : `${baseLink}page/${index}`;

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
    border-top: 1px solid rgb(238, 238, 238);
    width: 60%;
    @media (max-width: 768px) {
        width: 80%;
    }
`;

const Page = styled.li`
    min-width: 50px;
    margin: -1px 0.5em 0px;
    padding: 1em 0px;
    text-align: center;
    border-top: 1px solid ${props => (props.current ? 'black' : 'transparent')};
    a {
        text-decoration: none;
        border-bottom: 0;
    }
`;

export default Pagination;
