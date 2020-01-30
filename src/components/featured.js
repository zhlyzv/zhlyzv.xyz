import React from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import { buildSlug } from '../util';

const BlogFeatured = () => {
    const { markdownRemark } = useStaticQuery(query);
    const imageSource = markdownRemark.frontmatter.image.childImageSharp.fluid.src;

    return (
        <Wrapper>
            <div>
                <Link to={markdownRemark.fields.slug}>
                    <Image src={imageSource} alt={markdownRemark.frontmatter.title} />
                </Link>
            </div>

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

const Image = styled.img`
    transition: all 400ms ease-in-out;
    cursor: pointer;
    border-radius: 3px;
    display: block;
`;

const Link = styled(GatsbyLink)`
    text-decoration: none;
    border: 0;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
                            src
                        }
                    }
                }
            }
        }
    }
`;
