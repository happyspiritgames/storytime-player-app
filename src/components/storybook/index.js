import React from 'react'
import StoryBook from './StoryBook';
import { edition, scene } from '../../api'

const callback = (msg) => {
  console.log(msg)
}

const wrapper = (props) => {
  const playStory = () => callback('called playStory')
  const goToScene = () => callback('called goToScene')
  return (
    <StoryBook edition={edition} scene={scene} playStory={playStory} goToScene={goToScene} />
  )
}

export default wrapper;
