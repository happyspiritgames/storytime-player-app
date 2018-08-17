import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { getPublishedEditions } from '../../api/readerApi'
import Catalog from './Catalog'

@inject('EditionStore')
@observer
export default class Library extends Component {
  componentDidMount() {
    const { EditionStore } = this.props
    if (!EditionStore.editions || !EditionStore.editions.length) {
      getPublishedEditions((editions) => EditionStore.setEditions(editions),
        (error) => console.log(error))
    }
  }

  renderEmpty() {
    return (
      <div id="library">
        <h3>Loading...</h3>
        <p>Hold tight while I figure out what is available.</p>
        <p>If you see this message for more than a few seconds, maybe something is wrong. Lost your connection, perhaps? Or maybe it's us. Sorry about that.</p>
      </div>
    )
  }

  render() {
    const catalogEditions = this.props.EditionStore.editions
    if (!catalogEditions.length) {
      return (
        <div id="library">
          <p>Looks like the library is empty. Anybody want to publish a game?</p>
        </div>
      )
    }

    const play = () => {console.log('clicked play')}

    return (
      <div id="library">
        <h1>Welcome to the StoryTime Library.</h1>
        <h3>Find a story to play.</h3>
        <Catalog key='catalog' editions={catalogEditions} play={play} />
      </div>
    )
  }
}
