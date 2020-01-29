module.exports = {
    siteMetadata: {
        title: `zhlyzv`,
        description: `Alexander Zhelyazov is a full-stack developer based in London.`,
        author: `@zhlyzv`,
        siteUrl: `https://zhlyzv.xyz/`,
    },
    plugins: [
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/content`,
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                // Apparently Samsung phones don't generate valid JPEG files for panoramas..
                // https://github.com/lovell/sharp/issues/1578
                failOnError: false,
                defaultQuality: 100,
            },
        },
        // Used for managing homepage content via JSON
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `zhlyzv-personal-site`,
                short_name: `zhlyzv`,
                start_url: `/`,
                background_color: `#6f33f9`,
                theme_color: `#6bbba9`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`,
            },
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [`gatsby-remark-images`],
            },
        },
    ],
};
