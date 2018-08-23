const sampleEdition = {
  "editionKey": "2exsllwu-2",
  "storyId": "2exsllwu",
  "version": "2",
  "summary": {
    "title": "The Mission",
    "penName": "The Happy Spirit",
    "tagLine": "The life of a secret agent is hard. That's why you love it. (Click to play.)",
    "about": "You and only you can retrieve the Golden Bars and complete the mission. It is too late now to go back, but why would you?  You are a top agent of a secret spy organization, and you never walk away from a job. Today is no different.",
    "firstSceneId": "u1pawmxp"
  },
  "rating": "G",
  "publishedAt": "2018-04-13T00:07:56.482Z",
  "genre": [
    "adventure",
    "fantasy"
  ]
}

const sampleScene = {
  "sceneId": "u1pawmxp",
  "title": "Your Mission",
  "prose": "You are 10 years old.  You are no ordinary 10-year-old.  You are a trusted agent of an elite spy network, and you are on a mission to recover the Golden Bars from a high-security warehouse in a location that you know only too well.  The Supreme Commander has equipped you with a handful of coins and notes that are used by the locals of this region to exchange for valuables.  Your mission is to enter the warehouse, locate the Golden Bars, bribe the security guard, and return to Headquarters.\nShould you be captured in pursuit of your mission, there is no telling what foul consequences await you.  It is best not to be seen.  Your knack for blending in and ability to disappear in a whisper are, without a doubt, why you were chosen for this mission.\nAs you dismount the stairs that lead from Headquarters to the main street, you face your first decision.  Should you head down the street toward your objective or sneak around to the back and take the Forgotten Trail?",
  "endPrompt": "What would you like to do? (Click or tap one of the choices below.)",
  "signpost": [
    {
      "sceneId": "jpgqwhq1",
      "teaser": "Use the Forgotten Trail behind Headquarters so that you are less likely to be seen."
    },
    {
      "sceneId": "s96t9bzl",
      "teaser": "Play it cool, and walk directly toward the location where the Golden Bars were last spotted."
    }
  ]
}

export default {
  loadEditions, loadEdition, loadScene, loadEditionScene, sampleEdition, sampleScene
}
