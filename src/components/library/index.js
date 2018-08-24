import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container } from 'reactstrap'
import Catalog from './Catalog'

@inject('editionStore')
@observer
export default class Library extends Component {

  componentDidMount() {
    const { editionStore } = this.props
    if (!editionStore.editionsAreLoaded) {
      editionStore.loadEditions()
    }
  }

  renderLoading() {
    return (
      <Container id="library">
        <h1>Welcome to the StoryTime Library.</h1>
        <h3>Loading...</h3>
        <p>Hold tight while we find some stories to play.</p>
        <p>If you see this message for more than a few seconds, maybe something is wrong. Lost your connection, perhaps? Or maybe it's us. Sorry about that.</p>
      </Container>
    )
  }

  render() {
    const { editionStore } = this.props
    const content = editionStore.editionsAreLoaded
      ? <Catalog key='catalog' editions={editionStore.editions} />
      : this.renderLoading()

    return (
      <Container id="library">
        <h1>Welcome to the StoryTime Library.</h1>
        {content}
      </Container>
    )
  }
}
