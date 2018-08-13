import React from 'react';
import ReactDOM from 'react-dom';
import PlayerApp from './PlayerApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayerApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
