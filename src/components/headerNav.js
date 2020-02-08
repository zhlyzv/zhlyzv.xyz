import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { colours } from '../styles/theme';
import useMetadata from '../hooks/useMetadata';

const Nav = styled.nav`
    // TODO: Use theme spacing constants instead of arbitrary numbers
    @supports (writing-mode: vertical-lr) {
        writing-mode: vertical-lr;
        text-orientation: mixed;
        position: fixed;
        z-index: 999;
        right: 10px;
        top: 10px;
        a {
            display: inline;
            border: 0;
            text-align: center;
            vertical-align: middle;
            color: ${colours.dark};
            margin: 10px 0;
            position: relative;
            text-decoration: underline double;

            :hover,
            :active,
            :focus {
                color: ${colours.light};
                /* text-decoration: underline overline; */
            }
        }
        @media (max-width: 768px) {
            position: relative;
            writing-mode: horizontal-tb;
            text-orientation: upright;
            justify-self: evenly;
            padding: 20px 10px;
            right: auto;
            top: auto;
            a {
                text-decoration: underline;
                padding: 0;
            }
        }
    }
    a {
        color: ${colours.dark};
        padding: 0 10px;
    }
`;

const HeaderNav = () => {
    const { socialMedia } = useMetadata();
    console.log(socialMedia);
    return (
        <Nav>
            <a href={socialMedia.github}>GitHub</a>
            <a href={socialMedia.linkedin}>LinkedIn</a>
            <Link to='/blog'>Blog</Link>
            <Link to='/'>Home</Link>
        </Nav>
    );
};

export default HeaderNav;
