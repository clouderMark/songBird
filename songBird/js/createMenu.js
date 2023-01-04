const menu = {
  workout: ['разминка', 'workout'],
  passerines: ['воробьиные', 'passerines'],
  forestBirds: ['лесные', 'forest birds'],
  songbirds: ['певчие', 'songbirds'],
  predatory: ['хищные', 'predatory birds'],
  see: ['морские', 'sea birds']
}

export function createMenu(lang = 'ru', score) {
  lang === 'ru' ? lang = 0 : lang = 1
  const menuContainer = document.createElement('div')
  const menuList = document.createElement('ul')

  for (const elemnt in menu) {
    const item = document.createElement('li')
    const link = document.createElement('a')
    item.classList.add('menu-list__item')
    link.classList.add('menu-list__link')
    link.innerHTML = menu[elemnt][lang]
    item.append(link)
    menuList.append(item)
  }
  
  menuList.classList.add('menu-list')
  menuContainer.classList.add('menu-container')
  menuContainer.append(menuList, score)
  root.append(menuContainer)
}