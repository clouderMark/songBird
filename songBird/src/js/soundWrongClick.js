import wrongSound from 'assets/wrong.mp3'

export function soundWrongClick() {
  const audio = new Audio()
  audio.src = wrongSound
  audio.autoplay = true
}