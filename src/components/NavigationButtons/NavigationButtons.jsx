import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const NavigationButtons = ({
  navigatePrevious,
  navigateNext,
  canGoPrevious,
  canGoNext,
  currentPage,
  totalPages
}) => {
  return (
    <>
      <Button
        aria-label="previous"
        size="small"
        variant="contained"
        onClick={navigatePrevious}
        disabled={!canGoPrevious}
        disableElevation
      >
        <ArrowBackIosIcon fontSize="inherit" />
        Previous
      </Button>

      <div>
        {currentPage} / {totalPages}
      </div>

      <Button
        aria-label="next"
        size="small"
        variant="contained"
        onClick={navigateNext}
        disabled={!canGoNext}
        disableElevation
      >
        Next
        <ArrowForwardIosIcon fontSize="inherit" />
      </Button>
    </>
  );
};
