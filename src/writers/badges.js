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