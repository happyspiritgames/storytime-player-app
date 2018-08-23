import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container } from 'reactstrap'
import * as action from '../../api'
import Catalog from './Catalog'

@inject('EditionStore')
@inject('UxStore')
@observer
export default class Library extends Component {

  componentDidMount() {
    const { EditionStore, UxStore } = this.props
    if (!EditionStore.editions.length) {
      action.loadEditions(EditionStore, UxStore)
    }
  }

  renderEmpty() {
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
    const { EditionStore, UxStore } = this.props
    console.log('edition store', EditionStore)

    if (!EditionStore.editions.length) {
      return this.renderEmpty()
    }
    
    const userMessage = (UxStore.message) ? <p>{UxStore.message}</p> : undefined
    if (UxStore.message)
    
    return (
      <Container id="library">
        <h1>Welcome to the StoryTime Library.</h1>
        <h3>Find a story to play.</h3>
        {userMessage}
        <Catalog key='catalog' editions={EditionStore.editions} />
      </Container>
    )
  }
}
