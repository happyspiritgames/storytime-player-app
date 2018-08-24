import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import CatalogCard from '../library/CatalogCard'

@inject('editionStore')
@observer
export default class Recommendations extends Component {
  componentDidMount() {
    const { editionStore } = this.props
    if (!editionStore.hasFetchedRecommendations) {
      editionStore.fetchRecommendations()
    }
  }

  render() {
    const { editionStore } = this.props
    if (!editionStore.hasRecommendations) {
      return null
    } else {
      return (
        <section id="recommended">
          <h2>Recommended</h2>
          <CatalogCard edition={editionStore.topRecommendation} />
        </section>
      )
    }
  }
}
