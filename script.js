let songs = [
    { title: "Midnight Dream", artist: "Artist 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Ocean Waves", artist: "Artist 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Neon City", artist: "Artist 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Forest Path", artist: "Artist 4", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
];

let currentSong = 0;
let isPlaying = false;

let audio = document.getElementById("audio");
let playBtn = document.getElementById("play-btn");
let songTitle = document.getElementById("song-title");
let artistName = document.getElementById("artist-name");
let progressBar = document.getElementById("progress-bar");
let currentTimeEl = document.getElementById("current-time");
let durationEl = document.getElementById("duration");
let playlistEl = document.getElementById("playlist");

function loadSong(index) {
    currentSong = index;
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    artistName.textContent = songs[index].artist;
    renderPlaylist();
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = "▶";
    } else {
        audio.play();
        playBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
}

function nextSong() {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
}

function prevSong() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
}

audio.addEventListener("timeupdate", function () {
    let progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progressPercent + "%";

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

function seek(event) {
    let progressContainer = event.currentTarget;
    let clickX = event.offsetX;
    let width = progressContainer.clientWidth;
    audio.currentTime = (clickX / width) * audio.duration;
}

function changeVolume() {
    audio.volume = document.getElementById("volume").value;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) {
        secs = "0" + secs;
    }
    return minutes + ":" + secs;
}

audio.addEventListener("ended", function () {
    nextSong();
});

function renderPlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach(function (song, index) {
        let li = document.createElement("li");
        li.textContent = song.title + " - " + song.artist;
        if (index === currentSong) {
            li.classList.add("active");
        }
        li.addEventListener("click", function () {
            loadSong(index);
            audio.play();
            isPlaying = true;
            playBtn.textContent = "⏸";
        });
        playlistEl.appendChild(li);
    });
}

loadSong(0);