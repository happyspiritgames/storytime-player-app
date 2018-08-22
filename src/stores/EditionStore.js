import { observable, computed, action } from 'mobx'

class EditionStore {
  @observable isLoaded = false
  @observable editionsByKey = {}
  @observable recommended = []

  // TODO figure out helpful ways to sort

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

  set recommendations(recommendedEditions) {
    this.recommended = []
    recommendedEditions.forEach(edition => {
      this.editionsByKey[edition.editionKey] = edition
      this.recommended.push(edition.editionKey)
    })
  }
}

export default new EditionStore()
