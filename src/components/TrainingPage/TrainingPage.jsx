import React from 'react';
import Paper from '@mui/material/Paper';
import { Helmet } from 'react-helmet';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { NavigationButtons } from '../NavigationButtons/NavigationButtons';
import { SlidePage } from '../SlidePage/SlidePage';

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

const TrainingPage = (props) => {
  const { body, prevSlug, nextSlug, title, currentPageIndex, numOfPages, type } = props?.pageContext;

  const { navigatePrevious, navigateNext, canGoPrevious, canGoNext } = useKeyboardNavigation(prevSlug, nextSlug);

  return (
    <div className="training-page">
      <Helmet title={title} />
      <Paper elevation={4} className="navigation-buttons-container">
        <NavigationButtons
          navigatePrevious={navigatePrevious}
          navigateNext={navigateNext}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          currentPage={currentPageIndex}
          totalPages={numOfPages}
        />
      </Paper>

      {/* FIXME If type === indexing use another compoent. and check for other types*/}
      {type === 'content' ? <SlidePage body={body} /> : <SlidePage body={body} />}
    </div>
  );
};

export default TrainingPage;
