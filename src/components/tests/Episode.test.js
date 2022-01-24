import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
  id: 1, 
  image: 'https://i.ibb.co/2FsfXqM/stranger-things.png', 
  name: 'The Monster', 
  season: 2, 
  number: 4, 
  summary: 'In this episode there is a scary monster...', 
  runtime: 51
};

test("renders without error", () => {
  render(<Episode episode={testEpisode}/>);
});

test("renders the summary test passed as prop", ()=>{
  render(<Episode episode={testEpisode}/>);
  const summary = screen.getByText(/in this episode there is a scary monster.../i);
  expect(summary).toBeInTheDocument();
  expect(summary).toBeVisible();
  expect(summary).toHaveTextContent(/in this episode there is a scary monster.../i);
});

test("renders default image when image is not defined", ()=>{
  render(<Episode episode={{
    id: 1, 
    image: null, 
    name: 'The Monster', 
    season: 2, 
    number: 4, 
    summary: 'In this episode there is a scary monster...', 
    runtime: 51
  }}/>);

  const imgUrl = screen.getByRole('img');
  expect(imgUrl).toHaveAccessibleName('https://i.ibb.co/2FsfXqM/stranger-things.png');
});
