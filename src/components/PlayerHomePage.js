import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap';

export default class PlayerHomePage extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Welcome to Happy Spirit Stories</h1>
                <p>Pick a story to play. Then choose your destiny one scene at a time.</p>
                <p>When you are ready to tell your story, join the club, and become an author.</p>
                <p>
                  <Button
                    tag="a"
                    color="success"
                    size="large"
                    href="http://reactstrap.github.io"
                    target="_blank"
                  >
                    Enter the Library
                  </Button>
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <section id="recommended">
                <h2>Recommended</h2>
                <Card>
                  <CardImg top width="100%" src="./assets/treehouse-318x180.png" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>The Mission</CardTitle>
                    <CardSubtitle>by Bubba Gump</CardSubtitle>
                    <CardText>Live the life of a 10-year-old who is sent on a dangerous mission to retrieve the golden bars. Will you make the right choices?</CardText>
                    <Button>Play</Button>
                  </CardBody>
                </Card>
              </section>
            </Col>
            <Col>
              <section id="about">
                <h2>About</h2>
                <p>Happy Spirit Stories is great place to <a href="/library">find interest stories</a> with multiple possible outcomes. You can play story-games, and you can <a href="/projects">write and share your own.</a></p>
                <p>Everything here is free. Also, we are not going to bother you with ads. Enjoy, and share us with your friends!</p>
              </section>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
