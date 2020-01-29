import React from 'react';
import styled from 'styled-components';

const Contact = () => (
    <Wrapper>
        <p>
            You can drop me a line{` `}
            <a href='mailto:hello@zhlyzv.xyz?subject=Portfolio contact'>here</a>
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
        letter-spacing: 0.06rem;
    }
`;

export default Contact;
