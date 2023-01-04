export function openMenu() {
  openNav.onclick = function () {
    navList.classList.toggle('d-flex')
    openNav.classList.toggle('navigation__button--closed')
    openNav.classList.toggle('navigation__button--open')
  }
}