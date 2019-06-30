(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
require('./writers/votepopup')(config)
require('./writers/subtitle')(config)
require('./writers/badges')(config)
require('./writers/lists')(config)
require('./writers/title')({ worldInfo, config })
// End Writers

},{"./parseConfig":2,"./readers/custom":3,"./readers/worldInfo":4,"./writeHTML":5,"./writers/background":6,"./writers/badges":7,"./writers/custom":8,"./writers/lists":9,"./writers/subtitle":10,"./writers/title":11,"./writers/votepopup":12}],2:[function(require,module,exports){
function parseConfig (configText) {
  let config = {}
  let lists = []
  let mode = 'normal'
  let array = ''
  for (let line of configText.split('\n')) {
    line = line.trim()
    if (line.startsWith('@')) {
      mode = 'array'
      arrayName = line.substring(1)
      array = []
      continue
    }
    switch (mode) {
      case 'normal':
        if (!line) continue
        const split = line.split(' ')
        if (split.length < 2) continue
        config[split.shift().toLowerCase()] = split.join(' ')
        break
      case 'array':
        if (!line) {
          lists.push([ arrayName, array ])

          mode = 'normal'
          continue
        }
        array.push(line)
        break
    }
  }

  return { config, lists }
}

module.exports = parseConfig
},{}],3:[function(require,module,exports){
module.exports = {
  top: document.querySelector('div#custom-top'),
  middle: document.querySelector('div#custom-middle'),
  bottom: document.querySelector('div#custom-bottom')
}
},{}],4:[function(require,module,exports){
const worldInfo = {
  name: document.querySelector('title').textContent,
  customRules: {}
}

document.querySelector('div#spoiler')
  .innerHTML
  .split('<br>')
  .forEach(item => {
    const split = item.split(' : ')
    worldInfo.customRules[split[0]] = split[1]
  })

module.exports = worldInfo
},{}],5:[function(require,module,exports){
module.exports = () => {
  document.body.outerHTML = `
  <body>
    <style>
    </style>
    <section class="section">
      <div class="container">
        <div id="vote-modal" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="box has-text-centered">
              <span class="is-size-3">Please vote for us on BlockheadsFans!</span>
              <br>
              <a id="vote-modal-button" class="button is-primary is-large">Vote</a>
            </div>
          </div>
          <button id="vote-modal-close" class="modal-close is-large" aria-label="close"></button>
        </div>
        <div class="content">
          <div id="custom-top" class="is-hidden"></div>
          <h1 class="title">
            World
          </h1>
          <p class="subtitle is-hidden">
          Tag
          </p>
          <div id="tags" class="field is-grouped is-grouped-multiline"></div>
          <div id="custom-middle" class="is-hidden"></div>
          <div id="lists"></div>
          <div id="custom-bottom" class="is-hidden"></div>
        </div>
      </div>
    </section>
  </body>
  `
  
  document.querySelector('head').innerHTML = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
  <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
  `
}
},{}],6:[function(require,module,exports){
module.exports = config => {
  if (config.config.background) document.body.style.background = config.config.background
  if (config.config.backgroundsize) document.body.style.backgroundSize = config.config.backgroundsize
}
},{}],7:[function(require,module,exports){
module.exports = config => {
  function addBadge (label, value) {
    const control = document.createElement('div')
    control.classList.add('control')
  
    const tags = document.createElement('div')
    tags.classList.add('tags', 'has-addons')
    control.appendChild(tags)
  
    const labelTag = document.createElement('span')
    labelTag.textContent = label
    labelTag.classList.add('tag', 'is-dark')
    tags.appendChild(labelTag)
  
    const valueTag = document.createElement('span')
    valueTag.textContent = value
    valueTag.classList.add('tag', 'is-info')
    tags.appendChild(valueTag)
  
    document.querySelector('#tags').appendChild(control)
  }
  
  if (config.config.bhfans) {
    const split = config.config.bhfans.split(' ')
    const id = split.shift()
    const label = split.join(' ')
    fetch(`https://wm.bh.wingysam.xyz/bhfans/${id}`)
      .then(res => res.text())
      .then(res => addBadge(label || 'Votes', res))
  }
  
  if (config.config.wingy) {
    const split = config.config.wingy.split(' ')
    const id = split.shift()
    const label = split.join(' ')
    fetch(`https://block.wingysam.xyz/api/worlds/${id}/players`)
      .then(res => res.text())
      .then(res => addBadge(label || 'Online', res))
  }
}
},{}],8:[function(require,module,exports){
module.exports = custom => {
  if (custom.top) {
    const element = document.querySelector('#custom-top')
    element.innerHTML = custom.top.innerHTML
    element.classList.remove('is-hidden')
  }

  if (custom.middle) {
    const element = document.querySelector('#custom-middle')
    element.innerHTML = custom.middle.innerHTML
    element.classList.remove('is-hidden')
  }

  if (custom.bottom) {
    const element = document.querySelector('#custom-bottom')
    element.innerHTML = custom.bottom.innerHTML
    element.classList.remove('is-hidden')
  }
}
},{}],9:[function(require,module,exports){
module.exports = config => {
  function addList (listName, list) {
    const div = document.createElement('div')
  
    const h2 = document.createElement('h2')
    h2.textContent = listName
    div.appendChild(h2)
  
    const ul = document.createElement('ul')
    div.appendChild(ul)
  
    for (const item of list) {
      const li = document.createElement('li')
      li.textContent = item
      ul.appendChild(li)
    }
  
    document.querySelector('#lists').appendChild(div)
  }
  
  config.lists.forEach(list => addList(list[0], list[1]))
}
},{}],10:[function(require,module,exports){
module.exports = config => {
  document.querySelector('.subtitle').textContent = config.config.tag
  if (config.config.tag) document.querySelector('.subtitle').classList.remove('is-hidden')
}
},{}],11:[function(require,module,exports){
module.exports = ({ worldInfo, config }) => {
  const title = document.querySelector('.title')
  if (config.config.worldname === 'off') title.classList.add('is-hidden')
  title.textContent = worldInfo.name
  if (config.config.worldname) title.textContent = config.config.worldname
}
},{}],12:[function(require,module,exports){
const LAST_VOTED_LOCALSTORAGE_ID = 'wm-framework.lastVoted'

function promptToVote (id) {
  const voteModal = document.querySelector('#vote-modal')

  document.querySelector('#vote-modal-button')
    .addEventListener('click', () => {
      localStorage.setItem(LAST_VOTED_LOCALSTORAGE_ID, new Date())
      window.location.href = `http://blockheadsfans.com/servers/vote.php?id=${id}`
    })

  voteModal.classList.add('is-active')

  document.querySelector('#vote-modal-close')
    .addEventListener('click', () => {
      voteModal.classList.remove('is-active')
    })
}

module.exports = config => {
  if (!config.config.votepopup) return

  const lastVoted = localStorage.getItem(LAST_VOTED_LOCALSTORAGE_ID)
  
  if (!lastVoted) promptToVote(config.config.votepopup)

  const lastVotedDate = Date.parse(lastVoted)

  const date = new Date()

  date.setHours(date.getHours() - 6)

  if (lastVotedDate > date) return

  promptToVote(config.config.votepopup)
}
},{}]},{},[1]);
