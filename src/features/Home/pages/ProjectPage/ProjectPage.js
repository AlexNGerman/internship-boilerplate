import React from 'react';
import {useQuery} from 'urql';
import {useParams} from 'react-router-dom'
import {CircularProgress} from '@mui/material';
import MainTemplate from 'components/templates/MainTemplate';
import {GET_PROJECT} from 'queries/Project/getProject';
import ProjectHeader from 'features/Home/organisms/ProjectHeader';
import Project from 'features/Home/organisms/Project';

const ProjectPage = () => {
  const {id} = useParams();
  const [{data, fetching}] = useQuery({
    query: GET_PROJECT,
    variables: {id},
  });
  const project = !fetching && data?.project;
  return (
    <MainTemplate header={project && <ProjectHeader project={project} />}>
      {fetching && <CircularProgress color='primary' />}
      {project
        ?
        <>
          <Project key={project.id} project={project} single />
        </>
        :
        <p>Project not found</p>}
    </MainTemplate>
  );
}

export default ProjectPage;
