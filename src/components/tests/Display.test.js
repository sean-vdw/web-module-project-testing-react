import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import { testShow } from './Show.test';
import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

test('renders without errors with no props', ()=>{
  render(<Display/>);
});

test('renders Show component when the button is clicked ', async ()=>{
  fetchShow.mockResolvedValueOnce(testShow);

  render(<Display/>);
  const button = screen.getByRole('button');
  userEvent.click(button);

  const showContainer = await screen.findByTestId('show-container');
  expect(showContainer).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
  fetchShow.mockResolvedValueOnce(testShow);

  render(<Display/>);
  const button = screen.getByRole('button');
  userEvent.click(button);

  const seasons = await screen.findAllByTestId('season-option');
  expect(seasons).toHaveLength(3);
});

test('test to see if displayFunc is called after the button is clicked', async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  const mockGetData = jest.fn();

  render(<Display displayFunc={mockGetData}/>);
  const button = screen.getByRole('button');
  userEvent.click(button);

  await expect(mockGetData).toBeTruthy();
});
