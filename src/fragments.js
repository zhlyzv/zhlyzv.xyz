import { graphql } from 'gatsby';

export const BlogImage = graphql`
    fragment BlogImage on MarkdownRemarkFrontmatter {
        image {
            childImageSharp {
                fluid(maxWidth: 1200, maxHeight: 700, fit: COVER) {
                    ...GatsbyImageSharpFluid_tracedSVG
                }
            }
        }
    }
`;
