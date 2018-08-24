import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Scene from './Scene'
import Signpost from './Signpost'

@inject('viewerStore')
@observer
export default class StoryBook extends Component {

  componentWillMount() {
    const { viewerStore, match } = this.props
    const { editionKey } = match.params

    if (!editionKey) {
      console.log('Not sure what to load; no edition key')
      return
    }

    viewerStore.activeEditionKey = editionKey
  }

  renderNotReady(message) {
    return (
      <div id="storybook">
        <h3 className="text-center">{message}</h3>
      </div>
    )
  }

  render() {
    const { viewerStore } = this.props
    const activeEdition = viewerStore.activeEdition
    const activeScene

    if (!activeEdition || !activeScene) {
      return this.renderNotReady('Loading...one moment please.')
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