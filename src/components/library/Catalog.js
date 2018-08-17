import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardGroup, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
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
          <Button color="primary" onClick={ () => {play(editionKey)} }>Play</Button>
        </CardBody>
      </Card>
    )
  }

  render() {
    const { editions } = this.props
    let cards
    if (editions) {
      cards = editions.map(edition => this.renderCard(edition.editionKey, edition.summary))
    } else {
      cards = []
    }
    return (
      <CardGroup>
        {cards}
      </CardGroup>
    )
  }
}