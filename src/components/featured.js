import React from 'react';
import kebabCase from 'lodash.kebabcase';
import { graphql, Link, useStaticQuery } from 'gatsby';

const BlogFeatured = () => {
    const { markdownRemark } = useStaticQuery(query);
    const imageSource = markdownRemark.frontmatter.image.childImageSharp.fluid.src;

    return (
        <>
            <div>
                <Link to={markdownRemark.fields.slug}>
                    <img src={imageSource} alt={markdownRemark.frontmatter.title} />
                </Link>
            </div>

            <div>
                <div>
                    <Link to={markdownRemark.fields.slug}>
                        <h2>{markdownRemark.frontmatter.title}</h2>
                    </Link>

                    <div>{markdownRemark.frontmatter.date}</div>
                </div>

                {markdownRemark.frontmatter.category.map((cat, index, arr) => (
                    <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
                ))}
            </div>
        </>
    );
};

export default BlogFeatured;

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
