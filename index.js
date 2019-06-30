
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

const config = parseConfig(document.querySelector("script[type='config']").textContent)
console.log(config)

const customTop = document.querySelector('div#custom-top')
const customMiddle = document.querySelector('div#custom-middle')
const customBottom = document.querySelector('div#custom-bottom')

document.body.outerHTML = `
<body>
  <style>
  </style>
  <section class="section">
    <div class="container">
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

if (customTop) {
  const element = document.querySelector('#custom-top')
  element.innerHTML = customTop.innerHTML
  element.classList.remove('is-hidden')
}

if (customMiddle) {
  const element = document.querySelector('#custom-middle')
  element.innerHTML = customMiddle.innerHTML
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
if (config.config.worldname === 'off') title.classList.add('is-hidden')
title.textContent = worldInfo.name
if (config.config.worldname) title.textContent = config.config.worldname

document.querySelector('.subtitle').textContent = config.config.tag
if (config.config.tag) document.querySelector('.subtitle').classList.remove('is-hidden')

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
  fetch(`https://wm.bh.wingysam.xyz/bhfans/${config.config.bhfans}`)
    .then(res => res.text())
    .then(res => addBadge('BHFans', res))
}

if (config.config.wingy) {
  fetch(`https://block.wingysam.xyz/api/worlds/${config.config.wingy}/players`)
    .then(res => res.text())
    .then(res => addBadge('Online', res))
}

config.lists.forEach(list => addList(list[0], list[1]))

if (config.config.background) document.body.style.background = config.config.background
if (config.config.backgroundsize) document.body.style.backgroundSize = config.config.backgroundsize

window.onerror = function(message, source, lineno, colno, error) { alert(message) }