import { observable, computed, action } from 'mobx'
import editionStore from './editionStore'

class ViewerStore {
  @observable activeEditionKey
  @observable activeSceneId

  @computed
  get activeEdition() {
    if (this.activeEditionKey) {
      return editionStore.getEdition(this.activeEditionKey)
    }
  }

  set activeEdition(key) {
    this.activeEditionKey = key
    if (!this.activeEdition) {
      editionStore.loadEdition(this.activeEditionKey)
        .then(action(edition => {
          if (!edition) throw new Error('Touble finding story')
          console.log('loaded edition', edition)
          this.activeScene = edition.summary.firstSceneId
        }))
    }
  }

  @computed
  get activeScene() {
    if (this.activeEditionKey && this.activeSceneId) {
      return editionStore.getScene(this.activeEditionKey, this.activeSceneId)
    }
  }

  set activeScene(sceneId) {
    this.activeSceneId = sceneId
    if (!this.activeScene) {
      editionStore.loadScene(this.activeEditionKey, sceneId)
        .then(action(scene => {
          if (!scene) throw new Error('Scene not found')
          console.log('loaded scene', scene)
        }))
    }
  }

  @action
  play(key) {
    this.exit()
    this.activeEdition = key
  }

  @action
  replay() {
    this.activeScene = this.activeEdition.summary.firstSceneId
  }

  @action
  goToScene(sceneId) {
    this.activeScene = sceneId
  }

  @action
  exit() {
    this.activeEditionKey = undefined
    this.activeSceneId = undefined
  }
}

export default new ViewerStore()
