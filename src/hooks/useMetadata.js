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
          }
        }
      }
    `
  );
  return site.siteMetadata;
};

export default useMetadata;
