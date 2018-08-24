import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import editionStore from './stores/editionStore'
import viewerStore from './stores/viewerStore'
import uxStore from './stores/uxStore'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import PlayerApp from './PlayerApp'

const stores = {
  editionStore,
  viewerStore,
  uxStore
}

configure({ enforceActions: true })

ReactDOM.render((
  <Provider {...stores}>
    <BrowserRouter>
      <PlayerApp />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))
