import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import EditionStore from './stores/EditionStore';
import UxStore from './stores/UxStore';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import PlayerApp from './PlayerApp';

const Root = (
  <Provider EditionStore={EditionStore} UxStore={UxStore}>
    <PlayerApp />
  </Provider>
)
ReactDOM.render(Root, document.getElementById('root'));
