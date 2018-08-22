import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { 
  Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, Button
} from 'reactstrap'
import { editionShape } from '../../metadata/dataShapes'

class CatalogCard extends Component {
  static propTypes = {
    edition: editionShape
  }

  render() {
    const { edition, history } = this.props
    if (!edition) {
      return null
    }
    
    const { editionKey, summary } = edition
    const { title, penName, tagLine, about } = summary
    const handlePlay = () => history.push(`/storybook/${editionKey}`)

    return (
      <Card key={editionKey}>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>by {penName}</CardSubtitle>
          <CardText><em>{tagLine}</em></CardText>
          <CardText>{about}</CardText>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={handlePlay}>Play</Button>
        </CardFooter>
      </Card>
    )
  }
}

export default withRouter(CatalogCard)
