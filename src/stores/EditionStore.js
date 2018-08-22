import { action, observable } from 'mobx'

class EditionStore {
  @observable editions = []
  @observable isLoaded = false

  @action
  setEditions = (replacements) => {
    this.editions = replacements
    this.isLoaded = true
    console.log('loaded %d editions', this.editions.length)
  }
}

export default new EditionStore()
