export function getTime(milisec, left) {
  if (left === 'current') {
    const time = Math.floor(milisec)
    const min = Math.floor(time / 60)
    const sec = time - min * 60
    return `${min} : ${sec}`
  } else {
    const timeDuration = (milisec / 60).toFixed(2)
    const min = Math.floor(timeDuration)
    const sec = Math.floor((timeDuration - min) * 100)
    return `${min} : ${sec - 1}`
  }
}