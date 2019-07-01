module.exports = config => {
  if (config.config.music) {
    let playing = false;
    window.addEventListener('touchstart', () => {
      if (playing) return
      const audio = new Audio(config.config.music)
      audio.loop = true
      audio.play()
      playing = true
    })
  }
}