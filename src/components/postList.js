import React, { Fragment } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { buildSlug } from '../util';
import { colours, font, spacing, breakpoint } from '../styles/theme';

const postList = node => {
    const { slug } = node.fields;
    const { title, category: categories, date, image } = node.frontmatter;
    console.log('💩 check it check it out');
    console.log(node);
    const imageSource = image.childImageSharp.fluid;

    return (
        <Post key={slug}>
            <Heading>
                <Title>
                    <TitleLink to={slug}>{title}</TitleLink>
                </Title>
                <Info>
                    <Category>
                        {categories.map((cat, i, arr) => (
                            <Fragment key={i}>
                                <CategoryLink to={buildSlug('blog', cat)}>{cat}</CategoryLink>
                                {arr.length > i && arr.length - 1 !== i && <Separator>|</Separator>}
                            </Fragment>
                        ))}
                    </Category>
                    <span>{date}</span>
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
    padding: 12px 20px;
    margin-bottom: 20px;
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
        border-width: 6px 6px 0 0;
        border-color: ${colours.primary};
        top: 0;
        right: 0;
    }
    &:before {
        border-width: 0 0 6px 6px;
        border-color: hsla(309.4, 32%, 47.3%, 0.52);
        bottom: 0;
        left: 0;
    }
    @media (max-width: ${breakpoint.mobile}) {
        font-size: 1.5rem;
        padding: 8px 10px;

        &:after {
            border-width: 3px 3px 0 0;
        }
        &:before {
            border-width: 0 0 3px 3px;
        }
    }
`;

const Title = styled.span`
    display: inline-block;
`;

const Separator = styled.span`
    display: inline-block;
    padding: 0 5px !important;
    color: ${colours.light};
`;

const Category = styled.span`
    display: inline;
`;

const Info = styled.div`
    color: ${colours.grey};
    font-family: ${font.body};
    font-size: 0.7rem;
    text-align: right;
    display: flex;
    flex-flow: column;
    text-align: right;
    span {
        padding: 5px 0;
        &:first-of-type {
            border-bottom: 1px solid ${colours.borders};
            padding-bottom: 7px;
        }
    }
    // Otherwise category links are unclickable under the corner title decoration
    z-index: 1;
`;

const Image = styled(Img)`
    transition: all 300ms ease-in-out;
    cursor: pointer;
    border-radius: 3px;
    display: block;
    width: 100%;
    &:hover {
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.7);
    }
`;

const Link = styled(GatsbyLink)`
    text-decoration: none;
    border: 0;
    display: block;
`;

const TitleLink = styled(Link)`
    color: ${colours.dark};
    &:hover {
        color: ${colours.light};
        background: none;
    }
`;

const CategoryLink = styled(GatsbyLink)`
    text-decoration: none;
    border: 0;
    display: inline-block;
    text-transform: lowercase;
    font-weight: 400;
`;

const Post = styled.article`
    margin-bottom: ${spacing.huge};
    align-self: center;
    width: 80%;
    @media (max-width: ${breakpoint.mobile}) {
        margin-bottom: 20px;
        width: 100%;
    }
`;

postList.propTypes = {
    node: PropTypes.object.isRequired,
};

export default postList;
