import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

export const testShow = {
  image: 'https://www.coverwhiz.com/uploads/tv/the-inbetweeners-series-1_v2.jpg',
  name: 'The Inbetweeners',
  seasons: [
    {id: 1, name: 'Season 1', episodes: []},
    {id: 2, name: 'Season 2', episodes: []},
    {id: 3, name: 'Season 3', episodes: []}
  ],
  summary: 'The exploits of four friends, who are socially only marginally above what one of them calls "the freaks", are presented as they grow from their late teen years into adults and as they go on their quest, usually unsuccessfully, for such grown up things as beer and sex.'
}

test('renders without errors', ()=>{
  render(<Show show={testShow} selectedSeason={'none'}/>);
});

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} selectedSeason={'none'}/>);
  const loadingText = screen.getByText(/fetching data.../i);
  expect(loadingText).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', async ()=>{
  render(<Show show={testShow} selectedSeason={'none'}/>);
  const options = await screen.findAllByTestId('season-option');
  expect(options).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
  render(<Show show={testShow} selectedSeason={'none'}/>);
  const optionsBox = screen.getByTestId('season-selector');
  userEvent.selectOptions(optionsBox, '2');
  expect(screen.getByRole('option', {name: 'Season 2'}).selected).toBe(true);
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const { rerender } = render(<Show show={testShow} selectedSeason={'none'}/>);
  let episodesContainer = screen.queryByTestId('episodes-container');
  expect(episodesContainer).not.toBeInTheDocument();

  rerender(<Show show={testShow} selectedSeason={'2'}/>);
  episodesContainer = screen.queryByTestId('episodes-container');
  expect(episodesContainer).toBeInTheDocument();
});
