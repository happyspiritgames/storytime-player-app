import { observable, computed } from 'mobx'
import editionStore from './editionStore'

class ViewerStore {
  @observable inProgress = false
  @observable activeEditionKey
  @observable activeSceneId

  @computed
  get activeEdition() {
    if (this.activeEditionKey) {
      return editionStore.editionEdition(this.activeEditionKey)
    }
  }

  set activeEditionKey(key) {
    this.activeEditionKey = key
    if (!this.activeEdition()) {
      editionStore.loadEdition(this.activeEditionKey)
    }
  }

  @computed
  get activeScene() {
    return // FIXME losing steam...
  }
}

export default new ViewerStore()
