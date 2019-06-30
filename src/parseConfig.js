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