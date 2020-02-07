import React, { Fragment } from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { buildSlug } from '../util';
import { colours } from '../styles/theme';

const BlogFeatured = () => {
    // eslint-disable-next-line
    const { markdownRemark } = useStaticQuery(query);
    const { slug } = markdownRemark.fields;
    const { title, date, category: categories, image } = markdownRemark.frontmatter;
    const imageSource = image.childImageSharp.fluid;

    return (
        <Wrapper>
            <ImageLink to={slug}>
                <Image fluid={imageSource} alt={title} />
            </ImageLink>

            <Info>
                <div>
                    <TitleLink to={slug}>
                        <FeaturedTitle>{title}</FeaturedTitle>
                    </TitleLink>

                    <Date>{date}</Date>

                    <Category>
                        {categories.map((cat, i, arr) => (
                            <Fragment key={i}>
                                <Link to={buildSlug('blog', cat)}>{cat}</Link>
                                {arr.length > i && arr.length - 1 !== i && <Separator>|</Separator>}
                            </Fragment>
                        ))}
                    </Category>
                </div>
            </Info>
        </Wrapper>
    );
};

export default BlogFeatured;

const Image = styled(Img)`
    transition: all 400ms ease-in-out;
    border-radius: 3px;
    display: block;
    width: 100%;
`;

const Separator = styled.span`
    display: inline-block;
    padding: 0 5px;
    color: ${colours.light};
`;

const Info = styled.div`
    flex: 1 1 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        margin-bottom: 20px;
        justify-content: left;
        align-items: flex-start;
    }
`;

const Link = styled(GatsbyLink)`
    text-decoration: none;
    border: 0;
`;

const TitleLink = styled(Link)`
    display: block;
    color: black;
`;

const ImageLink = styled(Link)`
    flex: 1 1 60%;
    display: block;
`;

const FeaturedTitle = styled.h1`
    font-size: 2.2rem;
    margin-bottom: 5px;
`;

const Date = styled.p`
    &:after {
        content: '';
        width: 10px;
        display: inline-block;
        margin-left: 10px;
        position: relative;
        top: -2px;
        border-top: 1px solid ${colours.light};
    }
    color: ${colours.grey};
    margin-bottom: 0px;
    display: inline-block;
    margin-right: 10px;
    letter-spacing: 2px;
    font-size: 0.7rem;
`;

const Category = styled.p`
    color: ${colours.grey};
    margin-bottom: 0px;
    display: inline-block;
    margin-right: 10px;
    letter-spacing: 2px;
    font-size: 0.7rem;
    text-transform: lowercase;
`;

const Wrapper = styled.article`
    margin-bottom: 50px;
    align-self: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-bottom: 50px;
    border-bottom: 1px solid ${colours.borders};
    @media (max-width: 768px) {
        margin-bottom: 30px;
        flex-direction: column-reverse;
        padding-bottom: 0;
        border: 0;
    }
`;

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
                ...BlogImage
            }
        }
    }
`;
