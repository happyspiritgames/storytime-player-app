import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from 'reactstrap'
import FormattedProse from './FormattedProse'
import Signpost from './Signpost'
import { sceneShape, editionShape } from '../../metadata'

export default class StoryBook extends Component {
  static propTypes = {
    edition: editionShape,
    scene: sceneShape,
    playStory: PropTypes.func.isRequired,
    goToScene: PropTypes.func.isRequired
  }

  renderNotReady(message) {
    return (
      <div id="storybook">
        <h3 className="text-center">{message}</h3>
      </div>
    )
  }

  render() {
    const { edition, scene, goToScene, playStory } = this.props

    if (!edition) {
      return this.renderNotReady('Loading...one moment please.')
    } else if (!scene) {
      return this.renderNotReady('Please wait while we set the scene...this should only take a second or two.')
    }

    const summary = edition.summary
    // const push = this.props.history.push
    const playAgain = () => playStory(edition.editionKey)
    // const goToLibrary = () => { push('/library') }
    // const goToContact = () => { push('/contact') }

    return (
      <div id="storybook">
        <h3 className="text-center">{summary.title}</h3>
        <h6 className="text-center"><em>by {summary.penName}</em></h6>
        <Card>
          <CardHeader>{scene.title}</CardHeader>
          <CardBody>
            <FormattedProse prose={scene.prose} />
          </CardBody>
        </Card>
        <Signpost
          scene={scene}
          goToScene={goToScene}
          playAgain={playAgain}
        />
      </div>
    )
  }
}