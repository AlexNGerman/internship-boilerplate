import React from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import ProjectList from 'features/Home/organisms/ProjectList';
import ProjectModal from 'features/Home/organisms/ProjectModal';

const Home = () => {
  return (
    <MainTemplate>
      <ProjectList />
      <ProjectModal />
    </MainTemplate>
  );
}

export default Home;
