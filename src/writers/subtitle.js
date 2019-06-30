module.exports = config => {
  document.querySelector('.subtitle').textContent = config.config.tag
  if (config.config.tag) document.querySelector('.subtitle').classList.remove('is-hidden')
}