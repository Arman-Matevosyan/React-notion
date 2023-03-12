import React from 'react';

const NotFound = () => {
  return (
    <div data-testid="not-found">
      <h3>No data found.</h3>
      <div> Make sure the pageId is valid.</div>
      <div>Only public pages are supported in this example.</div>
    </div>
  );
};

export default NotFound;
