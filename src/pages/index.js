import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../layouts/homeLayout';
import SEO from '../components/seo';
import Intro from '../components/intro';
import Work from '../components/work';
import Projects from '../components/projects';
import Contact from '../components/contact';
import Section from '../components/homepageSection';

const Home = ({ data }) => {
    const { intro, title, work, contact, projects } = data.homeJson;

    return (
        <Layout>
            <SEO title={title} keywords={[`gatsby`, `react`, 'portfolio']} />
            <Section sectionName={intro.heading} titleAlign='right'>
                <Intro title={intro.title} name={intro.name} summary={intro.summary} />
            </Section>
            <Section sectionName={work.heading} titleAlign='left'>
                <Work items={work.items} />
            </Section>
            <Section sectionName={projects.heading} titleAlign='right'>
                <Projects
                    text={projects.text}
                    ctas={[projects.cta_1, projects.cta_2]}
                    links={[projects.link_1, projects.link_2]}
                />
            </Section>
            <Section sectionName={contact.heading} titleAlign='left'>
                <Contact text={contact.text} email={contact.email} cta={contact.email_cta} />
            </Section>
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
                text
                email
                email_cta
            }
            projects {
                heading
                text
                cta_1
                cta_2
                link_1
                link_2
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
