import React from 'react';
import styled from 'styled-components';

const Projects = () => (
    <Wrapper>
        <p>
            The <a href='https://github.com/zhlyzv'>source code for this website</a> and any other
            projects I am working on can be found on{' '}
            <a href='https://github.com/zhlyzv'>my GitHub profile</a>.
        </p>
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    place-items: center center;
    justify-content: center;
    text-align: center;
    p {
        max-width: 60%;
        letter-spacing: 0.06rem;
    }
    @media (max-width: 768px) {
        p {
            max-width: 80%;
        }
        margin-bottom: 20px;
    }
`;

export default Projects;
