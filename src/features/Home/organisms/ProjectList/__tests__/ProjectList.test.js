import React, { Fragment } from 'react';
import {screen, waitFor} from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import renderComponent from 'utils/tests/renderComponent';
import ProjectList from 'features/Home/organisms/ProjectList';
import { server, getProjectsEmpty } from 'utils/tests';

describe('ProjectList', () => {
  const render = () => renderComponent(
    <Router>
      <ProjectList />
    </Router>
  );

  describe('with valid data', () => {
    it('user have project with tasks', async () => {
      render();

      await waitFor(() => {
        expect(screen.getByText('Project 1')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('task 1')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('task 2')).toBeInTheDocument();
      });
    });

    it('user don\'t have projects', async () => {
      server.use(getProjectsEmpty);

      render();

      await waitFor(() => {
        expect(screen.getByText('You don\'t have any projects yet')).toBeInTheDocument();
      });
    });
  })
})
