import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GlobalStyle from '../styles/global';
import useMetadata from '../hooks/useMetadata';
import SEO from '../components/seo';

import Header from '../components/header';
import Footer from '../components/footer';

const Wrapper = styled.div`
    display: grid;
    grid-template-areas: 'header' 'content' 'footer';
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    max-width: 1360px;
    margin: 0 auto;
    justify-content: center;
`;

const Content = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    @media (max-width: 768px) {
        padding: 0 5px;
    }
`;

const Layout = ({ children }) => {
    const { title } = useMetadata();
    return (
        <Wrapper>
            <GlobalStyle />
            <SEO title='Blog' />
            <Header siteTitle={title} />
            <Content>{children}</Content>
            <Footer />
        </Wrapper>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;