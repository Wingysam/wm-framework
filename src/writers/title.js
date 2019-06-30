module.exports = ({ worldInfo, config }) => {
  const title = document.querySelector('.title')
  if (config.config.worldname === 'off') title.classList.add('is-hidden')
  title.textContent = worldInfo.name
  if (config.config.worldname) title.textContent = config.config.worldname
}