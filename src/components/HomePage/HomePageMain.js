// components/HomePage/HomePageMain.js
import React from 'react';
import { HeroImg, Whu, Statistics, Tips, Partnerships, Faqsection, ScrollButtons } from './HomePage';

const HomePage = () => {
  return (
    <>
      <HeroImg />
      <Whu />
      <Statistics />
      <Tips />
      <Partnerships />
      <Faqsection />
      <ScrollButtons />
    </>
  );
};

export default HomePage;
