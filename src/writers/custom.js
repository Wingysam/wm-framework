module.exports = custom => {
  if (custom.top) {
    const element = document.querySelector('#custom-top')
    element.innerHTML = custom.top.innerHTML
    element.classList.remove('is-hidden')
  }

  if (custom.middle) {
    const element = document.querySelector('#custom-middle')
    element.innerHTML = custom.middle.innerHTML
    element.classList.remove('is-hidden')
  }

  if (custom.bottom) {
    const element = document.querySelector('#custom-bottom')
    element.innerHTML = custom.bottom.innerHTML
    element.classList.remove('is-hidden')
  }
}