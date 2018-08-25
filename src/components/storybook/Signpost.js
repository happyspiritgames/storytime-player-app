import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Sign from './Sign'
import { sceneShape } from '../../metadata'

const DEFAULT_PROMPT = 'What would you like to do?'
const DEFAULT_ENDING_PROMPT = 'The End'

@inject('viewerStore')
@observer
class Signpost extends Component {
  static propTypes = {
    scene: sceneShape,
    goToContact: PropTypes.func,
    goToLibrary: PropTypes.func
  }

  render() {
    const { scene, viewerStore, history } = this.props
    const { endPrompt, signpost } = scene

    const playAgain = () => { viewerStore.replay() }
    const goToLibrary = () => { history.push('/library') }
    
    let signs
    let prompt
    if (signpost) {
      prompt = endPrompt || DEFAULT_PROMPT
      signs = signpost.map(sign => {
        let signKey = `${sign.sceneId}|${sign.teaser}`
        return (
          <Sign
            key={signKey}
            onClick={() => { viewerStore.goToScene(sign.sceneId) }}
            text={sign.teaser}
            icon='flash'
          />)
      })
    } else {
      prompt = endPrompt || DEFAULT_ENDING_PROMPT
      signs = [
        <Sign
          key='replay'
          onClick={playAgain}
          text='Play again'
          icon='refresh'
        />,
        <Sign
          key='library'
          onClick={goToLibrary}
          text='Find another'
          icon='search'
        />
      ]
    }
    return (
      <div className="card">
        <div className="card-header prompt">
          <h5 className="mb-0">{prompt}</h5>
        </div>
        <div className="card-body">
          <div className="list-group">
            {signs}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Signpost)
