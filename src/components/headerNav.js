import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { colours } from '../styles/theme';

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
            transition: all 0.2s linear;
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
                text-decoration: underline overline;
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
// TODO: Move links to json config
const HeaderNav = () => (
    <Nav>
        <a href='https://github.com'>GitHub</a>
        <a href='https://linkedin.com'>LinkedIn</a>
        <Link to='/blog'>Blog</Link>
    </Nav>
);

export default HeaderNav;
