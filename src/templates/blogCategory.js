import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import renderList from '../components/renderList';
import Pagination from '../components/pagination';
import Layout from '../layouts/blogLayout';
import CategoryList from '../components/categoryList';

const BlogCategory = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;
    const posts = allMarkdownRemark.edges.map(renderList);
    const categories = (
        <CategoryList
            categories={pageContext.allCategories}
            currentCategory={pageContext.category}
        />
    );

    return (
        <Layout>
            {categories}
            {posts}
            <Pagination
                currentPage={pageContext.currentPage}
                numPages={pageContext.numPages}
                category={pageContext.category}
            />
        </Layout>
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
                ...BlogListingPost
            }
        }
    }
`;
