import '@/styles/index.scss'
import logoImg from '@/images/logo.svg'
import birdsData from './js/birdsData'
import { openMenu } from './js/openMenu'
import { createMenu } from './js/createMenu'
import { createPlayer } from './js/createPlayer'
import gug from '@/images/question.svg'
import { removeChilds } from './js/removeChilds'
import { shuffle } from './js/shuffle'
import { soundRightClick } from './js/soundRightClick'
import { soundWrongClick } from './js/soundWrongClick'
import visuals from 'assets/video.mp4'
//
const navRaios = document.getElementsByName('nav')
const score = document.createElement('span')
const scoreCounter = document.createElement('span')
//
const player = document.createElement('div')
const playerImgWrapp = document.createElement('div')
const playerImg = document.createElement('img')
const birdNameGug = document.createElement('span')
//
const game = document.createElement('div')
const variants = document.createElement('div')
const result = document.createElement('div')
const resultInner = document.createElement('div')
const image = document.createElement('img')
//
const invitationContent = 'Послушайте плеер. <br/> Выберите птицу из списка'
const invitation = document.createElement('div')
const birdName = document.createElement('p')
const birdLatName = document.createElement('p')
const description = document.createElement('p')
//
const nextBtn = document.createElement('button')
//
const resultBlock = document.createElement('div')
const finishContent = 'Your result is <br/>'
const tryAgain = document.createElement('button')
//
const video = document.createElement('video')
const videoContainer = document.createElement('div')
const startGameBtn = document.createElement('button')
//
const pointsForWin = 50
//
let amountPoints = 5//score
let isAnswer = false

logo.src = logoImg

scoreCounter.innerHTML = 0
score.classList.add('score')
score.innerHTML = `Score: `
score.append(scoreCounter)
//

openMenu()

createMenu('ru', score)
const menuContainer = root.querySelector('.menu-container')

game.classList.add('game')
variants.classList.add('variants')
result.classList.add('result')
//
let birdsDataCounter = 0
let currentData = birdsData[birdsDataCounter]
const numArr = [0, 1, 2, 3, 4, 5]
let numArrCounter = 0

shuffle(numArr)

let randomNum = numArr[numArrCounter]

player.classList.add('player__container')
root.append(player)

//
createPlayer(player, currentData[randomNum])
addPlayerImgAndTitle()
//
createVariantList()

invitation.innerHTML = invitationContent
invitation.classList.add('result__invitation')
description.classList.add('result__description')

nextBtn.classList.add('next-btn')
nextBtn.textContent = 'Next Lvl'

result.append(invitation)
game.append(variants, result)
root.append(game, nextBtn)

const menuLists = document.querySelectorAll('.menu-list__link')
menuLists[birdsDataCounter].classList.add('menu-list__link--active')

variants.onclick = function (e) {
  variantsOnClick(e)
}

nextBtn.disabled = true
nextBtn.onclick = function (e) {
  numArrCounter++
  if (numArrCounter === numArr.length) {
    numArrCounter = 0
    birdsDataCounter++

    addMenuBacklight()
    currentData = birdsData[birdsDataCounter]
    shuffle(numArr)
    removeChilds(variants)
    createVariantList()
  }
  nextBtn.disabled = true
  removeChilds(player)
  removeChilds(result)
  randomNum = numArr[numArrCounter]
  createPlayer(player, currentData[randomNum])
  addPlayerImgAndTitle()
  amountPoints = 5
  invitation.innerHTML = invitationContent
  result.append(invitation)
  addOrRemovePoint('removeAll')
  isAnswer = !isAnswer
  turnOnPlayer()

  if (scoreCounter.innerHTML >= pointsForWin) {
    closeAllBlocks()
    openResultPage(true)
    navRaios[2].checked = true
    audio.pause()
  }
}
closeAllBlocks()
videoContainer.classList.remove('visually-hidden')

tryAgain.classList.add('try-again-btn')
tryAgain.innerHTML = 'try again'

resultBlock.innerHTML = finishContent + 0
resultBlock.classList.add('result-page')
resultBlock.append(tryAgain)
root.append(resultBlock)

tryAgain.onclick = function () {
  navRaios[1].checked = true;
  closeAllBlocks()
  openGamePage()
  audio.play()
  scoreCounter.innerHTML = 0
}

for (const item of navRaios) {
  item.onchange = function () {
    closeAllBlocks()
    audio.pause()
    if (item.value === 'main') {
      videoContainer.classList.remove('visually-hidden')
    }
    if (item.value === 'play') {
      openGamePage()
      if (!isAnswer) {
        turnOnPlayer()
      }
    }
    if (item.value === 'results') {
      openResultPage()
    }
  }
}

createMainPage()

startGameBtn.onclick = function () {
  navRaios[1].checked = true
  closeAllBlocks()
  openGamePage()
  turnOnPlayer()
}

console.log('I implemented features for 250 points from 270')

function addClickItem(item) {
  image.src = item.image
  image.classList.add('result__image')
  resultInner.classList.add('result__inner')
  birdName.innerHTML = item.name
  birdLatName.innerHTML = item.species
  description.innerHTML = item.description
  resultInner.append(birdName, birdLatName)
  result.append(image, resultInner, description)
  createPlayer(resultInner, item, 'Small')
}

function createVariantList() {
  for (const item of currentData) {
    const el = document.createElement('div')
    el.innerHTML = item.name
    el.classList.add('variants__item')
    variants.append(el)
  }
}

function variantsOnClick(e) {
  const clickBird = e.target.innerHTML
  const clickBirdObg = currentData.find(bird => bird.name === clickBird)
  if (e.target.innerHTML === currentData[randomNum].name) {
    rightAnswer(clickBirdObg, e)
  } else {
    wrongAnswer(clickBirdObg)
  }
}

function rightAnswer(clickBirdObg, e) {
  nextBtn.disabled = false
  playerImg.src = currentData[randomNum].image
  birdNameGug.innerHTML = currentData[randomNum].name
  removeChilds(result)
  addClickItem(clickBirdObg)
  if (!isAnswer) {
    scoreCounter.innerHTML = +scoreCounter.innerHTML + amountPoints
    addOrRemovePoint('right', clickBirdObg.id)
    soundRightClick()
    isAnswer = !isAnswer
  }
  audio.pause()
  sound.classList.remove('player__play--stop')
  sound.classList.add('player__play--start')
}

function wrongAnswer(clickBirdObg) {
  const itemPosition = clickBirdObg.id - 1
  const allVariants = root.querySelectorAll('.variants__item')
  removeChilds(result)
  addClickItem(clickBirdObg)
  if (!isAnswer) {
    if (!allVariants[itemPosition].classList.contains('variants__item--wrong')) {
      amountPoints--
      if (amountPoints < 0) amountPoints = 0
      addOrRemovePoint('wrong', clickBirdObg.id)
      soundWrongClick()
    }
  }
}

function addMenuBacklight() {
  menuLists[birdsDataCounter - 1].classList.remove('menu-list__link--active')
  menuLists[birdsDataCounter].classList.add('menu-list__link--active')
}

function addPlayerImgAndTitle() {
  const playerWrapper = document.querySelector('.player__wrapper')
  const playerContainer = root.querySelector('.player')
  birdNameGug.innerHTML = '* * * * *'
  birdNameGug.classList.add('item-name-gug')
  playerContainer.prepend(birdNameGug)

  playerImg.src = gug
  playerImgWrapp.classList.add('player-img')
  playerImg.classList.add('player-img__img')
  playerImgWrapp.prepend(playerImg)
  playerWrapper.prepend(playerImgWrapp)
}

function addOrRemovePoint(flag, count) {
  const allVariants = root.querySelectorAll('.variants__item')

  if (flag === 'removeAll') {
    for (const item of allVariants) {
      if (item.classList.contains('variants__item--right')) {
        item.classList.remove('variants__item--right')
      }
      if (item.classList.contains('variants__item--wrong')) {
        item.classList.remove('variants__item--wrong')
      }
    }
  } else {
    allVariants[count - 1].classList.add(`variants__item--${flag}`)
  }
}

function openGamePage() {
  menuContainer.classList.remove('visually-hidden')
  player.classList.remove('visually-hidden')
  game.classList.remove('visually-hidden')
  nextBtn.classList.remove('visually-hidden')
}

function openResultPage(isWin = false) {
  resultBlock.classList.remove('visually-hidden')
  if (isWin) {
    resultBlock.innerHTML = 'You won <br/> with <br/>' + scoreCounter.innerHTML + ' points'
  } else {
    resultBlock.innerHTML = finishContent + scoreCounter.innerHTML
  }
  resultBlock.append(tryAgain)
}

function closeAllBlocks() {
  videoContainer.classList.add('visually-hidden')

  menuContainer.classList.add('visually-hidden')
  player.classList.add('visually-hidden')
  game.classList.add('visually-hidden')
  nextBtn.classList.add('visually-hidden')

  resultBlock.classList.add('visually-hidden')
}

function turnOnPlayer() {
  audio.play()
  sound.classList.add('player__play--stop')
  sound.classList.remove('player__play--start')
}

function createMainPage() {
  startGameBtn.innerHTML = 'start'
  startGameBtn.classList.add('video__btn')
  videoContainer.classList.add('video__container')
  video.classList.add('video')
  video.autoplay = true
  video.muted = true
  video.loop = true
  video.src = visuals
  videoContainer.append(video, startGameBtn)
  root.append(videoContainer)
}