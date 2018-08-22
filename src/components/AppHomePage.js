import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap'
import { getRecommendations } from '../api/readerApi'
import { withRouter } from 'react-router-dom'
import CatalogCard from './library/CatalogCard'

@inject('EditionStore')
@observer
class AppHomePage extends Component {

  componentDidMount() {
    const { EditionStore } = this.props
    if (!EditionStore.hasRecommendations) {
      getRecommendations(
        (editions) => EditionStore.recommendations = editions,
        (error) => console.log(error)
      )
    }
  }

  render() {
    const { history, EditionStore } = this.props
    const handleNavClick = (destination) => history.push(destination)

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
                    onClick={() => handleNavClick('/library')}
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
              {EditionStore.hasRecommendations && 
                <CatalogCard edition={EditionStore.topRecommendation} onPlay={() => {console.log('clicked play')}} />
              }
              {!EditionStore.hasRecommendations &&
                <p>Please wait while we find something good...</p>
              }
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

export default withRouter(AppHomePage)
