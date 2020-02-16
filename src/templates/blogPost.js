import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Layout from '../layouts/homeLayout';
import { colours, spacing, breakpoint } from '../styles/theme';
import { buildSlug } from '../util';
import SEO from '../components/seo';

const BlogPost = ({ data, pageContext }) => {
    const { mdx } = data;
    const { title, date, image, category: categories } = mdx.frontmatter;
    const { prev, next } = pageContext;
    console.log('PREVIOUS POST');
    console.log(prev);
    const imageSource = image.childImageSharp.fluid;

    return (
        <Layout>
            <SEO title={`${title} | ${categories}`} keywoards={categories} />
            <Post>
                <Header>
                    <Title>{title}</Title>
                    <Date>{date}</Date>
                    {/* TODO: Should we make use of tags? <p>Tags: {tags.join()}</p> */}
                    <Category>
                        {categories.map((cat, i, arr) => (
                            <Fragment key={i}>
                                <Link to={buildSlug('blog', cat)}>{cat}</Link>
                                {arr.length > i && arr.length - 1 !== i && <Separator>|</Separator>}
                            </Fragment>
                        ))}
                    </Category>
                </Header>

                <ImageLink to={imageSource.src}>
                    <Img fluid={imageSource} alt={title} />
                </ImageLink>
                {/* TODO: Should we instead use MDX to build blog posts etc? */}
                {/* <Content dangerouslySetInnerHTML={{ __html: markdownRemark.html }} /> */}

                <Pagination>
                    {prev && (
                        <Link to={prev.frontmatter.slug} title={prev.frontmatter.title}>
                            {'<'} Previous
                        </Link>
                    )}

                    {next && (
                        <Link to={next.frontmatter.slug} title={next.frontmatter.title}>
                            Next {'>'}
                        </Link>
                    )}
                </Pagination>
            </Post>
        </Layout>
    );
};

const Content = styled.div`
    margin-bottom: ${spacing.large};
`;

const Header = styled.header`
    margin-bottom: ${spacing.large};
`;

const Title = styled.h1`
    margin-bottom: ${spacing.small};
`;

const Date = styled.p`
    &:after {
        content: '';
        width: ${spacing.small};
        display: inline-block;
        margin-left: ${spacing.small};
        position: relative;
        top: -2px;
        border-top: 1px solid ${colours.light};
    }
    color: ${colours.grey};
    margin-bottom: 0px;
    display: inline-block;
    margin-right: ${spacing.small};
    letter-spacing: 2px;
    font-size: 0.7rem;
`;

const Separator = styled.span`
    display: inline-block;
    padding: 0 ${spacing.tiny};
    color: ${colours.light};
`;

const Category = styled.p`
    color: ${colours.grey};
    margin-bottom: 0px;
    display: inline-block;
    margin-right: ${spacing.small};
    letter-spacing: 2px;
    font-size: 0.7rem;
    text-transform: lowercase;
`;

const ImageLink = styled(Link)`
    display: block;
    margin-bottom: ${spacing.large};
`;

const Post = styled.article`
    max-width: 1360px;
    margin: 0 auto;
    padding: 0 10%;
    @media (max-width: ${breakpoint.mobile}) {
        padding: 0 5%;
    }
`;

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    max-width: 60%;
    margin: 0 auto ${spacing.huge};
    @media (max-width: ${breakpoint.mobile}) {
        max-width: 80%;
    }
`;

BlogPost.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired,
};

export default BlogPost;

export const query = graphql`
    query BlogPostBySlug($slug: String!) {
        mdx(frontmatter: { slug: { eq: $slug } }) {
            frontmatter {
                title
                date(formatString: "MMMM YYYY")
                category
                tags
                ...BlogPostImage
            }
        }
    }
`;
