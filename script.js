var audio = new Audio()

let play = document.querySelector("#play");
let pause = document.querySelector("#pause");
let progressbar = document.querySelector(".progressbar");
let currentTimeDisplay = document.querySelector(".curr-time");
let totalTime = document.querySelector(".tot-time");
let backward = document.querySelector("#backward");
let forward = document.querySelector("#forward");
let back10 = document.querySelector("#back-10");
let for10 = document.querySelector("#for-10");
let volumerange = document.querySelector('.volumerange');
let volumeBtn = document.querySelector('#volumeBtn');
let shuffle = document.querySelector('#shuffle');
let autoPlayNext = document.querySelector('#repeat');
let progBar = document.querySelector('#progBar');
let volBar = document.querySelector('#volBar');
let added = document.querySelector('.added');



function PlayPause() {
    if (audio.paused) {
        audio.play()
        updateCurrentTime();
        progressbar.value = 0;
        updateProgressBar();
        document.getElementById("musicBar").play();
        play.style.display = "none";
        pause.style.display = "inline-block";
    } else {
        audio.pause();
        // audio.currentTime = 0;
        updateCurrentTime();
        document.getElementById("musicBar").pause(); 
        play.style.display = "inline-block";
        pause.style.display = "none";
        
    }
    
}

function forwardAudio() {
    audio.currentTime += 10; 
    updateCurrentTime();
    updateProgressBar();
}

function backwardAudio() {
    audio.currentTime -= 10; 
    if (audio.currentTime < 0) {
      audio.currentTime = 0;
    }
    updateCurrentTime();
    updateProgressBar();
}

function updateCurrentTime() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeDisplay.textContent = minutes.toString().padStart(2, '0') + ':' +seconds.toString().padStart(2, '0');
}

function updateProgressBar() {
    progressbar.value = audio.currentTime / audio.duration;
}

setInterval(updateCurrentTime, 1000);

progressbar.addEventListener('input', () => {
    audio.currentTime = progressbar.value * audio.duration;
});

audio.onplay = updateProgressBar;
audio.ontimeupdate = function(e){
    updateProgressBar();
    progBar.style.width = Math.floor(audio.currentTime*100/audio.duration)+"%";
};

audio.onloadedmetadata = function() {
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    totalTime.textContent = totalMinutes.toString().padStart(2, '0') + ':' + totalSeconds.toString().padStart(2, '0');
  };

for10.addEventListener('click', forwardAudio);
back10.addEventListener('click', backwardAudio);


volumerange.addEventListener('input', () => {
    // console.log(Math.floor(audio.volume*100), audio.volume, volumerange.value)
  audio.volume = volumerange.value;
  volBar.style.width = Math.floor(audio.volume*100)+"%";
});

volumeBtn.addEventListener('click', () => {
    volumerange.value = 0
    audio.volume = volumerange.value;
    volBar.style.width = "0%"
});


var currentSong = 0


function playNextSong() {
    currentSong++;
    if (currentSong >= songCard.length) {
      currentSong = 0;
    }
    audio.src = songCard[currentSong].src
    albumPic.innerHTML = `<img src="${songCard[currentSong].image}" class="album-pic">
        <div class="album-dets">
            <h5 id="trackTitle">${songCard[currentSong].name}</h5>
            <h6 id="artists">${songCard[currentSong].singer}</h6>
        </div>
        <video id="musicBar" src="musicBar.mp4" autoplay muted loop></video>
        <div class="like-icon save">
            <button><h3 id=${currentSong}><i class="fa-regular fa-heart" id=${currentSong}></i></h3></h3></button>
            </div>
        `
    PlayPause();

}

function playPreviousSong() {
    currentSong--;
    if (currentSong < 0) {
      currentSong = songCard.length - 1; // Loop back to the last song
    }
    audio.src = songCard[currentSong].src
    albumPic.innerHTML = `<img src="${songCard[currentSong].image}" class="album-pic">
        <div class="album-dets">
            <h5 id="trackTitle">${songCard[currentSong].name}</h5>
            <h6 id="artists">${songCard[currentSong].singer}</h6>
        </div>
        <video id="musicBar" src="musicBar.mp4" autoplay muted loop></video>
        <div class="like-icon save">
            <button><h3 id=${currentSong}><i class="fa-regular fa-heart" id=${currentSong}></i></h3></button>
            </div>
        `
    PlayPause();
}

forward.addEventListener('click', playNextSong);
backward.addEventListener('click', playPreviousSong);



let songCard = [
    { src: "qaafirana.mp3", name: "Qaafirana (From \"Kedarnath\")", year: "2018", singer: "Arjit Singh, Nikhita Gandhi", image: "qaafirana.jpg" },
    { src: "tereJaisaYaarKahan.mp3", name: "Tere Jaisa Yaar Kahan", year: "1981", singer: "Kishore Kumar", image: "chhuKarMereManko.png" },
    { src: "rangLageya.mp3", name: "Rang Lageya", year: "2021", singer: "Mohit Chauhan, Rochak Kohil", image: "rangLageya.jpeg" },
    { src: "kalHoNaHo.mp3", name: "Kal Ho Naa Ho Lofi", year: "2003", singer: "Sonu Nigam, Shankar Mahadevan, KK, Alka Yagnik", image: "kalHoNaHo.png" },
   { src: "iktaraLofi.mp3", name: "Iktara Lofi", year: "2009", singer: "Kavita Seth, Amit Trivedi, Amitabh Bhattacharya", image: "iktaraLofi.png" },
    { src: "dilJhoom.mp3", name: "Dil Jhoom", year: "2023", singer: "Mithoon, Uttam Singh", image: "dilJhoom.jpeg" },
    { src: "zaraSa.mp3", name: "Zara Sa Lofi", year: "2008", singer: "Pritam, KK", image: "zaraSa.png" },
    { src: "oMaahi.mp3", name: "O Maahi (From \"Dunki\")", year: "2023", singer: "Pritam, Arjit Singh, Irshad Kamil", image: "oMaahi.jpeg" },
    { src: "pehlaPyar.mp3", name: "Pehla Pyar (\"Kabir Singh\")", year: "2019", singer: "Vishal Mishra", image: "pehlaPyar.jpeg" },
    { src: "teriBaatonMeinAisa.mp3", name: "Teri Baaton Main Aisa Uljha Jiya", year: "2024", singer: "Tanishk Bagchi, Mitraz, Sachin-Jigar", image: "teriBaatonMainAisa.jpeg" },
    { src: "raataanLambiyan.mp3", name: "Raataan Lambiyan", year: "2021", singer: "Tanishk Bagchi, Jubin Nautiyal", image: "raataanLambiyan.jpg" },
    { src: "mahiyeJinnaSohna.mp3", name: "Mahiye Jinna Sohna", year: "2023", singer: "Darshan Raval", image: "mahiyeJinnaSona.jpeg" },
 ];

function songCards() {
    let clutter = "";

    songCard.forEach(function (card, index) {
        clutter += `<div class="card" id=${index}>
        <img src="${card.image}" class="card-img">
        <i id=${index} class="fa-solid fa-play"></i>
        <p class="card-title">${card.name}</p>
        <p class="card-info">${card.year} &#8226; ${card.singer}</p>
    </div>`
    });

    document.querySelector("#songs").innerHTML = clutter;
    
    audio.src = songCard[currentSong].src
    // audio.play()
    
}
songCards();

let songs = document.querySelector("#songs");
let albumPic = document.querySelector(".album-con");
let trackTitle = document.querySelector("#trackTitle");
let artist = document.querySelector("#artists");


songs.addEventListener("click", function (dets) {

        currentSong = dets.target.id
        songCards();
        PlayPause();

        albumPic.innerHTML = `<img src="${songCard[currentSong].image}" class="album-pic">
        <div class="album-dets">
            <h5 id="trackTitle">${songCard[currentSong].name}</h5>
            <h6 id="artists">${songCard[currentSong].singer}</h6>
        </div>
        <video id="musicBar" src="musicBar.mp4" autoplay muted loop></video>
        <div class="like-icon save">
            <button><h3 id=${currentSong}><i class="fa-regular fa-heart" id=${currentSong}></i></h3></button>
            </div>
        `
    
     

        gsap.from(".album-con .album-pic, .album-con .album-dets",{
            x: 30,
            opacity: 0,
            duration: .5,
            delay: .3,
            stagger: .1
        })

        play.style.display = "none";
        pause.style.display = "inline-block";

});


shuffle.addEventListener('click', function(){
    function Shuffle(){
        let random = Math.floor(Math.random() * songCard.length);
        if(currentSong != random){
            currentSong = random;
            // console.log(currentSong);
            audio.src = songCard[currentSong].src
            albumPic.innerHTML = `<img src="${songCard[currentSong].image}" class="album-pic">
                <div class="album-dets">
                    <h5 id="trackTitle">${songCard[currentSong].name}</h5>
                    <h6 id="artists">${songCard[currentSong].singer}</h6>
                </div>
                <video id="musicBar" src="musicBar.mp4" autoplay muted loop></video>
                <div class="like-icon save">
                    <button><h3 id=${currentSong}><i class="fa-regular fa-heart" id=${currentSong}></i></h3></button>
                    </div>
                `
            PlayPause();
        }
        else{
            currentSong++;
            // console.log(currentSong);
            audio.src = songCard[currentSong].src
            albumPic.innerHTML = `<img src="${songCard[currentSong].image}" class="album-pic">
                <div class="album-dets">
                    <h5 id="trackTitle">${songCard[currentSong].name}</h5>
                    <h6 id="artists">${songCard[currentSong].singer}</h6>
                </div>
                <video id="musicBar" src="musicBar.mp4" autoplay muted loop></video>
                <div class="like-icon save">
                    <button><h3 id=${currentSong}><i class="fa-regular fa-heart" id=${currentSong}></i></h3></button>
                    </div>
                `
            PlayPause();
        }
    }
    Shuffle()
});

let autoPlay = 0

audio.addEventListener("ended", playNextSong);
autoPlayNext.style.opacity = 1;
autoPlayNext.addEventListener("click", function(){
    if(autoPlay == 0){
        audio.addEventListener("ended", PlayPause);
        autoPlayNext.style.opacity = .5;
        autoPlay = 1
    }
    else{
        autoPlayNext.style.opacity = 1;
        audio.addEventListener("ended", playNextSong);
        autoPlay = 0
        PlayPause()
    }
})


let albumCon = document.querySelector(".album-con");
let favSongList = document.querySelector(".lib-card");
    
let favSong = []

function addToFav(){
    albumCon.addEventListener("click", function(dets){
  
        if(!favSong.includes(songCard[currentSong])){
            if(dets.target.id == currentSong){
                favSong.push(songCard[currentSong])
            } 
        }

        // console.log(favSong)
        let clutter = ""

        favSong.forEach(function (card, index) {
            clutter += `<div class="playlist" id=${index}>
            <div class="lib-con">
            <img src="${card.image}" class="lib-pic">
            <div class="lib-pic-details">
                <h5>${card.name}</h5>
                <h6>${card.singer}</h6>
            </div>
        </div>
            </div>`

            gsap.to(added,{
                top: "8%",
                duration: .7,
                opacity: 1,
                zIndex: 599,
                ease: "power4.out",
            })
            gsap.to(added,{
                top: "3%",
                duration: .7,
                delay: 2,
                opacity: 0,
                zIndex: 0,
                ease: "power4.out",
            })
        
        });
    
        document.querySelector(".lib-card").innerHTML = clutter;


    });
}

addToFav()

favSongList.addEventListener("click", function (dets) {

    currentSong = dets.target.id
    console.log(favSong[currentSong])

    albumPic.innerHTML = `<img src="${favSong[currentSong].image}" class="album-pic">
    <div class="album-dets">
    <h5 id="trackTitle">${favSong[currentSong].name}</h5>
    <h6 id="artists">${favSong[currentSong].singer}</h6>
    </div>
    <video id="musicBar" src="musicBar.mp4" autoplay muted loop></video>
    <div class="like-icon save">
        <button><h3 ><i class="fa-regular fa-heart"></i></button>
    </div>`
    
    audio.src = favSong[currentSong].src
    PlayPause()


    gsap.from(".album-con .album-pic, .album-con .album-dets",{
        x: 30,
        opacity: 0,
        duration: .5,
        delay: .3,
        stagger: .1
    })
   
});


let playlistcard = [
    { name: "Old is Gold", info: "By Best Song Block", image: "oldisgold.jpeg", color: "#fea62a"},
    { name: "Study Lofi 2024", info: "By Lofi Block ", image: "lofistudy.webp", color: "#9AA174"},
    { name: "Amitabh Bachchan", info: "2023 &#8226; Amitabh Bachchan", image: "amitabhromantic.jpeg", color: "#c88662"},
    { name: "Hot Hits Hindi", info: "By Best Song Block", image: "hothitshindi.jpeg", color: "#E3A34C"},
    { name: "Lo-fi Vibes : Hindi", info: "By Pro Chill", image: "lofivibes.jpeg", color: "#9437ff"},
    { name: "Zone for Peace", info: "2023 &#8226; Aesthetic Music", image: "zoneforpeace.jpeg", color: "#E6712F"},
    { name: "Best Shiva Song", info: "2022 &#8226; New Songs", image: "lordShiva.png", color: "#006489"},
    // { name: "Focus & Study Music", info: "Foucs & amp; Study Music", image: "focus&study.jpeg", color: "#578f3f"},
];


function playlistCards() {
    var clutter = "";

    playlistcard.forEach(function (card,index) {
        clutter += `<div class="card" id=${index}>
        <img src="${card.image}" class="card-img">
        <p class="card-title">${card.name}</p>
        <p class="card-info">${card.info}</p>
    </div>`
    });

    document.querySelector("#playlist").innerHTML = clutter;


}
playlistCards();



let featurecard = [
    { name: "Top Songs India", info: "Catch the hottest global tracks", image: "card20img.jpeg" },
    { name: "Top Songs Global", info: "Tune into the Hottest tracks of Bollywood ! India", image: "card21img.jpeg" },
    { name: "Top 50 - Global", info: "Your daily updates of the most played...", image: "card22img.jpeg" },
    { name: "Top of The Charts Weekly", info: "2013 &#8226; U.K. Mix Masters", image: "topweeklychart.webp" },
    { name: "Top Chart Remixes", info: "2012 &#8226; Various Artists", image: "topchartremix.jpeg" },
    { name: "Oldies Remixes 2024", info: "By Electrify Playlists", image: "oldiesremixes.jpeg" },
];

function featureChartsCard() {
    let clutter = "";

    featurecard.forEach(function (card) {
        clutter += `<div class="card">
       <img src="${card.image}" class="card-img">
       <p class="card-title">${card.name}</p>
       <p class="card-info">${card.info}</p>
   </div>`
    });

    document.querySelector("#featurechart").innerHTML = clutter;

}
featureChartsCard()


let search = document.querySelector("#navoption2");
let home = document.querySelector("#navoption1");
let flagHide = 0

function searchDisplay() {
    search.addEventListener("click", function () {
        if (flagHide == 0) {
            document.querySelector(".main-down .search").style.display = "flex";
            document.querySelector(".playlistContainer .sticky-nav .row1 .nav-icon .search").style.display = "flex";

            gsap.from(".main-down .sticky-nav .row1 .nav-icon .search", {
                x: 20,
                opacity: 0,
                duration: .7,
                stagger: .2,
                delay: .2,
            })

            gsap.from(".playlistContainer .sticky-nav .row1 .nav-icon .search", {
                x: 20,
                opacity: 0,
                duration: .7,
                stagger: .2,
                delay: .2,
            })

            gsap.to("#explore",{
                opacity: 0,
                scale: .9,
                delay: .1,
                duration: .5
            })

            gsap.from(".lib-card .playlist", {
                y: 50,
                opacity: 0,
                duration: .5,
                stagger: .2,
                delay: .3,
            })

            // document.querySelector(".search-recent").style.display = "flex";
            gsap.from(".playlist-con, .lib-down",{
                y: 30,
                opacity: 0,
                duration: .7,
                stagger: .1,
                delay: .1
            })

            gsap.to(".sticky-nav",{
                height: "10vh",
                duraion: .5
            })
            gsap.to(".row2",{
                opacity: 0,
                duration: .5
            })
            search.style.opacity = 1;
            home.style.opacity = .5;
            flagHide = 1;
        };
    });

    home.addEventListener("click", function () {
        if (flagHide == 1) {
            document.querySelector(".main-down .sticky-nav .row1 .nav-icon .search").style.display = "none";
            document.querySelector(".playlistContainer .sticky-nav .row1 .nav-icon .search").style.display = "none";
            // document.querySelector("#explore").style.display = "";
            gsap.to("#explore",{
                scale: 1,
                opacity: 1,
                delay: .1,
                duration: 1
            })

            gsap.from(".lib-card .playlist", {
                y: 50,
                opacity: 0,
                duration: .5,
                stagger: .2,
                delay: .3,
            })
          
            // document.querySelector(".search-recent").style.display = "";

            // gsap.to(".search-recent",{
            //     y: 20,
            //     opacity: 0,
            //     duration: .7,
            //     stagger: .1,
            //     delay: .1
            // })
            gsap.from(".playlist-con, .lib-down",{
                y: 30,
                opacity: 0,
                duration: .7,
                stagger: .1,
                delay: .1
            })

            gsap.to(".row2",{
                opacity: 1,
                duration: .5
            })
            gsap.to(".main-down .sticky-nav",{
                height: "18vh",
                duraion: .5
            })
            search.style.opacity = .5;
            home.style.opacity = 1;
            flagHide = 0;
        };
    });

};
searchDisplay();


var tl = gsap.timeline()

tl.from(".lib-down .content, .lib-down .services, .lib-down .lan-btn .btn", {
    y: 20,
    opacity: 0,
    duration: .5,
    stagger: .1,
    delay: .5
},"anime")
.from(".playlist-con, .lib-down",{
    y: 30,
    opacity: 0,
    duration: .7,
    stagger: .1,
    delay: .5
},"anime")
.from(".lib-card>img",{
    y: 30,
    opacity: 0,
    duration: .7,
    stagger: .1,
    delay: .7,
},"anime")

tl.from("#navoption1, #navoption2", {
    x: 50,
    duration: 1,
    opacity: 0,
    stagger: .2,
    delay: .5
}, "anime")
    .from(".nav-icon>a, .saved, .dark-badge1, .dark-badge", {
        x: 25,
        duration: .5,
        opacity: 0,
        stagger: .1,
        delay: .5
    }, "anime")
    .from(".row2>button", {
        x: 25,
        opacity: 0,
        duration: 1,
        stagger: .2,
        delay:.5
    }, "anime")
    .from("#song-text",{
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: .1,
        delay:.5
    },"anime")
    .from(".card", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: .1,
        delay:.5
    }, "anime")
    .from(".album-con .album-pic, .album-con .album-dets",{
        x: 30,
        opacity: 0,
        duration: .5,
        delay: .5,
        stagger: .1
    },"anime")

     


let playListCards = document.querySelector("#playlist");
let playlistContainer = document.querySelector(".playlistContainer");
let sideBar = document.querySelector(".sidebar")
let mainContent = document.querySelector(".main-content")
let close = document.querySelector("#close");
let back = document.querySelector("#back");
let mainDown = document.querySelector(".main-down");
let playListDets = document.querySelector(".playListDets");



let playList = [ 
    oldIsGold = [
        { src: "churaLiyaHeTumne.mp3", name: "Chura Liya Hain Tumne Jo Dil Ko", year: "1973", singer: "Asha Bhosle, Mohammed Rafi", image: "churaLiyaHeTumne.png" },
        { src: "goomHaiKisiKe.mp3", name: "Goom Hai Kisike Pyar Mein", year: "1972", singer: "Kishore Kumar, Lata Mangeshkar", image: "goomHaiKisiKe.png" },
        { src: "hameTumsePyar.mp3", name: "Hamen Tumse Pyar Kitna", year: "1981", singer: "Kishore Kumar", image: "hameTumsePyar.png" },
        { src: "lagJaGaleSe.mp3", name: "Lagja Gale Se Phir", year: "1964", singer: "Lata Mangeshkar", image: "lagJaGaleSe.png" },
        { src: "likheJoKhatTuje.mp3", name: "Likhe Jo Khat Tujhe", year: "1968", singer: "Mohammed Rafi", image: "likheJoKhatTuje.png" },
        { src: "oMereDilKeChain.mp3", name: "O Mere Dil Ke Chain", year: "1973", singer: "Kishore Kumar", image: "oMereDilKeChain.png" },
        { src: "omShantiOm.mp3", name: "Dastaan (\"Om Shani Om\")", year: "2007", singer: "Shaan", image: "omShantiOm.png" },
        { src: "roopTera.mp3", name: "Roop Tera Mastana", year: "1972", singer: "Kishore Kumar", image: "roopTera.png" }
    ],
    studyLofi = [
        { src: "mainTumhara.mp3", name: "Main Tumhara Lofi", year: "2020", singer: "A.R. Rahman, Jonita Gandhi, Hriday Gattani", image: "mainTumhara.png" },
        { src: "iktaraLofi.mp3", name: "Iktara Lofi", year: "2009", singer: "Kavita Seth, Amit Trivedi, Amitabh Bhattacharya", image: "iktaraLofi.png" },
        { src: "kalHoNaHo.mp3", name: "Kal Ho Naa Ho Lofi", year: "2003", singer: "Sonu Nigam, Shankar Mahadevan, KK, Alka Yagnik", image: "kalHoNaHo.png" },
         { src: "zaraSa.mp3", name: "Zara Sa Lofi", year: "2008", singer: "Pritam, KK", image: "zaraSa.png" },
         { src: "channaMereya.mp3", name: "Channa Mereya Lofi", year: "2016", singer: "Pritam, Arijit Singh", image: "channaMereya.png" },
         { src: "mitwa.mp3", name: "Mitwa Lofi", year: "2006", singer: "Shankar-Ehsaan-Loy, Shankar Mahadevan, Caralisa Monteiro, Shafqat Amanat Ali", image: "mitwa.png" },
         { src: "raanjhanaa.mp3", name: "Raanjhanaa Lofi", year: "2013", singer: "A.R. Rahman", image: "raanjhanaa.png" },
         { src: "tumMile.mp3", name: "Tum Mile Lofi", year: "2009", singer: "Pritam, Neeraj Shridhar, KK, Javed Ali", image: "tumMile.png" },
    ],
   legendaryB = [
       { src: "tereJaisaYaarKahan.mp3", name: "Tere Jaisa Yaar Kahan", year: "1981", singer: "Kishore Kumar", image: "tereJaisaYaarKahan.png" },
       { src: "mereNaseebMain.mp3", name: "Mere Naseeb Mein Ae Dost", year: "1969", singer: "Kishore Kumar", image: "mereNaseebMain.png" },
       { src: "horiKheleRaghuvira.mp3", name: "Hori Khele Raghuveera", year: "2003", singer: " Amitabh Bachchan, Sukhwinder Singh, Alka Yagnik, Udit Narayan", image: "horiKheleRaghuvira.png" },
       { src: "chhuKarMereManko.mp3", name: "Chhu Kar Mere Manko", year: "1981", singer: "Kishore Kumar", image: "chhuKarMereManko.png" },
       { src: "januMeriJaan.mp3", name: "Janu Meri Jaan", year: "1980", singer: "Mohammed Rafi, Kishore Kumar, Asha Bhosle, Usha Mangeshkar", image: "januMeriJaan.png" },
        { src: "yehDostiHumNahiTodenge.mp3", name: "Yeh Dosti Hum Nahi Todenge", year: "1975", singer: "Kishore Kumar, Manna Dey", image: "yehDostiHumNahiTodenge.png" },
        { src: "rangBarseBheege.mp3", name: "Rang Barse Bheege Chunarwali", year: "1981", singer: "Amitabh Bachchan", image: "rangBarseBheege.png" },
        { src: "tumseDurRehke.mp3", name: "Tumse Dur Rehke", year: "1976", singer: "Lata Mangeshkar, Mohammed Rafi", image: "tumseDurRehke.png" },
   ],
   hotHits = [
       { src: "satranga.mp3", name: "Satranga", year: "2023", singer: "Arijit Singh, Shreyas Puranik", image: "satranga.png" },
       { src: "tuHaiKaha.mp3", name: "Tu Hai Kahan", year: "2023", singer: "Ahad Khan, Usama Ali, Raffey Anwar", image: "tuHaiKaha.png" },
       { src: "arjanVailly.mp3", name: "Arjan Vailly", year: "2023", singer: "Bhupinder Babbal", image: "arjanVailly.png" },
       { src: "manjhaTeraTe.mp3", name: "Manjha Tera Te", year: "2020", singer: "Vishal Mishra", image: "manjhaTeraTe.png" },
       { src: "saariDuniya.mp3", name: "Saari Duniya Jalaa Denge", year: "2023", singer: "B Praak, Jaani", image: "saariDuniya.png" },
        { src: "luttPuttGaya.mp3", name: "Lutt Putt Gaya", year: "2023", singer: "Arijit Singh", image: "luttPuttGaya.png" },
        { src: "maanMeriJaan.mp3", name: "Maan Meri Jaan", year: "2022", singer: "King", image: "maanMeriJaan.png" },
        { src: "dilDiyaGallan.mp3", name: "Dil Diyan Gallan", year: "2017", singer: "Atif Aslam", image: "dilDiyaGallan.png" },
   ],
   lofiVibes = [
       { src: "samjhawan.mp3", name: "Samjhawan", year: "2014", singer: "Jawad Ahmad, Toshi Sabri, Arijit Singh, Shreya Ghoshal", image: "samjhawan.png" },
       { src: "saibo.mp3", name: "Saibo", year: "2011", singer: "Sachin-Jigar, Shreya Ghoshal, Tochi Raina", image: "saibo.png" },
       { src: "tuJaaneNa.mp3", name: "Tu Jaane Na", year: "2009", singer: "Pritam, Atif Aslam", image: "tuJaaneNa.png" },
       { src: "subhanallah.mp3", name: "Subhanallah", year: "2013", singer: "Pritam, Sreerama Chandra, Shilpa Rao", image: "subhanallah.png" },
       { src: "mainRang.mp3", name: "Main Rang Sharbaton Ka", year: "2013", singer: "Pritam, Atif Aslam, Chinmayi Sripada", image: "mainRang.png" },
        { src: "oRePiya.mp3", name: "O Re Piya", year: "2007", singer: "Rahat Fateh Ali Khan, Salim-Sulaiman, Jaideep Sahni", image: "oRePiya.png" },
        { src: "falakTakChal.mp3", name: "Falak Tak Chal", year: "2008", singer: "Mahalakshmi Iyer, Udit Narayan, Vishal-Shekhar, Kausar Munir", image: "falakTakChal.png" },
        { src: "tumJoAayeZindagiMein.mp3", name: "Tum Jo Aaye Jindagi", year: "2010", singer: "Tulsi Kumar, Rahat Fateh Ali Khan", image: "tumJoAayeZindagiMein.png" },
   ],
   peaceHindi = [
       { src: "mereLiyeTumKaafiHo.mp3", name: "Mere Liye Tum Kaafi Ho", year: "2020", singer: "Ayushmann Khurrana", image: "mereLiyeTumKaafiHo.png" },
       { src: "mainYahaanHoo.mp3", name: "Main Yahaan Hoon", year: "2004", singer: "Udit Narayan", image: "mainYahaanHoo.png" },
       { src: "ishqWalaLove.mp3", name: "Ishq Wala Love", year: "2012", singer: "Vishal-Shekhar, Salim Merchant, Neeti Mohan, Shekhar Ravjiani", image: "ishqWalaLove.png" },
       { src: "abhiMujhMeKahin.mp3", name: "Abhi Mujh Mein Kahin", year: "2012", singer: "Sonu Nigam, Ajay-Atul", image: "abhiMujhMeKahin.png" },
       { src: "kabhiKabhiAditiZindagiJaane.mp3", name: "Kabhi Kabhi Aditi Zindagi", year: "2008", singer: "Rashid Ali", image: "kabhiKabhiAditiZindagiJaane.png" },
       { src: "kahaniSuno2.mp3", name: "Kahani Suno 2.0", year: "2022", singer: "Kaifi Khalil", image: "kahaniSuno2.png" },
       { src: "khamoshiyan.mp3", name: "Khamoshiyan", year: "2015", singer: "Arijit Singh", image: "khamoshiyan.png" },
        { src: "jabTak.mp3", name: "Jab Tak", year: "2016", singer: "Armaan Malik", image: "jabTak.png" },
   ],
   goosbump = [
       { src: "aarambhHaiPrachand.mp3", name: "Aarambh Hai Prachand", year: "2011", singer: "Piyush Mishra", image: "aarambhHaiPrachand.png" },
       { src: "boloHarHar.mp3", name: "Bolo Har Har Har", year: "2016", singer: "Mithoon, Mohit Chauhan, Sukhwinder Singh", image: "boloHarHar.png" },
       { src: "shivTndav.mp3", name: "Shiv Tandav Stotram", year: "2021", singer: "Sachet Tandon, Parampara Tandon", image: "shivTndav.png" },
       { src: "kalUskaKyaBigade.mp3", name: "Kal uska kya bigade", year: "2020", singer: "Viruss", image: "kalUskaKyaBigade.png" },
       { src: "meraBholaHaiBhandari.mp3", name: "Mera Bhola Hai Bhandari", year: "2022", singer: "Hansraj Raghuwanshi", image: "meraBholaHaiBhandari.png" },
       { src: "bholeCharniy.mp3", name: "Bhole Charniy Aradhana", year: "2024", singer: "Muktidan Gadhvi", image: "bholeCharniy.png" },
       { src: "shishNawataHoon.mp3", name: "Main tumko shish navata hu", year: "2022", singer: "Jubin Nautiyal", image: "shishNawataHoon.png" },
        { src: "devoKeDev.mp3", name: "Devon Ke Dev Mahadev", year: "2023", singer: "Akki Kalyan", image: "devoKeDev.png" },
   ],
]


function openPlayList(){
    playListCards.addEventListener("click", function(dets){

        currentSong = dets.target.id ;

        playlistContainer.style.background = `linear-gradient( ${playlistcard[currentSong].color}, #000)`

        playListDets.innerHTML = `<img id="playListImg" src="${playlistcard[currentSong].image}" alt="">
        <div class="dets">
            <h4>Playlist</h4>
            <h1 id="playListName">${playlistcard[currentSong].name}</h1>
            <h3 id="playListSingers">${playlistcard[currentSong].info}</h3>
        </div>`
        

        
        let clutter = ""

        playList[dets.target.id].forEach(function (card,index) {
        
            clutter += `
            <div class="playlistCard" id=${index}>
                <div class="numbers">${index+1}.</div>
                <img src="${card.image}">
                <div class="playListSong-dets">
                    <div class="text"><h5 id="songName">${card.name}</h5></div>
                    <div class="text"><h6 id="singer">${card.singer}</h6></div>
                    <div class="text"><h6 id="year">${card.year}</h6></div>
                </div>
            </div>`

            document.querySelector(".sticky-playlist").innerHTML = clutter;
            
            mainDown.style.display = "none"
                
            let tl2 = gsap.timeline()

            tl2.to(".playlistContainer",{
                display: "block",
                height: "100%",
                opacity: 1,
                zIndex: 599,
                duration: .6,
                ease: Power3
            },"ani")

            tl2.to(".playListDets img",{
                scale: 1,
                duration: .7,
                delay: .2,
                opacity: 1
            },"ani")

            tl2.to(".playListDets .dets h4",{
                x: 10,
                scale: 1,
                duration: .7,
                delay: .2,
                opacity: 1
            },"ani")
            tl2.to(".playListDets .dets h1",{
                x: 10,
                scale: 1,
                duration: .7,
                delay: .2,
                opacity: 1
            },"ani")
            tl2.to(".playListDets .dets h3",{
                x: 10,
                scale: 1,
                duration: .7,
                delay: .2,
                opacity: .5
            },"ani")
            tl2.to(".playlistCard",{
                marginTop: "0%",
                duration: 1,
                delay: .3,
                opacity: 1,
                stagger: .1
            },"ani")
            
            
        })

        

        playlistContainer.addEventListener("click", function (dets) {

            // currentSong = dets.target.id
            // console.log(playList[currentSong][dets.target.id])
        
            albumPic.innerHTML = `<img src="${playList[currentSong][dets.target.id].image}" class="album-pic">
            <div class="album-dets">
            <h5 id="trackTitle">${playList[currentSong][dets.target.id].name}</h5>
            <h6 id="artists">${playList[currentSong][dets.target.id].singer}</h6>
            </div>
            <video id="musicBar" src="musicBar.mp4" autoplay muted loop></video>
            `
            
            audio.src = playList[currentSong][dets.target.id].src
            PlayPause()


            gsap.from(".album-con .album-pic, .album-con .album-dets",{
                x: 30,
                opacity: 0,
                duration: .5,
                delay: .3,
                stagger: .1
            })
           
        });
        
    });
}

openPlayList()



close.addEventListener("click",function(){

    mainDown.style.display = "block";

    gsap.to(playlistContainer,{
        display: "none",
        opacity: 0,
        height: "0%",
        zIndex: -100,
        duration: 0.6,
        delay: .1,
        ease: Power3
    })
})

back.addEventListener("click",function(){

    mainDown.style.display = "block";

    gsap.to(playlistContainer,{
        display: "none",
        opacity: 0,
        height: "0%",
        zIndex: -100,
        duration: 0.6,
        delay: .1,
        ease: Power3
    })
})

