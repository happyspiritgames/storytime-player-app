import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import PlayerApp from './PlayerApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PlayerApp />, document.getElementById('root'));
registerServiceWorker();
