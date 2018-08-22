import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'
import { getPublishedEditions } from '../../api/readerApi'
import Catalog from './Catalog'

@inject('EditionStore')
@observer
class Library extends Component {
  componentDidMount() {
    const { EditionStore } = this.props
    if (!EditionStore.editions || !EditionStore.editions.length) {
      getPublishedEditions((editions) => EditionStore.setEditions(editions),
        (error) => console.log(error))
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
    const { history, EditionStore } = this.props

    const catalogEditions = EditionStore.editions
    if (!catalogEditions.length) {
      return this.renderEmpty()
    }

    const play = (editionKey) => history.push(`/storybook/${editionKey}`)

    return (
      <Container id="library">
        <h1>Welcome to the StoryTime Library.</h1>
        <h3>Find a story to play.</h3>
        <Catalog key='catalog' editions={catalogEditions} play={play} />
      </Container>
    )
  }
}

export default withRouter(Library)
