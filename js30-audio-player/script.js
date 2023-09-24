const DATA_MUSIC = [
    {
        artist: "Linkin Park",
        track: "In the End",
        cover: "cover1",
    },
    {
        artist: "Limp Bizkit",
        track: "Break Stuff",
        cover: "cover2",
    },
    {
        artist: "Linkin Park",
        track: "Numb",
        cover: "cover3",
    },
    {
        artist: "Limp Bizkit",
        track: "Behind Blue Eyes",
        cover: "cover4",
    },
    {
        artist: "Linkin Park",
        track: "A Light That Never",
        cover: "cover5",
    },
    {
        artist: "Limp Bizkit",
        track: "Red Light - Green Light",
        cover: "cover6",
    },
    {
        artist: "Linkin Park",
        track: "What I've Done",
        cover: "cover7",
    },
    {
        artist: "Limp Bizkit",
        track: "Getcha Groove On",
        cover: "cover8",
    },
    {
        artist: "Linkin Park",
        track: "The Catalyst",
        cover: "cover9",
    },
    {
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
let indexSongs;

init();

function init() {
    indexSongs = randomInteger(0, DATA_MUSIC.length -1);
    loadingSongs(DATA_MUSIC[indexSongs]);

    buttonPlay.addEventListener('click', () => {
        const isPause = player.classList.contains('play');
        if (isPause) {
            pause();
        } else {
            play();
        };
    });

    buttonNext.addEventListener('click', next);
    buttonPrevious.addEventListener('click', previous);
    audio.addEventListener('timeupdate', updateProgressLine);
    progressBar.addEventListener('click', rewind);
    audio.addEventListener('loadedmetadata', timeTrack);
};

//random number song while loading

function randomInteger(min, max) {
    let random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
};

//init song

function loadingSongs(song) {
    audio.src = `assets/music/${song.track}.mp3`;
    coverImage.src = `assets/image_album/${song.cover}.jpeg`;
    nameArtist.innerHTML = song.artist;
    nameSong.innerHTML = song.track;
};

//play song

function play() {
    player.classList.add('play');
    audio.play();
    playOrPauseIcon.src = 'assets/icon/pause.png';

};

//pause song

function pause() {
    player.classList.remove('play');
    audio.pause();
    playOrPauseIcon.src = 'assets/icon/play.png';
};

//next song

function next() {
    indexSongs++;
    if (indexSongs > DATA_MUSIC.length -1) {
        indexSongs = 0;
    };

    loadingSongs(DATA_MUSIC[indexSongs]);
    play();
};

//previous song

function previous() {
    indexSongs--;
    if (indexSongs < 0) {
        indexSongs = DATA_MUSIC.length -1;
    }

    loadingSongs(DATA_MUSIC[indexSongs]);
    play();
};

//update progress bar while playing a song

function updateProgressLine() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const percentProgress = (currentTime / duration) * 100;
    progressLine.style.width = `${percentProgress}%`;
    timeCurrent.innerHTML = formatTimeDuration(currentTime);
};

//rewind progress bar while playing or paused a song

function rewind(e) {
    const widthProgressBar = this.clientWidth;
    const positionClick = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (positionClick / widthProgressBar) * duration;
};

//song duration calculation

function timeTrack() {
    const duration = audio.duration;
    timeTotal.innerHTML = formatTimeDuration(duration);
};

//formatting time in format 00:00

function formatTime(time) {
    return time < 10 ? `0${time}` : time
};

function formatTimeDuration(time) {
    const minutes = formatTime(Math.floor(time / 60));
    const seconds = formatTime(Math.floor(time - minutes * 60));
    return `${minutes}:${seconds}`;
};