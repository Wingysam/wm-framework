module.exports = config => {
  function addList (listName, list, password, passwordText) {
    const div = document.createElement('div')
  
    const h2 = document.createElement('h2')
    h2.textContent = listName
    div.appendChild(h2)
  
    const ul = document.createElement('ul')
  
    for (const item of list) {
      const li = document.createElement('li')
      li.textContent = item
      ul.appendChild(li)
    }

    if (password) {
      const a = document.createElement('a')
      const linkText = (passwordText ? ' ' + passwordText : ' [tap to view]')
      a.textContent = linkText
      a.addEventListener('click', () => {
        const pass = prompt('Password')
        if (password === pass) {
          div.appendChild(ul)
          a.parentElement.removeChild(a)
        } else {
          a.textContent = ' [incorrect]'
          setTimeout(() => { a.textContent = linkText }, 1000)
        }
      })
      h2.appendChild(a)
    } else div.appendChild(ul)
  
    document.querySelector('#lists').appendChild(div)
  }
  
  config.lists.forEach(list => addList(list.name, list.array, list.args[0], list.args[1]))
}