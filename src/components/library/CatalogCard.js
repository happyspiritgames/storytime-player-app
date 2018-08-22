import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, Button
} from 'reactstrap'
import { editionShape } from '../../metadata/dataShapes'

export default class CatalogCard extends Component {
  static propTypes = {
    edition: editionShape,
    onPlay: PropTypes.func.isRequired
  }

  render() {
    const { edition, onPlay } = this.props

    if (!edition) {
      return null
    }
    
    const { editionKey, summary } = edition
    const { title, penName, tagLine, about } = summary

    return (
      <Card key={editionKey}>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>by {penName}</CardSubtitle>
          <CardText><em>{tagLine}</em></CardText>
          <CardText>{about}</CardText>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={ () => onPlay(editionKey) }>Play</Button>
        </CardFooter>
      </Card>
    )
  }
}
