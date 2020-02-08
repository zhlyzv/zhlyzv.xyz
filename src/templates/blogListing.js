import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../layouts/blogLayout';
import Pagination from '../components/pagination';
import Featured from '../components/featured';
import postList from '../components/postList';

const BlogPostList = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;
    const { currentPage, numPages } = pageContext;
    const posts = allMarkdownRemark.edges.map(postList);

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
                ...BlogListingPost
            }
        }
    }
`;
