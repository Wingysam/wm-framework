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