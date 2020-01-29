import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formattedString from 'react-formatted-string';

const Contact = ({ text, email, cta }) => {
    const contactString = formattedString(text, <a href={`mailto:${email}`}>{cta}</a>);
    return (
        <Wrapper>
            <p>{contactString}</p>
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

Contact.propTypes = {
    text: PropTypes.string,
    email: PropTypes.string,
    cta: PropTypes.string,
};

export default Contact;
