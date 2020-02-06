import React from 'react';
import { graphql, Link } from 'gatsby';
import { buildSlug } from '../util';
import renderList from '../components/renderList';

const BlogCategory = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;
    console.log('blog category data');
    console.log(data);

    return (
        <>
            <h1>Categories:</h1>
            {pageContext.allCategories.map(cat => (
                <Link to={buildSlug('blog', 'category', cat)}>{cat}</Link>
            ))}
            <br />

            {allMarkdownRemark.edges.map(renderList)}

            <ul>
                {Array.from({ length: pageContext.numPages }).map((item, i) => {
                    const index = i + 1;
                    const category = buildSlug(pageContext.category);
                    const link =
                        index === 1
                            ? buildSlug('blog', 'category', category)
                            : buildSlug('blog', 'category', category, 'page', index);

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

export default BlogCategory;

export const query = graphql`
    query blogPostsListByCategory($category: String, $skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { category: { in: [$category] } } }
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
        }
    }
`;
