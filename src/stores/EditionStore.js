import { observable } from 'mobx'

class EditionStore {
  @observable isLoaded = false
  @observable editionsByKey = {}
  @observable recommended = []

  // TODO figure out helpful ways to sort

  get editions() {
    return Object.values(this.editionsByKey)
  }

  set editions(replacements) {
    replacements.forEach(edition => {
      this.editionsByKey[edition.editionKey] = edition
    });
    this.editions = replacements
    this.isLoaded = true
    console.log('loaded %d editions', this.editions.length)
  }

  get hasRecommendations() {
    return this.editions && this.editions.length > 0
  }

  get topRecommendation() {
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
