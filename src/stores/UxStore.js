import { observable } from 'mobx'

class UxStore {
  @observable statusMessage
}

export default new UxStore()
