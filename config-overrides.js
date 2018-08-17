const rewireMobX = require('react-app-rewire-mobx')

module.exports = function overrides(config, env) {
  return rewireMobX(config, env)
}
