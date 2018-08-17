import { action, observable } from 'mobx'

class EditionStore {
  @observable editions = []

  @action
  setEditions = (replacements) => {
    this.editions = replacements
  }
}

export default new EditionStore()
