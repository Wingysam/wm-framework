const worldInfo = require('./readers/worldInfo')

const parseConfig = require('./parseConfig')

const config = parseConfig(document.querySelector("script[type='config']").textContent)
console.log(config)

// Readers
const customDivs = require('./readers/custom')
// End Readers

require('./writeHTML')()

// Tasks
require('./tasks/music')(config)
// End Tasks

// Writers
require('./writers/worldnamefont')(config)
require('./writers/background')(config)
require('./writers/custom')(customDivs)
require('./writers/votepopup')(config)
require('./writers/subtitle')(config)
require('./writers/badges')(config)
require('./writers/lists')(config)
require('./writers/title')({ worldInfo, config })
// End Writers
