module.exports = config => {
  if (config.config.background) document.body.style.background = config.config.background
  if (config.config.backgroundsize) document.body.style.backgroundSize = config.config.backgroundsize
}