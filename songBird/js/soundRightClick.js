import rightSound from 'assets/right.mp3'

export function soundRightClick() {
  const audio = new Audio()
  audio.src = rightSound
  audio.autoplay = true
}