import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { spacing, breakpoint } from '../styles/theme';

const HomeSection = ({ sectionName, children, titleAlign }) => (
    <Wrapper>
        <Content>
            <Heading titleAlign={titleAlign}>{sectionName}</Heading>
            {children}
        </Content>
    </Wrapper>
);

const Heading = styled.h2`
    transform: rotate(${props => (props.titleAlign === 'left' ? '-' : '')}90deg);
    font-size: 1.5rem;
    font-weight: 600;
    position: absolute;
    top: calc(10% + ${spacing.large}px);
    left: ${props => (props.titleAlign === 'left' ? '0' : 'auto')};
    right: ${props => (props.titleAlign === 'left' ? 'auto' : '0')};
    flex: 1 100%;
    z-index: 1;
    @media (max-width: ${breakpoint.tablet}) {
        font-size: 0.9rem;
        top: 15%;
        left: ${props => (props.titleAlign === 'left' ? '2%' : 'auto')};
        right: ${props => (props.titleAlign === 'left' ? 'auto' : '2%')};
    }
    @media (max-width: ${breakpoint.mobile}) {
        left: ${props => (props.titleAlign === 'left' ? '-4%' : 'auto')};
        right: ${props => (props.titleAlign === 'left' ? 'auto' : '-4%')};
    }
`;

const Wrapper = styled.section`
    &:nth-of-type(odd) {
        background: rgba(0, 0, 0, 0.03);
    }
    display: flex;
    flex-flow: row wrap;
    padding: ${spacing.large}px ${spacing.huge}px;
    position: relative;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    margin-bottom: ${spacing.large}px;
    min-height: 30vh;
    p {
        max-width: 50%;
        letter-spacing: 0.06rem;
    }
    @media (max-width: ${breakpoint.mobile}) {
        padding: ${spacing.small}px 0;
        p {
            font-size: 0.85rem;
            max-width: 70%;
        }
    }
`;

const Content = styled.div`
    max-width: 1360px;
    position: relative;
    width: 100%;
`;

HomeSection.propTypes = {
    children: PropTypes.node.isRequired,
    sectionName: PropTypes.string.isRequired,
    titleAlign: PropTypes.string.isRequired,
};

export default HomeSection;
