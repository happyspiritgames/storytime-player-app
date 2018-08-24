import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import CatalogCard from '../library/CatalogCard'

@inject('editionStore')
@observer
export default class Recommendations extends Component {
  componentDidMount() {
    const { editionStore } = this.props
    if (!editionStore.hasRecommendations) {
      editionStore.loadRecommendations()
    }
  }

  render() {
    const { editionStore } = this.props
    let message
    if (!editionStore.hasRecommendations) {
      if (editionStore.isLoading) {
        message = <p>Looking for something you will like.</p>
      } else {
        message = <p>I guess you will have to check out the library.</p>
      }
    }
    return (
      <section id="recommended">
        <h2>Recommended</h2>
        {message}
        <CatalogCard edition={editionStore.topRecommendation} />
      </section>
    )
  }
}
