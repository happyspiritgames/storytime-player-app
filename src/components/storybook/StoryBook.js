import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Signpost from './Signpost'
import { getEdition, getEditionScene } from '../../api/readerApi'

@inject('EditionStore')
@inject('UxStore')
@observer
export default class StoryBook extends Component {

  componentWillMount() {
    const { EditionStore, UxStore } = this.props
    const { editionKey, sceneId } = this.props.match.params

    EditionStore.activeEditionKey = editionKey
    EditionStore.activeSceneId = sceneId

    const handleError = (label, error) => {
      console.error(label, error)
    }

    if (!EditionStore.hasActiveEdition) {
      getEdition(editionKey, 
        (data) => EditionStore.loadEdition(data),
        (error) => handleError('failure loading edition', error)
      )
    }
    if (!EditionStore.hasActiveScene) {
      getEditionScene(editionKey, 'u1pawmxp',
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
    const { EditionStore, UiState } = this.props
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