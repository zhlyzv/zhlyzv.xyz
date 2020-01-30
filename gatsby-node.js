const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

const kebabCase = require(`lodash.kebabcase`);

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const value = createFilePath({ node, getNode });
        const [month, day, year] = new Date(node.frontmatter.date)
            .toLocaleDateString('en-EN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            .split('/');

        const slug = value.replace('/blog/', '').replace(/\/$/, '');
        const url = `/blog/${year}/${month}/${day}/${slug}`;

        createNodeField({
            name: 'slug',
            node,
            value: url,
        });
    }
};

// 1. This is called once the data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
    // 1.1 Getting the method to create pages
    const { createPage } = actions;
    // 1.2 Tell which layout Gatsby should use to thse pages
    const blogPost = path.resolve(`./src/layouts/blogPost.js`);
    const blogListing = path.resolve(`./src/layouts/blogListing.js`);
    const blogCategory = path.resolve(`./src/layouts/blogCategory.js`);

    // 2 Return the method with the query
    return graphql(`
        query blogPosts {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            date(formatString: "MMMM YYYY")
                            category
                            tags
                            featured
                        }
                        html
                    }
                }
            }
        }
    `).then(result => {
        // 2.1 Handle the errors
        if (result.errors) {
            console.error(result.errors);
            reject(result.errors);
        }

        // 2.2 Our posts are here
        const posts = result.data.allMarkdownRemark.edges;
        const postsPerPage = 6;
        const postsWithoutFeatured = posts.filter(({ node }) => !node.frontmatter.featured);
        const numPages = Math.ceil(postsWithoutFeatured.length / postsPerPage);
        const categories = [];
        // 3 Loop throught all posts
        posts.forEach((post, index) => {
            // push categories into the array above
            post.node.frontmatter.category.forEach(cat => categories.push(cat));
            // 3.1 Finally create posts
            createPage({
                path: post.node.fields.slug,
                component: blogPost,
                context: {
                    slug: post.node.fields.slug,
                },
            });
        });

        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
                component: blogListing,
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    currentPage: i + 1,
                    numPages,
                },
            });
        });

        const categoryCount = categories.reduce((prev, curr) => {
            prev[curr] = (prev[curr] || 0) + 1;
            return prev;
        }, {});
        const allCategories = Object.keys(categoryCount);

        allCategories.forEach((cat, i) => {
            const link = `/blog/category/${kebabCase(cat)}`;

            Array.from({
                length: Math.ceil(categoryCount[cat] / postsPerPage),
            }).forEach((_, i) => {
                createPage({
                    path: i === 0 ? link : `${link}/page/${i + 1}`,
                    component: blogCategory,
                    context: {
                        allCategories,
                        category: cat,
                        limit: postsPerPage,
                        skip: i * postsPerPage,
                        currentPage: i + 1,
                        numPages: Math.ceil(categoryCount[cat] / postsPerPage),
                    },
                });
            });
        });
    });
};
