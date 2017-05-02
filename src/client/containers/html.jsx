import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Html = ({ markup, initialState }) => {
  const head = Helmet.rewind();

  /* eslint-disable react/no-danger */
  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,user-scalable=0,initial-scale=1" />
        <script src="/assets/js/client.js" defer />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState=${initialState}` }} />
      </body>
    </html>
  );
  /* eslint-enable react/no-danger */
};

Html.propTypes = {
  markup: PropTypes.string.isRequired,
  initialState: PropTypes.string.isRequired,
};

export default Html;
