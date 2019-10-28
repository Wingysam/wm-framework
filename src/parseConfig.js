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