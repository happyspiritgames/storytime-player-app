import { observable } from 'mobx'

const editionStore = observable({
  editions: [],
  currentEdition: null
})

export default editionStore
