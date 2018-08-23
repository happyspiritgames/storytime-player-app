import { observable, computed, action } from 'mobx'
import readerApi from '../api/readerApi'

class EditionStore {
  @observable lastFetchedRecommendationsAt = null
  @observable lastFetchedEditionsAt = null
  @observable recommended = []  // array of edition keys
  @observable status = 'ready'
  @observable editionsByKey = {}  // for easy lookup, prevent storing duplicates
  @observable activeEditionKey = null
  @observable activeSceneId = null

  @computed
  get hasFetchedRecommendations() {
    return !!this.lastFetchedRecommendationsAt
  }

  @action
  fetchRecommendations() {
    readerApi.getRecommendations(this.fetchRecommendationsSuccess, this.fetchRecommendationsError)
  }

  @action.bound
  fetchRecommendationsSuccess(recommendedIn) {
    this.recommended = []
    recommendedIn.forEach(toAdd => {
      this.editionsByKey[toAdd.editionKey] = toAdd
      this.recommended.push(toAdd.editionKey)
    })
    this.status = 'ready'
    this.lastFetchedRecommendationsAt = Date.now()
  }

  @action.bound
  fetchRecommendationsError(error) {
    console.error(error)
    this.status = 'ready'
  }

  @computed
  get hasRecommendations() {
    return this.recommended && this.recommended.length > 0
  }

  @computed
  get topRecommendation() {
    if (this.hasRecommendations) {
      return this.editionsByKey[this.recommended[0]]
    } else {
      return null
    }
  }

  @computed
  get hasFetchedEditions() {
    return !!this.lastFetchedEditionsAt
  }

  @action
  fetchEditions() {
    this.status = 'fetching'
    readerApi.getPublishedEditions(this.fetchEditionsSuccess, this.fetchEditionsError)
  }

  @action.bound
  fetchEditionsSuccess(editionsIn) {
    this.editionsByKey = {}
    editionsIn.forEach(toAdd => {
      this.editionsByKey[toAdd.editionKey] = toAdd
    })
    this.status = 'ready'
    this.lastFetchedEditionsAt = Date.now()
  }

  @action.bound
  fetchEditionsError(error) {
    console.error(error)
    this.status = 'ready'
  }

  @computed
  get editions() {
    return Object.values(this.editionsByKey)
  }

  @action
  loadRecommendations(recommendedEditions) {
    this.recommended = []
    recommendedEditions.forEach(edition => {
      this.editionsByKey[edition.editionKey] = edition
      this.recommended.push(edition.editionKey)
    })
  }

  @action
  loadEdition(edition) {
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

  @action
  loadScene(editionKey, scene) {
    if (!this.editionsByKey[editionKey]) {
      this.editionsByKey[editionKey] = {}
    }
    if (!this.editionsByKey[editionKey].scenes) {
      this.editionsByKey[editionKey].scenes = {}
    }
    this.editionsByKey[editionKey].scenes[scene.sceneId] = scene
  }

  @computed
  get activeEdition() {
    return this.editionsByKey[this.activeEditionKey]
  }

  @computed
  get activeScene() {
    if (this.activeEdition && this.activeEdition.scenes) {
      return this.activeEdition.scenes[this.activeSceneId]
    } else {
      return undefined
    }
  }

  @computed
  get hasActiveEdition() {
    return this.activeEditionKey 
      && this.editionsByKey[this.activeEditionKey] 
      && this.editionsByKey[this.activeEditionKey].summary
  }

  @computed
  get hasActiveScene() {
    return this.activeEditionKey && this.activeSceneId
      && this.editionsByKey[this.activeEditionKey] 
      && this.editionsByKey[this.activeEditionKey].scenes
      && this.editionsByKey[this.activeEditionKey].scenes[this.activeSceneId]
  }
}


export default new EditionStore()
