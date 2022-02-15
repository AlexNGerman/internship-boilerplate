import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComponent from 'utils/tests/renderComponent';
import ProjectModal from 'features/Home/organisms/ProjectModal';

describe('Create Project', () => {
  const render = () => renderComponent(<ProjectModal />);
  const handleClose = jest.fn();

  describe('with valid data', () => {
    it('calls handleClose() with correct params', async () => {
      render();

      userEvent.click(screen.getByTestId('openModal'))
      userEvent.type(screen.getByTestId('title'), 'Project Title')
      userEvent.type(screen.getByTestId('description'), 'Project Description')
      userEvent.type(screen.getByPlaceholderText(/Deadline/i), '02/15/2022 12:36 pm')
      userEvent.click(screen.getByTestId('submit'))


      await waitFor(() => {
        expect(handleClose).toBeCalledTimes(1);
      });
    });
  })
})
