import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  CardDeck, Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, Button, Row 
} from 'reactstrap'
import { editionShape } from '../../metadata/dataShapes'

export default class Catalog extends Component {
  static propTypes = {
    editions: PropTypes.arrayOf(editionShape),
    play: PropTypes.func.isRequired
  }

  renderCard(editionKey, summary) {
    const { play } = this.props
    const { title, penName, tagLine, about } = summary
      /*
        Put this under card, above card-body when story cover image is supported.
        <img className="card-img-top w-100 d-block" alt={title} />
      */
    return (
      <Card key={editionKey}>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>by {penName}</CardSubtitle>
          <CardText><em>{tagLine}</em></CardText>
          <CardText>{about}</CardText>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={ () => play(editionKey) }>Play</Button>
        </CardFooter>
      </Card>
    )
  }

  renderRow(editions) {
    const cards = editions.map(edition => this.renderCard(edition.editionKey, edition.summary))
    // TODO find a way to separate rows verically without having to add extra row
    return (
      <div>
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

    let next = 0
    while (editions[next]) {
      rows.push(this.renderRow(editions.slice(next, next + 3)))
      next += 3
    }
    return (
      <CardDeck>
        {rows}
      </CardDeck>
    )
  }
}