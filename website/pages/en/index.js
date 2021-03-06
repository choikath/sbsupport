/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;



class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = (props) => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = (props) => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = (props) => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );


    return (
      <SplashContainer>

      <div className="inner">
        <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
        <PromoSection>
          <Button href="#library">Full Tip sheet Library</Button>
          <Button href={docUrl('scheduling.html')}>Outpatient Workflows</Button>
          <Button href={docUrl('sb.html')}>Switchboard Support</Button>
          <Button href={docUrl('sb.html')}>Inpatient Workflows</Button>

        </PromoSection>
      </div>

      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = (props) => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Library = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2 id="library">Tipsheet Library</h2>
        <MarkdownBlock>All Tipsheets</MarkdownBlock>
      </div>
    );

    const PatientSplash = () => (
      <Block id="try">
        {[
          {
            content:
              'Unique, patient and appointment-specific links ensure a secure, private telehealth visit ' +
              'and customized visit reminders, embedded text bot user support, and feedback surveys help create an accessible, easy-to-navigate experience.',
            image: `${baseUrl}img/patientview.png`,
            imageAlign: 'left',
            title: 'Patient-friendly with integrated user support',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'The Switchboard is a tool for providers to help them navigate across the methods for connecting with their patients (and families) virtually through a unique, patient-specific BlueJeans meeting.',
            image: `${baseUrl}img/favicon.png`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              'Our homegrown telemedicine platform is a seamless telehealth solution co-designed by our clinicians.  Custom integrations with video software, messaging features, and PennChart enable flexible, adaptable workflows. ',
            image: `${baseUrl}img/providerview.png`,
            imageAlign: 'right',
            title: 'Created, designed, and optimized for clinicians at Penn Medicine',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'This is the content of my feature',
            image: `${baseUrl}img/patientview.png`,
            imageAlign: 'top',
            title: 'Feature One',
          },
          {
            content: 'The content of my second feature',
            image: `${baseUrl}img/provider.png`,
            imageAlign: 'top',
            title: 'Feature Two',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter((user) => user.pinned)
        .map((user) => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = (page) =>
        baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">

          <LearnHow />
          <PatientSplash />
          <Library />

        </div>
      </div>
    );
  }
}

module.exports = Index;
