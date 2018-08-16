import React from 'react'
import StoryBook from './StoryBook';
import { sampleEdition, sampleScene } from '../../api'
import { observer } from 'mobx-react'

const callback = (msg) => {
  console.log(msg)
}

// const wrapper = (props) => {
//   const playStory = () => callback('called playStory')
//   const goToScene = () => callback('called goToScene')
//   return (
//     <StoryBook edition={edition} scene={scene} playStory={playStory} goToScene={goToScene} />
//   )
// }

const wrapper = observer((props) => {
  const playStory = () => callback('called playStory')
  const goToScene = () => callback('called goToScene')
  return (
    <StoryBook edition={sampleEdition} scene={sampleScene} playStory={playStory} goToScene={goToScene} />
  )
})

export default wrapper;
