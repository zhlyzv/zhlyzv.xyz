import React from 'react';
import { graphql, Link } from 'gatsby';

const BlogPost = ({ data, pageContext }) => {
    const { markdownRemark } = data;
    const { prev, next } = pageContext;
    const imageSource = markdownRemark.frontmatter.image.childImageSharp.fluid.src;

    return (
        <div>
            <img src={imageSource} alt={markdownRemark.frontmatter.title} />
            <h1>{markdownRemark.frontmatter.title}</h1>
            <p>{markdownRemark.frontmatter.date}</p>
            <p>Tags: {markdownRemark.frontmatter.tags.join()}</p>
            <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />

            <div>
                {prev && (
                    <Link to={prev.node.fields.slug}>
                        {prev.node.frontmatter.title} {'<'}
                    </Link>
                )}

                {next && (
                    <Link to={next.node.fields.slug}>
                        {next.node.frontmatter.title} {'>'}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default BlogPost;

export const query = graphql`
    query BlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date(formatString: "MMMM YYYY")
                category
                tags
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
