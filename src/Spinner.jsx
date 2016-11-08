/* eslint-disable max-len */
import React from 'react';

/*
 * React component for Vimeo Loading Spinner created and rendered.
 * SVG Path is used for creating the spinner.
 */
export default React.createClass({
  displayName: 'Spinner',

  render() {
    return (
      <div className='vimeo-loading'>
        <svg
          height='32'
          viewBox='0 0 32 32'
          width='32'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4'
            opacity='.25' />
          <path d='M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z' />
        </svg>
      </div>
    );
  }
});
