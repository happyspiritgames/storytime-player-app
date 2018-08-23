import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container } from 'reactstrap'
import Catalog from './Catalog'

@inject('EditionStore')
@observer
export default class Library extends Component {

  componentDidMount() {
    console.log('Library.componentDidMount')
    const { EditionStore } = this.props
    if (!EditionStore.hasFetchedEditions) {
      EditionStore.fetchEditions()
    }
  }

  renderFetching() {
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
    const { EditionStore } = this.props

    if (!EditionStore.hasFetchedEditions) {
      return this.renderFetching()
    }
    
    return (
      <Container id="library">
        <h1>Welcome to the StoryTime Library.</h1>
        <h3>Find a story to play.</h3>
        <Catalog key='catalog' editions={EditionStore.editions} />
      </Container>
    )
  }
}
