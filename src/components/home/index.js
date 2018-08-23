import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import { withRouter, Link } from 'react-router-dom'
import Recommendations from './Recommendations'

class AppHomePage extends Component {
  render() {
    const { history } = this.props
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
                    color="warning"
                    size="large"
                    onClick={() => history.push('/library')}
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
              <Recommendations />
            </Col>
            <Col>
              <section id="about">
                <h2>About</h2>
                <p>Happy Spirit Stories is great place to <Link to='/library'>find interest stories</Link> with multiple possible outcomes. You can play story-games, and you can <Link to="/projects">write and share your own.</Link></p>
                <p>Everything here is free. Also, we are not going to bother you with ads. Enjoy, and share us with your friends!</p>
              </section>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(AppHomePage)
