import React from 'react';
import { Link } from 'gatsby';
import { AaTwoLineLogo } from './../../icons/AaTwoLineLogo';

export const Homepage = (props) => {
  const title = props.title || 'Training';
  const startPresentationSlug = props.startPresentationSlug;

  return (
    <div className="homepage">
      <div className="content-slide">
        <AaTwoLineLogo className="main-logo" />

        <h1>{title}</h1>

        <div>
          <Link to={startPresentationSlug}>Start Presentation</Link>
        </div>
      </div>
    </div>
  );
};
