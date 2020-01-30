import React from 'react';
import kebabCase from 'lodash.kebabcase';
import { Link } from 'gatsby';

const renderList = ({ node }) => {
    const imageSource = node.frontmatter.image.childImageSharp.fluid.src;

    return (
        <div key={node.fields.slug}>
            <Link to={node.fields.slug}>
                <img src={imageSource} alt={node.frontmatter.title} />
            </Link>

            <div>
                <Link to={node.fields.slug}>
                    <h2>{node.frontmatter.title}</h2>
                </Link>

                <span>{node.frontmatter.date}</span>

                {node.frontmatter.category.map((cat, index, arr) => (
                    <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
                ))}
            </div>
        </div>
    );
};

export default renderList;
