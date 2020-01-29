import React from 'react';
import { graphql, Link } from 'gatsby';

const BlogPostList = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;

    return (
        <>
            {allMarkdownRemark.edges.map(({ node }) => {
                const imageSource = node.frontmatter.image.childImageSharp.fluid.src;

                return (
                    <>
                        <Link to={node.fields.slug}>
                            <img src={imageSource} alt={node.frontmatter.title} />
                            <h1>{node.frontmatter.title}</h1>
                        </Link>
                        <p>{node.frontmatter.date}</p>
                        <p>By {node.frontmatter.author}</p>
                        <p>In: {node.frontmatter.category.join()}</p>
                    </>
                );
            })}

            <ul>
                {Array.from({ length: pageContext.numPages }).map((item, i) => {
                    const index = i + 1;
                    const link = index === 1 ? '/blog' : `/blog/page/${index}`;

                    return (
                        <li>
                            {pageContext.currentPage === index ? (
                                <span>{index}</span>
                            ) : (
                                <a href={link}>{index}</a>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default BlogPostList;

export const query = graphql`
    query blogPostsList($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { featured: { eq: false } } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                        author
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
        }
    }
`;
