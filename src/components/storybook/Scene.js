import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import FormattedProse from './FormattedProse'

export default class Scene extends Component {
  render() {
    const { activeScene } = this.props
    return (
      <Card>
        <CardHeader>{activeScene.title}</CardHeader>
        <CardBody>
          <FormattedProse prose={activeScene.prose} />
        </CardBody>
      </Card>
    )
  }
}
