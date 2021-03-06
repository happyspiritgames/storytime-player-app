const readerServiceRoot = "https://178t795984.execute-api.us-west-2.amazonaws.com/latest"

const getRecommendations = (handleResponse, handleError) => {
  fetch(`${readerServiceRoot}/recommendations`)
    .then(res => res.json())
    .then(editions => handleResponse(editions))
    .catch(err => handleError(err))
}

const getPublishedEditions = (handleResponse, handleError) => {
  fetch(`${readerServiceRoot}/stories`)
    .then(res => res.json())
    .then(editions => handleResponse(editions))
    .catch(err => handleError(err))
}

const getEdition = (editionKey, handleResponse, handleError) => {
  fetch(`${readerServiceRoot}/stories/${editionKey}`)
    .then(res => res.json())
    .then(edition => handleResponse(edition))
    .catch(err => handleError(err))
}

const getEditionScene = (editionKey, sceneKey, handleResponse, handleError) => {
  fetch(`${readerServiceRoot}/stories/${editionKey}/scenes/${sceneKey}`)
    .then(res => res.json())
    .then(scene => handleResponse(scene))
    .catch(err => handleError(err))
}

export default {
  getRecommendations, getPublishedEditions, getEdition, getEditionScene
}