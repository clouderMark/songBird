import { getTime } from "./getTime"

export function player(flag = 'Large') {
  if (flag === 'Small') {
    volumeRangeSmall.style.width = '100%';
    audioSmall.onloadedmetadata = function () {
      const progressContainerSmallWidth = progressContainerSmall.offsetWidth
      const volumeContainerWidth = volumeContainerSmall.offsetWidth
      audioSmall.ontimeupdate = function () {
        progressSmall.style.width = (audioSmall.currentTime / audioSmall.duration * progressContainerSmallWidth) + "px"
        currentSmall.innerText = getTime(audioSmall.currentTime, 'current')
      };
      audioSmall.onvolumechange = function () {
        volumeRangeSmall.style.width = (audioSmall.volume * volumeContainerWidth) + "px"
      }
      progressContainerSmall.onclick = progressSmall.onclick = function (e) {
        progressSmall.style.width = (e.clientX - progressContainerSmall.offsetLeft) + "px";
        audioSmall.currentTime = (e.clientX - progressContainerSmall.offsetLeft) / progressContainerSmallWidth * audioSmall.duration;
      }
      volumeContainerSmall.onclick = volumeRangeSmall.onclick = function (e) {
        volumeRangeSmall.style.width = (e.clientX - volumeRangeSmall.offsetLeft) + "px";
        audioSmall.volume = (e.clientX - volumeRangeSmall.offsetLeft) / volumeContainerWidth;
      }

      durationSmall.innerText = getTime(audioSmall.duration, 'duration')
    }

    soundSmall.onclick = function () {
      if (audioSmall.paused) {
        audioSmall.play()
        soundSmall.classList.add('player__play--stop')
        soundSmall.classList.remove('player__play--start')
      } else {
        audioSmall.pause()
        soundSmall.classList.remove('player__play--stop')
        soundSmall.classList.add('player__play--start')
      }
    }

    muteSmall.onclick = function () {
      audioSmall.volume ? audioSmall.volume = 0 : audioSmall.volume = 1
      muteSmall.classList.toggle('player__mute--on')
    }
  } else {
    volumeRange.style.width = '100%';
    audio.onloadedmetadata = function () {
      const progressContainerWidth = progressContainer.offsetWidth
      const volumeContainerWidth = volumeContainer.offsetWidth
      audio.ontimeupdate = function () {
        progress.style.width = (audio.currentTime / audio.duration * progressContainerWidth) + "px"
        current.innerText = getTime(audio.currentTime, 'current')
      };
      audio.onvolumechange = function () {
        volumeRange.style.width = (audio.volume * volumeContainerWidth) + "px"
      }
      progressContainer.onclick = progress.onclick = function (e) {
        progress.style.width = (e.clientX - progressContainer.offsetLeft) + "px";
        audio.currentTime = (e.clientX - progressContainer.offsetLeft) / progressContainerWidth * audio.duration;
      }
      volumeContainer.onclick = volumeRange.onclick = function (e) {
        volumeRange.style.width = (e.clientX - volumeRange.offsetLeft) + "px";
        audio.volume = (e.clientX - volumeRange.offsetLeft) / volumeContainerWidth;
      }

      duration.innerText = getTime(audio.duration, 'duration')
    }

    sound.onclick = function () {
      if (audio.paused) {
        audio.play()
        sound.classList.add('player__play--stop')
        sound.classList.remove('player__play--start')
      } else {
        audio.pause()
        sound.classList.remove('player__play--stop')
        sound.classList.add('player__play--start')
      }
    }

    mute.onclick = function () {
      audio.volume ? audio.volume = 0 : audio.volume = 1
      mute.classList.toggle('player__mute--on')
    }
  }

}