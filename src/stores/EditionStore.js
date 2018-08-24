import { observable, computed, action } from 'mobx'
import readerApi from '../api/readerApi'
import api from '../api'

class EditionStore {
  @observable isLoading = false
  @observable lastFetchedRecommendationsAt = null
  @observable lastFetchedEditionsAt = null
  @observable recommended = []
  @observable editionMap = observable.map()

  @action loadRecommendations() {
    this.isLoading = true
    return api.Stories.recommendations()
      .then(action(recommendations => {
        this.recommended = []
        recommendations.forEach(recommendation => {
          this.editionMap.set(recommendation.editionKey, recommendation)
          this.recommended.push(recommendation.editionKey)
        })
        this.lastFetchedRecommendationsAt = Date.now()
      }))
      .finally(action(() => { this.isLoading = false }))
  }

  @computed
  get hasRecommendations() {
    return this.lastFetchedRecommendationsAt
      && this.recommended
      && this.recommended.length > 0
  }

  @computed
  get topRecommendation() {
    if (this.hasRecommendations) {
      return this.editionMap.get(this.recommended[0])
    } else {
      return null
    }
  }

  @action
  loadEditions() {
    this.isLoading = true
    return api.Stories.all()
      .then(action(covers => {
        this.recommended = []
        covers.forEach(edition => this.editionMap.set(edition.editionKey, edition))
        this.lastFetchedEditionsAt = Date.now()
      }))
      .finally(action(() => { this.isLoading = false }))
  }

  @computed
  get editionsAreLoaded() {
    return !!this.lastFetchedEditionsAt
  }

  @computed
  get editions() {
    const out = []
    this.editionMap.forEach(edition => {out.push(edition)})
    return out
  }

  // FIXME below here vvvvv

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
    return !!this.editionMap[this.activeEditionKey]
  }

  @action
  fetchActiveEdition() {
    readerApi.getEdition(this.fetchActiveEditionSuccess, this.fetchActiveEditionError)
  }

  @action.bound
  fetchActiveEditionSuccess(editionIn) {
    this.editionMap[editionIn.editionKey] = editionIn
  }

  @action.bound
  fetchActiveEditionError(error) {
    console.error(error)
  }

  @computed
  get activeEdition() {
    return this.editionMap[this.activeEditionKey]
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
