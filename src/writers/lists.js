module.exports = config => {
  function addList (listName, list) {
    const div = document.createElement('div')
  
    const h2 = document.createElement('h2')
    h2.textContent = listName
    div.appendChild(h2)
  
    const ul = document.createElement('ul')
    div.appendChild(ul)
  
    for (const item of list) {
      const li = document.createElement('li')
      li.textContent = item
      ul.appendChild(li)
    }
  
    document.querySelector('#lists').appendChild(div)
  }
  
  config.lists.forEach(list => addList(list[0], list[1]))
}