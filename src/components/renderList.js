import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { buildSlug } from '../util';
import { colours } from '../styles/theme';
import Img from "gatsby-image"

const renderList = ({ node }) => {
    const imageSource = node.frontmatter.image.childImageSharp.fluid;
    const { slug } = node.fields;
    const { title, category: categories } = node.frontmatter;

    return (
        <Post key={slug}>
            <Heading>
                <Title>{title}</Title>
                <Info>
                    <Category>
                        {categories.map((cat, i, arr) => (
                            <>
                                <CategoryLink key={i} to={buildSlug('blog', 'category', cat)}>
                                    {cat}
                                </CategoryLink>
                                {arr.length > i && arr.length - 1 !== i && <Separator>|</Separator>}
                            </>
                        ))}
                    </Category>
                    <span>{node.frontmatter.date}</span>
                </Info>
            </Heading>

            <Link to={slug}>
                <Image fluid={imageSource} alt={title} />
            </Link>
        </Post>
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

const Separator = styled.span`
    display: inline-block;
    padding: 0 5px !important;
`;

const Category = styled.span`
    display: inline;
`;

const Info = styled.div`
    color: ${colours.grey};
    font-size: 0.8rem;
    display: flex;
    flex-flow: column;
    text-align: right;
    span {
        padding: 5px 0;
        &:first-of-type {
            border-bottom: 1px solid rgba(245, 245, 245, 0.7);
            padding-bottom: 7px;
        }
    }
    // Otherwise category links are unclickable under the corner title decoration
    z-index: 1;
`;

const Image = styled(Img)`
    transition: all 400ms ease-in-out;
    cursor: pointer;
    /* border: 2px solid ${colours.lightest}; */
    border-radius: 3px;
    display: block;
    width: 100%;
`;

const Link = styled(GatsbyLink)`
    text-decoration: none;
    border: 0;
    display: block;
`;

const CategoryLink = styled(GatsbyLink)`
    text-decoration: none;
    border: 0;
    display: inline-block;
`;

const Post = styled.article`
    margin-bottom: 50px;
    align-self: center;
    width: 100%;
    @media (max-width: 768px) {
        margin-bottom: 20px;
    }
`

renderList.propTypes = {
    node: propTypes.object.isRequired,
};

export default renderList;
