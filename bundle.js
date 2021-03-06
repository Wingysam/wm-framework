(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./parseConfig":2,"./readers/custom":3,"./readers/worldInfo":4,"./tasks/music":5,"./writeHTML":6,"./writers/background":7,"./writers/badges":8,"./writers/custom":9,"./writers/lists":10,"./writers/subtitle":11,"./writers/title":12,"./writers/votepopup":13,"./writers/worldnamefont":14}],2:[function(require,module,exports){
function parseConfig (configText) {
  let config = {}
  let lists = []
  let mode = 'normal'
  let array = ''
  let arrayName = ''
  let arrayArgs = []
  for (let line of configText.split('\n')) {
    line = line.trim()
    if (line.startsWith('@')) {
      mode = 'array'
      const arrayText = line.substring(1).split('/')
      arrayName = arrayText.shift()
      arrayArgs = arrayText
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
          lists.push({ name: arrayName, array, args: arrayArgs })

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
module.exports = config => {
  if (config.config.music) {
    let playing = false;
    window.addEventListener('touchstart', () => {
      if (playing) return
      const audio = new Audio(config.config.music)
      audio.loop = true
      audio.play()
      playing = true
    })
  }
}
},{}],6:[function(require,module,exports){
module.exports = () => {
  document.body.outerHTML = `
  <body>
    <style>
      @font-face {
        font-family: "blockheads";
        src: url("http://theblockheads.net/fonts/BlockheadsFont-Regular.ttf");
      }
    </style>
    <section class="section">
      <div class="container">
        <div id="vote-modal" class="modal">
          <div id="vote-modal-background" class="modal-background"></div>
          <div class="modal-content">
            <div class="box has-text-centered">
              <span id="vote-modal-message" class="is-size-3"></span>
              <br>
              <a id="vote-modal-button" class="button is-primary is-large">Vote</a>
            </div>
          </div>
          <button id="vote-modal-close" class="modal-close is-large" aria-label="close"></button>
        </div>
        <div class="content">
          <div id="custom-top" class="is-hidden"></div>
          <h1 class="title"></h1>
          <p class="subtitle is-hidden"></p>
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
},{}],7:[function(require,module,exports){
module.exports = config => {
  if (config.config.background) document.body.style.background = config.config.background
  if (config.config.backgroundsize) document.body.style.backgroundSize = config.config.backgroundsize
}
},{}],8:[function(require,module,exports){
module.exports = config => {
  function addBadge ({ label, value, link }) {
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

    if (link) {
      tags.addEventListener('click', () => {
        window.location.href = link
      })
    }
  
    document.querySelector('#tags').appendChild(control)
  }
  
  if (config.config.bhfans) {
    const split = config.config.bhfans.split(' ')
    const id = split.shift()
    const label = split.join(' ')
    fetch(`https://wm.bh.wingysam.xyz/bhfans/${id}`)
      .then(res => res.text())
      .then(votes => addBadge({
        label: label || 'Votes',
        value: votes,
        link: `http://blockheadsfans.com/servers/vote.php?id=${id}`
      }))
  }
  
  if (config.config.wingy) {
    const split = config.config.wingy.split(' ')
    const id = split.shift()
    const label = split.join(' ')
    fetch(`https://block.wingysam.xyz/api/worlds/${id}/players`)
      .then(res => res.text())
      .then(online => addBadge({
        label: label || 'Online',
        value: online
      }))
  }
}
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
module.exports = config => {
  function addList (listName, list, password, passwordText) {
    const div = document.createElement('div')
  
    const h2 = document.createElement('h2')
    h2.textContent = listName
    div.appendChild(h2)
  
    const ul = document.createElement('ul')
  
    for (const item of list) {
      const li = document.createElement('li')
      li.textContent = item
      ul.appendChild(li)
    }

    if (password) {
      const a = document.createElement('a')
      const linkText = (passwordText ? ' ' + passwordText : ' [tap to view]')
      a.textContent = linkText
      a.addEventListener('click', () => {
        const pass = prompt('Password')
        if (password === pass) {
          div.appendChild(ul)
          a.parentElement.removeChild(a)
        } else {
          a.textContent = ' [incorrect]'
          setTimeout(() => { a.textContent = linkText }, 1000)
        }
      })
      h2.appendChild(a)
    } else div.appendChild(ul)
  
    document.querySelector('#lists').appendChild(div)
  }
  
  config.lists.forEach(list => addList(list.name, list.array, list.args[0], list.args[1]))
}
},{}],11:[function(require,module,exports){
module.exports = config => {
  document.querySelector('.subtitle').textContent = config.config.tag
  if (config.config.tag) document.querySelector('.subtitle').classList.remove('is-hidden')
}
},{}],12:[function(require,module,exports){
module.exports = ({ worldInfo, config }) => {
  const title = document.querySelector('.title')
  if (config.config.worldname === 'off') title.classList.add('is-hidden')
  title.textContent = worldInfo.name
  if (config.config.worldname) title.textContent = config.config.worldname
}
},{}],13:[function(require,module,exports){
const LAST_VOTED_LOCALSTORAGE_ID = 'wm-framework.lastVoted'

function promptToVote (id, message) {
  document.querySelector('#vote-modal-message')
    .textContent = message

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

  document.querySelector('#vote-modal-background')
    .addEventListener('click', () => {
      voteModal.classList.remove('is-active')
    })
}

module.exports = config => {
  if (!config.config.votepopup) return

  const split = config.config.votepopup.split(' ')
  const id = split.shift()
  const message = split.join(' ') || 'Please vote for us on BlockheadsFans!'

  const lastVoted = localStorage.getItem(LAST_VOTED_LOCALSTORAGE_ID)
  
  if (!lastVoted) promptToVote(id, message)

  const lastVotedDate = Date.parse(lastVoted)

  const date = new Date()

  date.setHours(date.getHours() - 6)

  if (lastVotedDate > date) return

  promptToVote(id, message)
}
},{}],14:[function(require,module,exports){
module.exports = config => {
  const title = document.querySelector('.title')

  switch (config.config.worldnamefont) {
    case 'bh':
        title.style.fontFamily = 'blockheads'
      break
    default:
      break
  }
}
},{}]},{},[1]);
