import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardDeck, Row } from 'reactstrap'
import CatalogCard from './CatalogCard'
import { editionShape } from '../../metadata/dataShapes'

export default class Catalog extends Component {
  static propTypes = {
    editions: PropTypes.arrayOf(editionShape)
  }

  renderRow(editions, rowCount) {
    const cards = editions.map(edition => 
      <CatalogCard key={edition.editionKey} edition={edition} />)

    return (
      <div key={rowCount}>
        <Row>
          {cards}
        </Row>
        <Row>&nbsp;</Row>
      </div>
    )
  }

  render() {
    const { editions } = this.props
    let rows = []

    if (!editions) {
      return null
    }

    let rowCount = 0
    let last = editions.length
    let next = 0
    while (next < last) {
      rows.push(this.renderRow(editions.slice(next,  next + 3), rowCount++))
      next += 3
    }
    return (
      <CardDeck>
        {rows}
      </CardDeck>
    )
  }
}