import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HomeSection = ({ sectionName, children, titleAlign }) => (
    <SectionWrapper>
        <ContentWrapper>
            <SectionHeading titleAlign={titleAlign}>{sectionName}</SectionHeading>
            {children}
        </ContentWrapper>
    </SectionWrapper>
);

const SectionHeading = styled.h2`
    transform: rotate(${props => (props.titleAlign === 'left' ? '-' : '')}90deg);
    font-size: 1.5rem;
    font-weight: 600;
    position: absolute;
    top: calc(10% + 25px);
    left: ${props => (props.titleAlign === 'left' ? '0' : 'auto')};
    right: ${props => (props.titleAlign === 'left' ? 'auto' : '0')};
    flex: 1 100%;
    z-index: 1;
    @media (max-width: 768px) {
        font-size: 1.1rem;
        top: 0;
    }
`;

const SectionWrapper = styled.section`
    &:nth-of-type(odd) {
        background: rgba(0, 0, 0, 0.03);
    }
    display: flex;
    flex-flow: row wrap;
    padding: 25px 50px;
    position: relative;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    min-height: 30vh;
    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const ContentWrapper = styled.div`
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
