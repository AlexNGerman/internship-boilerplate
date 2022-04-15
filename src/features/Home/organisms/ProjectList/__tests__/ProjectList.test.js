import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
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
    it('user have project with task', async () => {
      render();

      await waitFor(() => {
        expect(screen.getByText('Project 1')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('task 1')).toBeInTheDocument();
      });
    });

    it('user don\'t have projects', async () => {
      server.use(getProjectsEmpty);

      render();

      await waitFor(() => {
        expect(screen.getByText('You don\'t have any projects yet')).toBeInTheDocument();
      });
    });

    it('user delete task', async () => {
      render();

      await waitFor(() => {
        expect(screen.getByTestId('deleteTask')).toBeInTheDocument();
      });

      userEvent.click(screen.getByTestId('deleteTask'))

      // await waitFor(() => {
      //   expect(screen.getByText('You don\'t have any tasks yet')).toBeInTheDocument();
      // }, {timeout: 3000});
    });
  })

})
