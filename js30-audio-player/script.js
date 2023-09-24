const dataMusic = [
    {
        id: 1,
        artist: "Linkin Park",
        track: "In the End",
        cover: "cover1",
    },
    {
        id: 1,
        artist: "Limp Bizkit",
        track: "Break Stuff",
        cover: "cover2",
    },
    {
        id: 3,
        artist: "Linkin Park",
        track: "Numb",
        cover: "cover3",
    },
    {
        id: 4,
        artist: "Limp Bizkit",
        track: "Behind Blue Eyes",
        cover: "cover4",
    },
    {
        id: 5,
        artist: "Linkin Park",
        track: "A Light That Never",
        cover: "cover5",
    },
    {
        id: 6,
        artist: "Limp Bizkit",
        track: "Red Light - Green Light",
        cover: "cover6",
    },
    {
        id: 7,
        artist: "Linkin Park",
        track: "What I've Done",
        cover: "cover7",
    },
    {
        id: 8,
        artist: "Limp Bizkit",
        track: "Getcha Groove On",
        cover: "cover8",
    },
    {
        id: 9,
        artist: "Linkin Park",
        track: "The Catalyst",
        cover: "cover9",
    },
    {
        id: 10,
        artist: "Linkin Park",
        track: "Talking to Myself",
        cover: "cover10",
    }
];

const player = document.getElementById('player');
const audio = document.getElementById('audio');
const coverImage = document.getElementById('cover-img');
const buttonPlay = document.getElementById('btn-play');
const playOrPauseIcon = document.getElementById('play-or-pause');
const buttonPrevious = document.getElementById('btn-prev');
const buttonNext = document.getElementById('btn-next');
const progressBar = document.getElementById('progress-bar');
const progressLine = document.getElementById('progress-line');
const nameArtist = document.getElementById('song-artist');
const nameSong = document.getElementById('song-name');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');

// const duration = audio.duration;
// const currentTime = audio.currentTime;


function randomInteger(min, max) {
    let random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  }

let indexSongs = randomInteger(0, dataMusic.length -1);

function loadingSongs(song) {
    audio.src = `assets/music/${song.track}.mp3`;
    coverImage.src = `assets/image_album/${song.cover}.jpeg`;
    nameArtist.innerHTML = song.artist;
    nameSong.innerHTML = song.track;
};

loadingSongs(dataMusic[indexSongs]);

function play() {
    player.classList.add('play');
    audio.play();
    playOrPauseIcon.src = 'assets/icon/pause.png';
};

function pause() {
    player.classList.remove('play');
    audio.pause();
    playOrPauseIcon.src = 'assets/icon/play.png';
};

buttonPlay.addEventListener('click', () => {
    const playOrPauseStatus = player.classList.contains('play');
    if (playOrPauseStatus) {
        pause();
    } else {
        play();
    }
});

function next() {
    indexSongs++;
    if (indexSongs > dataMusic.length -1) {
        indexSongs = 0;
    };

    loadingSongs(dataMusic[indexSongs]);
    play();
};

buttonNext.addEventListener('click', next);

function previous() {
    indexSongs--;
    if (indexSongs < 0) {
        indexSongs = dataMusic.length -1;
    }

    loadingSongs(dataMusic[indexSongs]);
    play();
};

buttonPrevious.addEventListener('click', previous);

function updateProgressLine() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const percentProgress = (currentTime / duration) * 100;
    progressLine.style.width = `${percentProgress}%`;
}

audio.addEventListener('timeupdate', updateProgressLine);

function rewind(e) {
    const widthProgressBar = this.clientWidth;
    const positionClick = e.offsetX;
    // const positionClick = progressLine.offsetX;
    const duration = audio.duration;

    audio.currentTime = (positionClick / widthProgressBar) * duration;

}

progressBar.addEventListener('click', rewind);