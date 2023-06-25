const $ = document.querySelector.bind(document); 
const $$ = document.querySelectorAll.bind(document);

const songs = [
    {
        name: "Click Pow Get Down",
        singer: "Raftaar x Fortnite",
        path: "https://songs6.vlcmusic.com/download.php?track_id=34737&format=128",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "https://songs6.vlcmusic.com/download.php?track_id=34213&format=128",
        image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
        name: "Waiting For Love",
        singer: "Avicii",
        path:
            "https://jesusful.com/wp-content/uploads/music/2022/07/Avicii_-_Waiting_For_Love_(Jesusful.com).mp3",
        image: "https://i1.sndcdn.com/artworks-000126123011-5xfdvg-t500x500.jpg"
    },
    {
        name: "Lily",
        singer: "Alan Walker, K-391 & Emelie Hollow",
        path: "https://files.gospeljingle.com/uploads/music/2022/12/Alan_Walker_K-391_Emelie_Hollow_-_Lily.mp3",
        image:
            "https://gospeljingle.com/wp-content/uploads/2022/12/alan-walker-k-391-emelie-hollow--500x281.jpg"
    },
    {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "https://songs6.vlcmusic.com/download.php?track_id=25791&format=128",
        image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
        name: "Monody",
        singer: "TheFatRat",
        path:
            "https://www.musikery.com/mp3/1875f959808ade03fbb707b80f3ce5e3e2f6f43419c1d24419cd5940d2cbf9ff.mp3",
        image:
            "https://i1.sndcdn.com/artworks-000240654859-mxpxkl-t500x500.jpg"
    },
    {
      name: "Nevada",
      singer: "Vicetone feat Cozi Zuehlsdorff",
      path: "https://archive.org/download/VicetoneFeat.CoziZuehlsdorff-Nevadamp3edm.eu/Vicetone%20feat.%20Cozi%20Zuehlsdorff%20%E2%80%93%20Nevada%20%5Bmp3edm.eu%5D.mp3",
      image:
        "https://covers.uptona.com/200x200/qZVlENzborhRWpXF.webp"
    }
];
function zoomInAndOut(){
    const cdThumb = $('.cd .thumb');
    const cdWidth = cdThumb.offsetWidth; 
    document.onscroll = (event) => {
        const newWidth =   cdWidth - window.pageYOffset;
        cdThumb.style.height = newWidth > 0 ? newWidth + 'px' : 0;
        cdThumb.style.width = cdThumb.style.height;
    }
}
function renderSongs(songsInfo){
    const selectedSongs = $('.selected-songs');
    songsInfo = songsInfo.map((value)=>{
        return `<div class="song">
                    <img class="thumb" src=${value.image} alt="Image of the song ${value.name}.">
                    <div class="name">
                        <span>${value.name}</span>
                        <div>${value.singer}</div>
                    </div>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>`;
    });
    const html = songsInfo.join(' ');
    selectedSongs.innerHTML = html; 
}
function helper(currentSong){
    const title = $('h3'); 
    const cdThumb = $('.cd .thumb');
    const audio = $('#audio');
    const progress = $('#progress');
    const selectedSongs = $$('.song');
    const choseSong = $('.song.chose');
    const play = $('.play-button');
    const pause = $('.pause-button');
    title.innerText = songs[currentSong].name;
    cdThumb.src = songs[currentSong].image;
    audio.src = songs[currentSong].path; 
    
    selectedSongs[currentSong].classList.add('chose');
    if(choseSong)choseSong.classList.remove('chose');
    audio.ontimeupdate = () => {
        if(audio.duration){
            progress.max = audio.duration;
            progress.value = audio.currentTime;
        }
    }
    progress.onchange = (event) => {
        audio.currentTime = event.target.value;
    }
    play.classList.remove('chose'); 
    pause.classList.add('chose');
    audio.play();

}
function renderSelectedSong(songsInfo){
    let currentSong = 0; 
    let isRepeated = false;
    let isRandom = false;
    helper(0);
    const length = songsInfo.length;
    const audio = $('#audio');
    const forward = $('.forward');
    const backward = $('.backward');
    const random = $('.random');
    const songs = $$('.song');
    const play = $('.play-button');
    const pause = $('.pause-button');
    const repeat = $('.repeat'); 
    const cdThumb = $('.cd .thumb');
    const animate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
    ],{
        duration: 10000,
        iterations: Infinity,
    });
    songs.forEach((value, index) => {
        value.onclick = (event) => {
            currentSong = index;
            helper(currentSong);
        }
    });
    forward.onclick = (event) => {
        currentSong = (currentSong + 1) % length;
        helper(currentSong);
    }
    backward.onclick = (event) => {
        currentSong = (currentSong - 1 + length) % length;
        helper(currentSong);
    }
    random.onclick = (event) => {
        currentSong = Math.floor(Math.random() * length);
        helper(currentSong);
    }
    play.onclick = () => {
        play.classList.remove('chose'); 
        pause.classList.add('chose');
        animate.play(); 
        audio.play();
    }
    pause.onclick = () => {
        pause.classList.remove('chose'); 
        play.classList.add('chose');
        animate.pause(); 
        audio.pause();
    }
    repeat.onclick = () => {
        if(!isRepeated){
            audio.loop = true; 
            isRepeated = true;
            repeat.classList.add('chose'); 
        }else {
            audio.loop = false;
            isRepeated = false;
            repeat.classList.remove('chose'); 
        }
    }
    audio.onended = () => {
        if(!isRepeated && !isRandom){
            currentSong = (currentSong + 1) % length;
        }else if(!isRepeated && isRandom){
            currentSong = Math.floor(Math.random() * length);
        }
        helper(currentSong);
    }
}

zoomInAndOut();
renderSongs(songs); 
renderSelectedSong(songs);