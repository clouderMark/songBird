import { player } from "./player"

export function createPlayer(parrent, address, size = '') {
  const playerMarkup = `
  <div class="player">
    <audio class="visually-hidden" id=audio${size}
      src="${address.audio}"
      controls></audio>
    <div class="player__time">
      <span id="current${size}">0 : 0</span>
      <span id="duration${size}"></span>
    </div>
    <div class="progress__container" id="progressContainer${size}">
      <div class="progress" id="progress${size}"></div>
    </div>
    <div class="player__navigation">
      <button class="player__play player__play--start" id="sound${size}">Play/Stop</button>
      <div class="volume-range__container" id="volumeContainer${size}">
        <div class="volume-range" id="volumeRange${size}"></div>
      </div>
      <button class="player__mute" id="mute${size}">Mute</button>
    </div>
  </div>
  `

  const playerDiv = document.createElement('div')
  playerDiv.classList.add('player__wrapper')
  playerDiv.innerHTML = playerMarkup
  parrent.append(playerDiv)

  player(size)
}