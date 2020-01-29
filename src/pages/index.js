import React from 'react';
import { graphql } from 'gatsby';

import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Intro from '../components/intro';
import Work from '../components/work';
import Projects from '../components/projects';
import Contact from '../components/contact';
import HomepageSection from '../components/homepageSection';

const Home = ({ data }) => {
    const { intro, title, work, contact } = data.homeJson;

    return (
        <Layout>
            <SEO title={title} keywords={[`gatsby`, `react`, 'portfolio']} />
            <HomepageSection sectionName={intro.heading} titleAlign='right'>
                <Intro title={intro.title} name={intro.name} summary={intro.summary} />
            </HomepageSection>
            <HomepageSection sectionName={work.heading} titleAlign='left'>
                <Work items={work.items} />
            </HomepageSection>
            <HomepageSection sectionName='projects.' titleAlign='right'>
                <Projects />
            </HomepageSection>
            <HomepageSection sectionName={contact.heading} titleAlign='left'>
                <Contact />
            </HomepageSection>
        </Layout>
    );
};

export const query = graphql`
    query {
        homeJson {
            title
            intro {
                heading
                title
                summary
                name
            }
            work {
                heading
                items {
                    title
                    link
                    logo {
                        publicURL
                    }
                }
            }
            contact {
                heading
            }
        }
    }
`;

Home.propTypes = {
    data: PropTypes.shape({
        homeJson: PropTypes.object.isRequired,
    }),
};

export default Home;
