import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VisuallyHidden from './util/visuallyHidden';
import { spacing, breakpoint } from '../styles/theme';

const Work = ({ items }) => (
    <Wrapper>
        {items.map((item, index) => (
            <GridItem key={index}>
                <VisuallyHidden>{item.title}</VisuallyHidden>
                <LogoLink href={item.link}>
                    <LogoImg src={item.logo.publicURL} alt='' />
                </LogoLink>
            </GridItem>
        ))}
    </Wrapper>
);

const LogoLink = styled.a`
    border: 0;
    &:hover {
        background: none;
    }
`;

const LogoImg = styled.img`
    width: 250px;
    @media (max-width: ${breakpoint.mobile}) {
        width: 100px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    position: relative;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
`;

const GridItem = styled.div`
    margin-bottom: ${spacing.huge}px;
    display: flex;
    flex: 1 50%;
    justify-content: center;
    @media (max-width: ${breakpoint.mobile}) {
        padding: ${spacing.tiny}px;
        margin-bottom: ${spacing.large}px;
    }
`;

Work.propTypes = {
    items: PropTypes.array,
};

export default Work;
