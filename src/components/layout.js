import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GlobalStyle from '../styles/global';
import useMetadata from '../hooks/useMetadata';

import Header from './header';
import Footer from './footer';

const Wrapper = styled.div`
    display: grid;
    grid-template-areas: 'header' 'content' 'footer';
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    max-width: 100%;
    margin: 0 auto;
`;

const Layout = ({ children }) => {
    const { title } = useMetadata();
    return (
        <Wrapper>
            <GlobalStyle />
            <Header siteTitle={title} />
            <main>{children}</main>
            <Footer />
        </Wrapper>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
