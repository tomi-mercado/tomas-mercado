import React from 'react';

import SectionContainer from './SectionContainer';
import UnderlinedText from './UnderlinedText';

const ProjectsSection: React.FC = () => {
  return (
    <SectionContainer>
      <h3 className="text-3xl">
        <UnderlinedText>Projects</UnderlinedText>
      </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, aperiam
        nisi? Delectus voluptates quia, officia atque dolor voluptatibus rerum
        deleniti exercitationem molestias perferendis doloribus necessitatibus
        mollitia vel impedit optio saepe!
      </p>
      <button className="btn btn-primary">Go to Projects</button>
    </SectionContainer>
  );
};

export default ProjectsSection;
