import { observable } from 'mobx'

class GamePlayerStore {
  @observable activeEditionKey
  @observable activeSceneId
}

export default new GamePlayerStore()
