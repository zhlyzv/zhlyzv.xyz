import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import formattedString from 'react-formatted-string';

const Projects = ({ text, ctas, links }) => {
    const projectText = formattedString(
        text,
        <a href={links[0]}>{ctas[0]}</a>,
        <a href={links[1]}>{ctas[1]}</a>
    );
    return (
        <Wrapper>
            <p>{projectText}</p>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    place-items: center center;
    justify-content: center;
    text-align: center;
`;

Projects.propTypes = {
    text: propTypes.string,
    ctas: propTypes.array,
    links: propTypes.array,
};

export default Projects;
