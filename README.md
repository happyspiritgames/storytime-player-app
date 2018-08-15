# Happy Spirit Stories App

Working title for the StoryTime application for reading / playing interactive story-games.

## Overview

You can run locally using: `yarn start`

Tests run continuously with `yarn test`

Use `yarn build` to optimize javascript files and set up the latest changes in build.

Use `yarn deploy` to move the files under the build directory to my S3 bucket. 

This app relies on backing microservices, accessed by files under `src/api`

Local state is managed using...Redux or MobX?

## Project Plan

Basically this is a list of to-dos. Gotta track these somewhere.

* Get Reader working for The Mission.
  * Load page that fetches data from Reader API without CORS issues.
  * Try MobX for caching scenes, reader state
  * Make it look good.
* Get Library working against ReaderAPI.
  * Create new methods for filtering by genre, age rating, player rating, recommended list.
  * Make it look good and work well for sorting through 100 stories.
* Set up Admin page.
  * Set up AdminAPI
  * Get authentication working for admin role.
* Set up ClubhouseAPI with account access and update methods.
  * Re-implement account page in app.
  * Use auth for permission to edit own account information.
  * Implement email change.
  * Make it look good - the start of vanity profile. The "inside jacket cover."

## To Do List

* Write feature tests for pages and unit tests for components.
* Add tool for reformatting code on commits. (beautify? prettier?)
* Reimplement a page using TypeScript and see if it makes a difference
