import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../layouts/blogLayout';
import Pagination from '../components/pagination';
import Featured from '../components/featured';
import postList from '../components/postList';

const BlogPostList = ({ data, pageContext }) => {
    const { allMdx } = data;
    const { currentPage, numPages } = pageContext;
    const posts = allMdx.nodes.map(postList);

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
        allMdx: PropTypes.object.isRequired,
    }),
    pageContext: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        numPages: PropTypes.number.isRequired,
    }),
};

export default BlogPostList;

export const query = graphql`
    query blogPostsList($skip: Int!, $limit: Int!) {
        allMdx(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { featured: { eq: false } } }
            limit: $limit
            skip: $skip
        ) {
            nodes {
                ...BlogListingPost
            }
        }
    }
`;
