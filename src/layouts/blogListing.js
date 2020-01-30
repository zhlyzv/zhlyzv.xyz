import React from 'react';
import { graphql } from 'gatsby';

import Layout from './blogLayout';
import Seo from '../components/seo';
import Pagination from '../components/pagination';
import Featured from '../components/featured';
import renderList from '../components/renderList';

const BlogPostList = ({ data, pageContext }) => {
    const { allMarkdownRemark } = data;
    const { currentPage, numPages } = pageContext;

    return (
        <Layout>
            <Seo title='Blog' />
            <div>{currentPage === 1 && <Featured />}</div>

            <div>
                <div>{allMarkdownRemark.edges.map(renderList)}</div>

                <Pagination currentPage={currentPage} numPages={numPages} />
            </div>
        </Layout>
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
