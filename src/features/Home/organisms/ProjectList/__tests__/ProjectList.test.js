import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import renderComponent from 'utils/tests/renderComponent';
import ProjectList from 'features/Home/organisms/ProjectList';
import { server, getProjectsEmpty } from 'utils/tests';

describe('ProjectList', () => {
  const render = () => renderComponent(<ProjectList />);

  describe('with valid data', () => {
    it('shows project with task', async () => {
      render();

      await waitFor(() => {
        expect(screen.getByText('Project 1')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('task 1')).toBeInTheDocument();
      });
    });

    it('shows project list without projects', async () => {
      server.use(getProjectsEmpty);

      render();

      await waitFor(() => {
        expect(screen.getByText('You don\'t have any projects yet')).toBeInTheDocument();
      });
    });
  })
})
