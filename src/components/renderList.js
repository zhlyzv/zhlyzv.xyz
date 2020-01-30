import React from 'react';
// import kebabCase from 'lodash.kebabcase';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import { colours } from '../styles/theme';

const renderList = ({ node }) => {
    const imageSource = node.frontmatter.image.childImageSharp.fluid.src;

    return (
        <article key={node.fields.slug} style={{ marginBottom: '50px' }}>
            <Heading>
                <Title>{node.frontmatter.title}</Title>
                <Info>
                    {/* <span>{country}</span> */}
                    {node.frontmatter.category.map((cat, i, arr) => (
                        // <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
                        <span key={i}>{cat}</span>
                    ))}
                    <span>{node.frontmatter.date}</span>
                </Info>
            </Heading>

            <Link to={node.fields.slug}>
                <Image src={imageSource} alt={node.frontmatter.title} />
            </Link>
        </article>
    );
};

const Heading = styled.h2`
    display: flex;
    place-items: center center;
    justify-content: space-between;
    position: relative;
    padding: 15px 25px;
    margin-bottom: 10px;
    &:after,
    &:before {
        content: '';
        display: block;
        position: absolute;
        border-style: solid;
        width: 70px;
        height: 50px;
    }
    &:after {
        border-width: 8px 8px 0 0;
        border-color: ${colours.primary};
        top: 0;
        right: 0;
    }
    &:before {
        border-width: 0 0 8px 8px;
        border-color: hsla(309.4, 32%, 47.3%, 0.52);
        bottom: 0;
        left: 0;
    }
`;

const Title = styled.span`
    display: inline-block;
`;

const Info = styled.div`
    font-size: 0.8rem;
    display: flex;
    flex-flow: column;
    text-align: right;
    span {
        padding: 5px 0;
        display: inline-block;
        &:first-of-type {
            border-bottom: 1px solid rgba(245, 245, 245, 0.7);
            padding-bottom: 7px;
        }
    }
`;

const Image = styled.img`
    transition: all 400ms ease-in-out;
    cursor: pointer;
    border: 5px solid ${colours.lightest};
    border-radius: 3px;
    display: block;
`;

const Link = styled(GatsbyLink)`
    text-decoration: none;
    border: 0;
`;

export default renderList;
