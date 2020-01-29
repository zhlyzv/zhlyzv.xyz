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
    p {
        max-width: 50%;
        letter-spacing: 0.06rem;
    }
    @media (max-width: 768px) {
        p {
            max-width: 80%;
        }
        margin-bottom: 20px;
    }
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
    @media (max-width: 768px) {
        font-size: 1.5rem;
        max-width: 85%;
    }
`;

Intro.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
};

export default Intro;
