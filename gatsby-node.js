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

const createBlogListingPage = (postList, createPage, template) => {
    console.log('poopoo ');
    console.log(postList);
    const posts = postList.filter(node => !node.frontmatter.featured);
    const numPages = Math.ceil(posts.length / postsPerPage);
    // Create a listing page based on the number of posts we want to show per page
    Array.from({ length: numPages }).forEach((_, i) => {
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
    postList.forEach((post, i, arr) => {
        // find what the next and previous posts are
        const prev = arr[i - 1];
        const next = arr[i + 1];
        console.log('NEXT POST FOFOFO');
        console.log(next);
        const pagePath = post.frontmatter.slug;
        post.frontmatter.category.forEach(cat => categories.push(cat));

        const { category } = post.frontmatter;

        category.forEach(cat => {
            createPage({
                path: buildSlug('blog', cat, pagePath),
                component: template,
                context: {
                    slug: buildSlug('blog', cat, pagePath),
                    prev,
                    next,
                },
            });
        });
    });
};

const createCategoryPages = (postList, createPage, template) => {
    const categoryCount = categories.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1;
        return prev;
    }, {});
    const allCategories = Object.keys(categoryCount);
    // Create a category page per category, eg '/blog/travel'
    allCategories.forEach(cat => {
        const link = buildSlug('blog', cat);
        const numPages = Math.ceil(categoryCount[cat] / postsPerPage);

        Array.from({
            length: numPages,
        }).forEach((_, i) => {
            createPage({
                path: i === 0 ? link : `${link}/page/${i + 1}`,
                component: template,
                context: {
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
                posts: allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
                    nodes {
                        frontmatter {
                            title
                            date
                            category
                            tags
                            featured
                            slug
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
    const posts = query.data.posts.nodes;

    createBlogListingPage(posts, createPage, blogListing);
    createBlogPostPages(posts, createPage, blogPost);
    createCategoryPages(posts, createPage, blogCategory);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    console.log('running onCreateNode hook for type, ', node.internal.type);
    if (node.internal.type === 'Mdx') {
        console.log('updating slugss for node');
        console.log(node.frontmatter.slug);
        // const year = new Date(node.frontmatter.date).toLocaleDateString('en-EN', {
        //     year: 'numeric',
        // });
        const { category } = node.frontmatter;
        /**
         * Update the slug for each Post
         *
         * In cases where a post has multiple categories, multiple slugs are created.
         * Eg. a Post is categorised as both 'travel' and 'japan' then we get two
         * slugs /blog/travel/POST_NAME and /blog/japan/POST_NAME
         */
        category.forEach(cat => {
            const slug = buildSlug('blog', cat, node.frontmatter.slug);
            console.log('new slug ', slug);
            createNodeField({
                node,
                name: 'slug',
                value: slug,
            });
        });
    }
};
