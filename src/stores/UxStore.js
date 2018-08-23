import { observable, action } from 'mobx'

class UxStore {
  @observable isLoading = false  // TODO manage separate status for each page
  @observable statusMessage

  @action setMessage(message) {
    this.statusMessage = message
  }
  
  @action clearMessage() {
    this.statusMessage = undefined
  }
  
  @action setIsLoading() {
    this.isLoading = true
  }
  
  @action clearIsLoading() {
    this.isLoading = false
  }
}

export default new UxStore()
