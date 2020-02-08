import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Intro = ({ name, title, summary }) => (
    <Wrapper>
        <Title>
            {name}
            <span>{title}</span>
        </Title>
        <p>{summary}</p>
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    place-items: center center;
    justify-content: center;
    text-align: center;
`;

const Title = styled.h1`
    letter-spacing: 0.1rem;
    font-weight: 300;
    span {
        display: block;
        font-size: 1.1rem;
        margin-top: 0.5rem;
        font-weight: 600;
        letter-spacing: 0.2rem;
        text-transform: uppercase;
    }
    @media (max-width: 767px) {
        font-size: 1.35rem;
        max-width: 75%;
        span {
            font-size: 0.85rem;
        }
    }
`;

Intro.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
};

export default Intro;
