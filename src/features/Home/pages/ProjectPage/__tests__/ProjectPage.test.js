import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useNavigate, MemoryRouter as Router} from 'react-router-dom';
import renderComponent from 'utils/tests/renderComponent';
import ProjectPage from 'features/Home/pages/ProjectPage';
import {ROUTES} from 'constants/routes';

describe('ProjectPage', () => {
  const render = () => renderComponent(<ProjectPage />);
  const navigate = jest.fn();

  describe('with valid data', () => {
    it('shows project with task and description', async () => {
      render();

      await waitFor(() => {
        expect(screen.getByText('Project 1')).toBeInTheDocument();
      }, {timeout: 3000});

      await waitFor(() => {
        expect(screen.getByText('task 1')).toBeInTheDocument();
      }, {timeout: 3000});

      await waitFor(() => {
        expect(screen.queryByText('Project 1 with description', {exact: false})).toBeInTheDocument();
      }, {timeout: 3000});
    });
  });

  describe('when user clicks on delete project button', () => {
    it('redirects to home page', async () => {
      useNavigate.mockReturnValue(navigate);
      render();

      await waitFor(() => {
        expect(screen.getByTestId('delete-project')).toBeInTheDocument();
      }, {timeout: 3000})

      userEvent.click(screen.getByTestId('delete-project'));

      await waitFor(() => {
        expect(navigate).toBeCalledTimes(1);
      });

      await waitFor(() => {
        expect(navigate).toBeCalledWith(ROUTES.HOME);
      }, {timeout: 3000});
    });
  })
});
