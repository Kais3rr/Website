function ToggleMusic() {
    const Music = document.getElementById('MusicPlayer')
    const MusicImage = document.getElementById('MusicImage')

    Music.volume = 0.25
    if (Music.paused || Music.ended) {
        Music.play()
        MusicImage.src = "Icons/Play.png"
    } else {
        Music.pause()
        MusicImage.src = "Icons/Pause.png"
    }
}