import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Scene from './Scene'
import Signpost from './Signpost'

@inject('viewerStore')
@observer
export default class StoryBook extends Component {

  componentWillMount() {
    const { viewerStore, match } = this.props
    const { key } = match.params

    if (!key) {
      console.log('Not sure what to load; no edition key')
      return
    }

    viewerStore.activeEdition = key
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
    const edition = viewerStore.activeEdition
    const scene = viewerStore.activeScene

    if (!edition || !scene) {
      return this.renderNotReady('Loading...one moment please.')
    }

    const summary = edition.summary
    return (
      <div id="storybook">
        <h3 className="text-center">{summary.title}</h3>
        <h6 className="text-center"><em>by {summary.penName}</em></h6>
        <Scene activeScene={scene} />
        <Signpost scene={scene} />
      </div>
    )
  }
}