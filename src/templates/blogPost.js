import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Layout from '../layouts/homeLayout';
import { colours } from '../styles/theme';
import { buildSlug } from '../util';

const BlogPost = ({ data, pageContext }) => {
    const { markdownRemark } = data;
    const { title, date, image, category: categories } = markdownRemark.frontmatter;
    const { prev, next } = pageContext;
    const imageSource = image.childImageSharp.fluid;
    console.log(pageContext);

    return (
        <Layout>
            <Post>
                <Header>
                    <Title>{title}</Title>
                    <Date>{date}</Date>
                    {/* TODO: Should we make use of tags? <p>Tags: {tags.join()}</p> */}
                    <Category>
                        {categories.map((cat, i, arr) => (
                            <>
                                <Link key={i} to={buildSlug('blog', cat)}>
                                    {cat}
                                </Link>
                                {arr.length > i && arr.length - 1 !== i && (
                                    <Separator key={cat + i}>|</Separator>
                                )}
                            </>
                        ))}
                    </Category>
                </Header>

                <ImageLink to={imageSource.src}>
                    <Img fluid={imageSource} alt={title} />
                </ImageLink>
                {/* TODO: Should we instead use MDX to build blog posts etc? */}
                <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />

                <Pagination>
                    {prev && (
                        <Link to={prev.node.fields.slug} title={prev.node.frontmatter.title}>
                            {'<'} Previous
                        </Link>
                    )}

                    {next && (
                        <Link to={next.node.fields.slug} title={next.node.frontmatter.title}>
                            Next {'>'}
                        </Link>
                    )}
                </Pagination>
            </Post>
        </Layout>
    );
};

const Header = styled.header`
    margin-bottom: 20px;
`;

const Title = styled.h1`
    margin-bottom: 10px;
`;

const Date = styled.p`
    &:after {
        content: '';
        width: 10px;
        display: inline-block;
        margin-left: 10px;
        position: relative;
        top: -2px;
        border-top: 1px solid ${colours.light};
    }
    color: ${colours.grey};
    margin-bottom: 0px;
    display: inline-block;
    margin-right: 10px;
    letter-spacing: 2px;
    font-size: 0.7rem;
`;

const Separator = styled.span`
    display: inline-block;
    padding: 0 5px;
    color: ${colours.light};
`;

const Category = styled.p`
    color: ${colours.grey};
    margin-bottom: 0px;
    display: inline-block;
    margin-right: 10px;
    letter-spacing: 2px;
    font-size: 0.7rem;
    text-transform: lowercase;
`;

const ImageLink = styled(Link)`
    display: block;
`;

const Post = styled.article`
    max-width: 1360px;
    margin: 0 auto;
    padding: 0 10%;
    @media (max-width: 768px) {
        padding: 0 5%;
    }
`;

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 60%;
    margin: 0 auto;
    @media (max-width: 768px) {
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
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
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
