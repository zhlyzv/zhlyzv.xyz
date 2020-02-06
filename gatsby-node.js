const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');
const { buildSlug } = require('./src/util');

// TODO: Consider moving this to one of the config pages
const postsPerPage = 6;
const categories = [];
// graphql doesn't throw errors
// check result.errors and throw manually instead
const errorWrapper = promise =>
    promise.then(result => {
        if (result.errors) {
            throw result.errors;
        }
        return result;
    });

// Get the category count in the
// const getCategoryCount = postList => {
//     const categories = postList.map(({ node }) => node.frontmatter.category);
//     const categoryCount = categories.reduce((prev, curr) => {
//         prev[curr] = (prev[curr] || 0) + 1;
//         return prev;
//     }, {});
//     return categoryCount;
// };

const createBlogListingPage = (postList, createPage, template) => {
    const posts = postList.filter(({ node }) => !node.frontmatter.featured);
    const numPages = Math.ceil(posts.length / postsPerPage);

    posts.forEach((_, i) => {
        createPage({
            path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
            component: template,
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                currentPage: i + 1,
                numPages,
            },
        });
    });
};

const createBlogPostPages = (postList, createPage, template) => {
    // Loop throught all posts and create a page for each through the createPage action
    postList.forEach((post, index, arr) => {
        // Find out what categories we have and push them into an array for later use
        // post.node.frontmatter.category.forEach(cat => categories.push(cat));
        // find what the next and previous posts are
        const prev = arr[index - 1];
        const next = arr[index + 1];
        const pagePath = post.node.fields.slug;
        post.node.frontmatter.category.forEach(cat => categories.push(cat));

        createPage({
            path: pagePath,
            component: template,
            context: {
                slug: pagePath,
                prev,
                next,
            },
        });
    });
};

const createCategoryPages = (postList, createPage, template) => {
    // Creating category page
    const categoryCount = categories.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1;
        return prev;
    }, {});
    const allCategories = Object.keys(categoryCount);
    console.log('category count, ', categoryCount);
    console.log('allCategories ', allCategories);

    allCategories.forEach(cat => {
        const link = buildSlug('blog', 'category', cat);
        const numPages = Math.ceil(categoryCount[cat] / postsPerPage);
        console.log('category number of pages, ', numPages);

        Array.from({
            length: numPages,
        }).forEach((_, i) => {
            createPage({
                path: i === 0 ? link : `${link}/page/${i + 1}`,
                component: template,
                context: {
                    // TODO: what is this?
                    allCategories,
                    category: cat,
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    currentPage: i + 1,
                    numPages,
                },
            });
        });
    });
};

// 1. CreatePages gets called once the data layer is bootstrapped, enabling us to create pages from data
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    // Query the markdown nodes created by markdown-remark
    const query = await errorWrapper(
        graphql(`
            {
                posts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                date
                                category
                                tags
                                featured
                            }
                            html
                        }
                    }
                }
            }
        `)
    );

    // Page templates
    const blogPost = path.resolve('./src/templates/blogPost.js');
    const blogListing = path.resolve('./src/templates/blogListing.js');
    const blogCategory = path.resolve('./src/templates/blogCategory.js');
    // Page creation
    const posts = query.data.posts.edges;

    createBlogListingPage(posts, createPage, blogListing);
    createBlogPostPages(posts, createPage, blogPost);
    createCategoryPages(posts, createPage, blogCategory);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const value = createFilePath({ node, getNode });
        const year = new Date(node.frontmatter.date).toLocaleDateString('en-EN', {
            year: 'numeric',
        });

        createNodeField({
            name: 'slug',
            node,
            value: buildSlug('blog', year, value.replace('/blog/', '')),
        });
    }
};
