import { graphql } from 'gatsby';

export const BlogImage = graphql`
    fragment BlogImage on MarkdownRemarkFrontmatter {
        image {
            childImageSharp {
                fluid(maxWidth: 1200, maxHeight: 800, fit: COVER) {
                    ...GatsbyImageSharpFluid_tracedSVG
                }
            }
        }
    }
`;

export const BlogListingPost = graphql`
    fragment BlogListingPost on MarkdownRemarkEdge {
        node {
            fields {
                slug
            }
            frontmatter {
                title
                date(formatString: "MMMM YYYY")
                category
                ...BlogImage
            }
        }
    }
`;

export const BlogPostImage = graphql`
    fragment BlogPostImage on MarkdownRemarkFrontmatter {
        image {
            childImageSharp {
                fluid(maxWidth: 1400) {
                    ...GatsbyImageSharpFluid_tracedSVG
                }
            }
        }
    }
`;
