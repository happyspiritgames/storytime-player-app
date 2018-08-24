import { observable, computed, action } from 'mobx'
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

  @action
  loadEdition(editionKey) {
    this.isLoading = true
    return api.Stories.byKey(editionKey)
      .then(action(edition => this.editionMap.set(edition.editionKey, edition)))
      .finally(action(() => { this.isLoading = false }))
  }

  getEdition(key) {
    return this.editionMap.get(key)
  }

}

export default new EditionStore()
