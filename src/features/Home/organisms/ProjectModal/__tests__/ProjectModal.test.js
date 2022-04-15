import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComponent from 'utils/tests/renderComponent';
import ProjectModal from 'features/Home/organisms/ProjectModal';

describe('ProjectModal', () => {
  const render = () => renderComponent(<ProjectModal/>);

  describe('with valid data', () => {
    it('calls handleClose() with correct params', async () => {
      render();

      userEvent.click(screen.getByTestId('open-project-modal'))
      userEvent.type(screen.getByTestId('title'), 'Project Title')
      userEvent.type(screen.getByTestId('description'), 'Project Description')
      userEvent.type(screen.getByTestId('deadline'), '02/15/2022 12:36 pm')
      userEvent.click(screen.getByTestId('submit'))

      await waitFor(() => {
        expect(screen.queryByTestId('project-modal')).toBeNull();
      }, {timeout: 3000});
    });
  })

  describe('with invalid data', () => {
    describe('with empty fields', () => {
      it('renders correct errors', async () => {
        render();

        userEvent.click(screen.getByTestId('open-project-modal'))
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Please enter title')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Please enter description')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Please enter deadline')).toBeInTheDocument()
        });
      });
    })

    describe('with too short title and description', () => {
      it('renders correct errors', async () => {
        render();

        userEvent.click(screen.getByTestId('open-project-modal'))
        userEvent.type(screen.getByTestId('title'), 'T')
        userEvent.type(screen.getByTestId('description'), 'D')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Title can\'t be less than 2 characters')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Description can\'t be less than 2 characters')).toBeInTheDocument()
        });
      });
    })

    describe('with too long title and description', () => {
      it('renders correct errors', async () => {
        render();

        userEvent.click(screen.getByTestId('open-project-modal'))
        userEvent.type(screen.getByTestId('title'), 'title title title title title title title title title title title title')
        userEvent.type(screen.getByTestId('description'), 'description description description description description description')
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Title can\'t be longer than 50 characters')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Description can\'t be longer than 50 characters')).toBeInTheDocument()
        });
      });
    })
  })

  describe('when user clicks on datepicker', () => {
    it('shows datepicker and select today date', async () => {
      render();

      userEvent.click(screen.getByTestId('open-project-modal'))

      await waitFor(() => {
        expect(screen.queryByText('Today')).toBeNull();
      });

      userEvent.click(screen.getByTestId('deadline'));

      await waitFor(() => {
        expect(screen.queryByText('Today')).toBeInTheDocument();
      });

      userEvent.click(screen.queryByText('Today'));

      await waitFor(() => {
        expect(screen.queryByText('Today')).toBeNull();
      }, {timeout: 3000});
    });
  });


})
