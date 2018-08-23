import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import CatalogCard from '../library/CatalogCard'

@inject('EditionStore')
@observer
export default class Recommendations extends Component {
  componentDidMount() {
    const { EditionStore } = this.props
    if (!EditionStore.hasFetchedRecommendations) {
      EditionStore.fetchRecommendations()
    }
  }

  render() {
    const { EditionStore } = this.props
    if (!EditionStore.hasRecommendations) {
      return null
    } else {
      return (
        <section id="recommended">
          <h2>Recommended</h2>
          <CatalogCard edition={EditionStore.topRecommendation} />
        </section>
      )
    }
  }
}
