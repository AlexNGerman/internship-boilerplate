import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComponent from 'utils/tests/renderComponent';
import TaskModal from 'features/Home/organisms/TaskModal';

describe('TaskModal', () => {
  const render = () => renderComponent(<TaskModal/>);

  describe('with valid data', () => {
    it('calls handleClose() with correct params', async () => {
      render();

      userEvent.click(screen.getByTestId('open-modal'))
      userEvent.type(screen.getByTestId('content'), 'Task Description')
      userEvent.click(screen.getByTestId('submit'))

      await waitFor(() => {
        expect(screen.queryByTestId('task-modal')).toBeNull();
      }, {timeout: 3000});
    });
  })

  describe('with invalid data', () => {
    describe('with empty fields', () => {
      it('renders correct errors', async () => {
        render();

        userEvent.click(screen.getByTestId('open-modal'))
        userEvent.type(screen.getByTestId('content'), '')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Please enter your content')).toBeInTheDocument()
        });
      });
    })

    describe('with too short content', () => {
      it('renders correct errors', async () => {
        render();

        userEvent.click(screen.getByTestId('open-modal'))
        userEvent.type(screen.getByTestId('content'), 'D')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText(`Content can't be less than 2 characters`)).toBeInTheDocument()
        });
      });
    })

    describe('with too long content', () => {
      it('renders correct errors', async () => {
        render();

        userEvent.click(screen.getByTestId('open-modal'))
        userEvent.type(screen.getByTestId('content'), 'content content content content content content content content ')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText(`Content can't be longer than 50 characters`)).toBeInTheDocument()
        });
      });
    })
  })
})
