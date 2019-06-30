const worldInfo = require('./readers/worldInfo')

const parseConfig = require('./parseConfig')

const config = parseConfig(document.querySelector("script[type='config']").textContent)
console.log(config)

// Readers
const customDivs = require('./readers/custom')
// End Readers

require('./writeHTML')()

// Writers
require('./writers/background')(config)
require('./writers/custom')(customDivs)
require('./writers/subtitle')(config)
require('./writers/badges')(config)
require('./writers/lists')(config)
require('./writers/title')({ worldInfo, config })
// End Writers
