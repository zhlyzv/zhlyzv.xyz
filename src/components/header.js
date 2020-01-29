import React from 'react';
import styled from 'styled-components';
import HeaderNav from './headerNav';

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
`;

export default Header;
