import { observable, computed, action } from 'mobx'
import api from '../api'

class EditionStore {
  @observable isLoading = false
  @observable lastFetchedRecommendationsAt = null
  @observable lastFetchedEditionsAt = null
  @observable recommended = []
  @observable editionCache = observable.map()
  @observable sceneCache = observable.map()

  @action loadRecommendations() {
    this.isLoading = true
    return api.Stories.recommendations()
      .then(action(recommendations => {
        this.recommended = []
        recommendations.forEach(recommendation => {
          this.editionCache.set(recommendation.editionKey, recommendation)
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
      return this.editionCache.get(this.recommended[0])
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
        covers.forEach(edition => this.editionCache.set(edition.editionKey, edition))
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
    this.editionCache.forEach(edition => {out.push(edition)})
    return out
  }

  getEdition(key) {
    return this.editionCache.get(key)
  }

  getScene(editionKey, sceneId) {
    let scene
    const editionScenes = this.sceneCache.get(editionKey)
    if (editionScenes) {
      scene = editionScenes.get(sceneId)
    }
    return scene
  }

  @action
  loadEdition(editionKey) {
    const cachedEdition = this.getEdition(editionKey)
    if (cachedEdition) {
      return Promise.resolve(cachedEdition)
    }
    this.isLoading = true
    return api.Stories.byKey(editionKey)
      .then(action(edition => {
        this.editionCache.set(edition.editionKey, edition)
        return edition
      }))
      .finally(action(() => { this.isLoading = false }))
  }

  @action
  loadScene(editionKey, sceneId) {
    if (!this.sceneCache.has(editionKey)) {
      this.sceneCache.set(editionKey, observable.map())
    }
    const editionScenes = this.sceneCache.get(editionKey)
    const cachedScene = editionScenes.get(sceneId)
    if (cachedScene) {
      return Promise.resolve(cachedScene)
    }
    this.isLoading = true
    return api.Stories.scene(editionKey, sceneId)
      .then(action(scene => {
        let editionScenes = this.sceneCache.get(editionKey)
        editionScenes.set(sceneId, scene)
        return scene
      }))
      .finally(action(() => { this.isLoading = false }))
  }
}

export default new EditionStore()
