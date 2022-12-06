const musicContainer = document.getElementById("music-player-section");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio-source");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const playlistCreate = document.querySelectorAll(".playlist-group");
// const cover = document.getElementById("cover");

// // Song titles
// const trackList = [
//   "Juice WRLD Ft Benny Blanco - Real Shit",
//   "Polo G – I Know",
//   "Lil Baby, Lil Durk ft Rodwave - Rich Off",
// ];

// // Keep track of song
// let songIndex = 2;

// // Initially load song details into DOM
// loadSong(trackList[songIndex]);

// // Update song details
// function loadSong(song) {
//   title.innerText = song;
//   audio.src = `music/${song}.mp3`;
//   cover.src = `image/${song}.jpg`;
// }

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous song
function prevSong() {
  if (currentMusic <= 0) {
    currentMusic = trackList.length - 1;
  } else {
    currentMusic--;
  }

  setMusic(currentMusic);

  // playBtn.click();
  playSong();
}
// Next song
function nextSong() {
  if (currentMusic >= trackList.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }

  setMusic(currentMusic);
  playSong();
  // playBtn.click();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
  // playSong();
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

///
let clickCount = 1;

const queue = { ...document.querySelector(".queue") };

const pDiv = document.querySelector(".queue1");

const backToHome = document.querySelector(".music-player-section .back-btn");

const navBtn = document.querySelector(".music-player-section .nav-btn");
const playlistSection = document.querySelector(".playlist");

const backToMusicContainer = document.querySelector(".playlist .back-btn");

musicContainer.addEventListener("click", () => {
  if (clickCount >= 2) {
    musicContainer.classList.add("active");
    clickCount = 1;
    return;
  }
  clickCount++;
  setTimeout(() => {
    clickCount = 1;
  }, 250);
});
backToHome.addEventListener("click", () => {
  musicContainer.classList.remove("active");
});

navBtn.addEventListener("click", () => {
  playlistSection.classList.add("active");
});

backToMusicContainer.addEventListener("click", () => {
  playlistSection.classList.remove("active");
});

const music = document.querySelector("#audio-source");

const songName = document.querySelector(".current-song-name ");

const artistName = document.querySelector(".artist-name  ");

const coverImage = document.getElementById("cover");

const currentMusicTime = document.querySelector(".current-time ");

const musicDuration = document.querySelector(".duration ");

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = "0" + min;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  return `${min} : ${sec}`;
};

let currentMusic = 0;

const setMusic = (i) => {
  let song = trackList[i];
  currentMusic = i;

  music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  coverImage.src = song.cover;
};
setMusic(5);

setInterval(() => {
  musicDuration.innerHTML = formatTime(music.duration);
  currentMusicTime.innerHTML = formatTime(music.currentTime);
}, 500);
currentMusicTime.innerHTML = `00 : 00`;
// queue.forEach((item) => item.classList.remove("active"));
// queue[currentMusic].classListadd("active");

// queue.forEach((item, i) => {
//   item.addEventListener("click", () => {
//     setMusic(i);
//     playBtn.click();
//   });
// });

// const create_playlist = (files) => {
//   let str;
//   for (var i = 0; i < files.length; i++) {
//     str += "<div>" + files[i].name + "</div>";
//   }

//   playlistCreate.innerHTML = str;
// };
// create_playlist();

// Display Tracks in playlist
let counter = 1;
function displayTracks() {
  for (let i = 0; i < trackList.length; i++) {
    console.log(trackList[i].name);
    let div = document.createElement("div");
    div.classList.add("queue");
    div.innerHTML = `

    <p class="single-song name">${trackList[i].name}</p>
    <i class="bi bi-music-note-list playlistBtn"></i>
    <i class="bi bi-heart-half"></i>
    
    `;
    pDiv.appendChild(div);
  }
  playFromPlaylist();
}
displayTracks();

// Play song from the playlist
function playFromPlaylist() {
  pDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("single-song")) {
      const indexNum = trackList.findIndex((item, index) => {
        if (item.name === e.target.innerHTML) {
          return true;
        }
      });
      setMusic(indexNum);
      playSong();
    }
  });
}

let LIST = [];
let id = 0;
