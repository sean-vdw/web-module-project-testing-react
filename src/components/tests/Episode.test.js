import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


test("renders without error", () => {
  render(<Episode episode={{
    id: 1, 
    image: 'https://i.ibb.co/2FsfXqM/stranger-things.png', 
    name: 'The Monster', 
    season: 2, 
    number: 4, 
    summary: 'In this episode there is a scary monster...', 
    runtime: 51
  }}/>);
});

test("renders the summary test passed as prop", ()=>{});

test("renders default image when image is not defined", ()=>{});
