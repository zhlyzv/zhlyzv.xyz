import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { buildSlug } from '../util';
import renderList from '../components/renderList';
import Pagination from '../components/pagination';

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

            <Pagination
                currentPage={pageContext.currentPage}
                numPages={pageContext.numPages}
                category={pageContext.category}
            />
        </>
    );
};

BlogCategory.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        currentPage: PropTypes.number,
        numPages: PropTypes.number,
        category: PropTypes.string,
        allCategories: PropTypes.array,
    }),
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
