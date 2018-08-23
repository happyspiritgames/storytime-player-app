import { observable, computed, action } from 'mobx'

class EditionStore {
  @observable editionsByKey = {}  // for easy lookup, prevent storing duplicates
  @observable recommended = []  // array of edition keys
  @observable activeEditionKey = null
  @observable activeSceneId = null

  // TODO figure out helpful ways to sort

  @computed get activeEdition() {
    return this.editionsByKey[this.activeEditionKey]
  }

  @computed get activeScene() {
    if (this.activeEdition && this.activeEdition.scenes) {
      return this.activeEdition.scenes[this.activeSceneId]
    } else {
      return undefined
    }
  }

  @computed get hasActiveEdition() {
    return this.activeEditionKey 
      && this.editionsByKey[this.activeEditionKey] 
      && this.editionsByKey[this.activeEditionKey].summary
  }

  @computed get hasActiveScene() {
    return this.activeEditionKey && this.activeSceneId
      && this.editionsByKey[this.activeEditionKey] 
      && this.editionsByKey[this.activeEditionKey].scenes
      && this.editionsByKey[this.activeEditionKey].scenes[this.activeSceneId]
  }

  @computed get editions() {
    return Object.values(this.editionsByKey)
  }

  @action loadEditions(replacements) {
    replacements.forEach(toReplace => {
      this.editionsByKey[toReplace.editionKey] = toReplace
    })
    this.isLoaded = true
  }

  @computed get hasRecommendations() {
    return this.recommended && this.recommended.length > 0
  }

  @computed get topRecommendation() {
    if (this.hasRecommendations) {
      return this.editionsByKey[this.recommended[0]]
    } else {
      return null
    }
  }

  @action loadRecommendations(recommendedEditions) {
    this.recommended = []
    recommendedEditions.forEach(edition => {
      this.editionsByKey[edition.editionKey] = edition
      this.recommended.push(edition.editionKey)
    })
  }

  @action loadEdition(edition) {
    let scenes
    if (this.editionsByKey[edition.editionKey] 
        && this.editionsByKey[edition.editionKey].scenes) {
      scenes = this.editionsByKey[edition.editionKey].scenes
    }
    this.editionsByKey[edition.editionKey] = edition
    if (scenes) {
      this.editionsByKey[edition.editionKey].scenes = scenes
    }
  }

  @action loadScene(editionKey, scene) {
    if (!this.editionsByKey[editionKey]) {
      this.editionsByKey[editionKey] = {}
    }
    if (!this.editionsByKey[editionKey].scenes) {
      this.editionsByKey[editionKey].scenes = {}
    }
    this.editionsByKey[editionKey].scenes[scene.sceneId] = scene
  }
}

export default new EditionStore()
