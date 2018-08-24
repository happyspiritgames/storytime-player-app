import { observable, computed, action } from 'mobx'
import readerApi from '../api/readerApi'

class EditionStore {
  @observable lastFetchedRecommendationsAt = null
  @observable lastFetchedEditionsAt = null
  @observable recommended = []  // array of edition keys
  @observable status = 'ready'
  @observable editionsByKey = {}  // for easy lookup, prevent storing duplicates
  
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

  set activeEditionKey(keyIn) {
    console.log('set active edition:', keyIn)
    this.activeEditionKey = keyIn
  }

  set activeSceneId(idIn) {
    console.log('set active scene:', idIn)
    this.activeSceneId = idIn
  }

  @action
  clearActiveStory() {
    this.activeEditionKey = undefined
    this.activeSceneId = undefined
  }

  @computed
  get hasActiveEdition() {
    if (!this.activeEditionKey) {
      console.log('no active edition key found')
      return false
    }
    return !!this.editionsByKey[this.activeEditionKey]
  }

  @action
  fetchActiveEdition() {
    readerApi.getEdition(this.fetchActiveEditionSuccess, this.fetchActiveEditionError)
  }

  @action.bound
  fetchActiveEditionSuccess(editionIn) {
    this.editionsByKey[editionIn.editionKey] = editionIn
  }

  @action.bound
  fetchActiveEditionError(error) {
    console.error(error)
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

  @action
  prepActiveScene() {

  }
}


export default new EditionStore()
