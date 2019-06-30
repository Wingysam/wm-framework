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