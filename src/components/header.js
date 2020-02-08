import React from 'react';
import styled from 'styled-components';
import HeaderNav from './headerNav';
import { colours } from '../styles/theme';

const Header = () => (
    <StyledHeader>
        <HeaderNav />
    </StyledHeader>
);

const StyledHeader = styled.header`
    grid-area: header;
    position: relative;
    display: flex;
    flex-direction: row;
    place-items: center center;
    justify-content: space-between;
    @media (max-width: 767px) {
        background: ${colours.background};
        display: flex;
        justify-content: center;
    }
`;

export default Header;
