import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../layouts/blogLayout';
import Pagination from '../components/pagination';
import Featured from '../components/featured';
import renderList from '../components/renderList';

const BlogPostList = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;
    const { currentPage, numPages } = pageContext;
    const posts = allMarkdownRemark.edges.map(renderList);

    return (
        <Layout>
            {currentPage === 1 && <Featured />}
            {posts}
            <Pagination currentPage={currentPage} numPages={numPages} />
        </Layout>
    );
};

BlogPostList.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.object.isRequired,
    }),
    pageContext: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        numPages: PropTypes.number.isRequired,
    }),
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
                        date(formatString: "MMMM YYYY")
                        category
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1300, maxHeight: 700, fit: COVER) {
                                    ...GatsbyImageSharpFluid_tracedSVG
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
