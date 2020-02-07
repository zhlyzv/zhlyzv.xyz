import { graphql, useStaticQuery } from 'gatsby';

const useMetadata = () => {
    const { site } = useStaticQuery(
        graphql`
            query METADATA_QUERY {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        socialMedia {
                            github
                            linkedin
                        }
                    }
                }
            }
        `
    );
    return site.siteMetadata;
};

export default useMetadata;
