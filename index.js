
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

function parseConfig (configText) {
  let config = {}
  let mode = 'normal'
  let array = ''
  for (let line of configText.split('\n')) {
    line = line.trim()
    if (line.startsWith('@')) {
      mode = 'array'
      array = line.substring(1).toLowerCase()
      config[array] = []
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
          mode = 'normal'
          continue
        }
        config[array].push(line)
        break
    }
  }

  return config
}

const config = parseConfig(document.querySelector("script[type='config']").textContent)
console.log(config)

const customTop = document.querySelector('div#custom-top')
const customBottom = document.querySelector('div#custom-bottom')

document.body.outerHTML = `
<body>
  <style>
  </style>
  <section class="section">
    <div class="container">
      <div class="content">
        <h1 class="title">
          World
        </h1>
        <p class="subtitle is-hidden">
        Tag
        </p>
        <div id="custom-top" class="is-hidden"></div>
        <div id="rules" class="is-hidden">
          <h2>Rules</h2>
          <ul></ul>
        </div>
        <div id="admins" class="is-hidden">
          <h2>Admins</h2>
          <ul></ul>
        </div>
        <div id="mods" class="is-hidden">
          <h2>Mods</h2>
          <ul></ul>
        </div>
        <div id="custom-bottom" class="is-hidden"></div>
      </div>
    </div>
  </section>
</body>
`

if (customTop) {
  const element = document.querySelector('#custom-top')
  element.innerHTML = customTop.innerHTML
  element.classList.remove('is-hidden')
}

if (customBottom) {
  const element = document.querySelector('#custom-bottom')
  element.innerHTML = customBottom.innerHTML
  element.classList.remove('is-hidden')
}

document.querySelector('head').innerHTML = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
`

const title = document.querySelector('.title')
if (config.worldname === 'off') title.classList.add('is-hidden')
title.textContent = worldInfo.name
if (config.worldname) title.textContent = config.worldname

document.querySelector('.subtitle').textContent = config.tag
if (config.tag) document.querySelector('.subtitle').classList.remove('is-hidden')

addList(config.rules, document.querySelector('#rules > ul'))
addList(config.admins, document.querySelector('#admins > ul'))
addList(config.mods, document.querySelector('#mods > ul'))

function addList (list, ul) {
  if (list && Array.isArray(list)) {
    for (const item of list) {
      const li = document.createElement('li')
      li.textContent = item
      ul.appendChild(li)
    }
    ul.parentElement.classList.remove('is-hidden')
  }
}

if (config.background) document.body.style.background = config.background
if (config.backgroundsize) document.body.style.backgroundSize = config.backgroundsize
