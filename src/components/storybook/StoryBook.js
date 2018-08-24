import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Scene from './Scene'
import Signpost from './Signpost'
import readerApi from '../../api/readerApi'

@inject('EditionStore')
@observer
export default class StoryBook extends Component {

  componentWillMount() {
    const { EditionStore, match } = this.props
    const { editionKey } = match.params

    if (!editionKey) {
      console.log('Not sure what to load; no edition key')
      return
    }

    EditionStore.activeEditionKey = editionKey
    EditionStore.prepScene(editionKey)

    ///// FIXME pick up here

    const handleError = (label, error) => {
      console.error(label, error)
    }

    if (editionKey && !EditionStore.hasActiveEdition) {
      EditionStore.fetchActiveEdition()
    }

    if (!EditionStore.hasActiveScene) {
      readerApi.getEditionScene(editionKey, 'u1pawmxp',
        (data) => EditionStore.loadScene(editionKey, data),
        (error) => handleError('failure', error)
      )
    }
  }

  renderNotReady(message) {
    return (
      <div id="storybook">
        <h3 className="text-center">{message}</h3>
      </div>
    )
  }

  render() {
    const { EditionStore } = this.props
    const { hasActiveEdition, activeEdition, hasActiveScene, activeScene } = EditionStore

    if (!hasActiveEdition) {
      return this.renderNotReady('Loading...one moment please.')
    } else if (!hasActiveScene) {
      return this.renderNotReady('Please wait while we set the scene...this should only take a second or two.')
    }

    const summary = activeEdition.summary
    return (
      <div id="storybook">
        <h3 className="text-center">{summary.title}</h3>
        <h6 className="text-center"><em>by {summary.penName}</em></h6>
        <Scene scene={activeScene} />
        <Signpost scene={activeScene} />
      </div>
    )
  }
}