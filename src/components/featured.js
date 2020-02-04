import React from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import { buildSlug } from '../util';
import Img from 'gatsby-image';

const BlogFeatured = () => {
    const { markdownRemark } = useStaticQuery(query);
    const imageSource = markdownRemark.frontmatter.image.childImageSharp.fluid;

    return (
        <Wrapper>
            <Link to={markdownRemark.fields.slug}>
                <Image fluid={imageSource} alt={markdownRemark.frontmatter.title} />
            </Link>

            <div>
                <div>
                    <Link to={markdownRemark.fields.slug}>
                        <h2>FEATURED {markdownRemark.frontmatter.title}</h2>
                    </Link>

                    <div>{markdownRemark.frontmatter.date}</div>
                </div>

                {markdownRemark.frontmatter.category.map((cat, index, arr) => (
                    <Link to={buildSlug('blog', 'category', cat)}>{cat}</Link>
                ))}
            </div>
        </Wrapper>
    );
};

export default BlogFeatured;

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

const Wrapper = styled.article`
    margin-bottom: 50px;
    align-self: center;
    width: 100%;
    @media (max-width: 768px) {
        margin-bottom: 20px;
    }
    display: flex;
    flex-direction: row;
`;

const query = graphql`
    query BlogFeatured {
        markdownRemark(frontmatter: { featured: { eq: true } }) {
            html
            fields {
                slug
            }
            frontmatter {
                title
                date(formatString: "MMMM YYYY")
                category
                image {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid_tracedSVG
                        }
                    }
                }
            }
        }
    }
`;
