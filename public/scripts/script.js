const langObj = document.querySelector('.language-selector');
const popularArtist = document.querySelector('.music-more-artists');
const popularTracks = document.querySelector('.column-tracks');
const header = document.querySelector('.header');

var cache = new LastFMCache();

var lastfm = new LastFM({
  apiKey    : '0ecb571e46f38779899fa6a7f436b1e7',
  apiSecret : '466bb7a720c0b4f53f952024f9617e80',
  cache     : cache
});

main();

async function main(){
    clickArtist();
    clickTrack();
    clickTag();
    changingLanguage();
    createSearchBar();
    playTrack()
}


/**Переход на страницу тегов у популярных артистов и треков*/
async function clickTag(){
    document.addEventListener('click', (element)=>{ 
        console.log(element.target)
        if(element.target.parentElement.getAttribute('class') == "tags-list" || element.target.parentElement.getAttribute('class') == "tag"){
            window.location.href = 'https://www.last.fm/tag/' + element.target.innerHTML;
        }
    })
}


/**Переход на страницу популярного артиста*/
async function clickArtist(){
    const n = popularArtist.getElementsByClassName("artist-avatar");
    
    const o = popularArtist.getElementsByClassName("music-more-artists-item-name");

    for(let i = 0; i < n.length; ++i){
        n[i].addEventListener('click', ()=>{
            lastfm.artist.getInfo({artist: '' + o[i].innerHTML}, {success: function(data){
                console.log(data.artist.url + '');
                window.location.href = data.artist.url;
            }})
        })       
    }
}


/**Переход на страницу популярного трека*/
async function clickTrack(){
    const b = popularTracks.getElementsByClassName('column-tracks-item-name');
    console.log(b[0].innerHTML);

    for(let i = 0; i < b.length; ++i){
        b[i].addEventListener('click', ()=>{
            lastfm.track.search({track: '' + b[i].innerHTML}, {success: function(data){
                console.log(data.results.trackmatches.track[0].url + '');
                window.location.href = data.results.trackmatches.track[0].url;               
            }})
        })          
    }
}


/**Выбор языка на странице */
async function changingLanguage(){
    const a = langObj.getElementsByTagName('strong');

    for(let i = 0; i < a.length; ++i){
        a[i].addEventListener('click', ()=>{
            for(let j = 0; j < a.length; ++j){
                a[j].parentElement.setAttribute('class', 'footer-language');
                a[j].setAttribute('class', 'hover-text');
            }
            console.log(a[i].parentElement.innerHTML)
            a[i].parentElement.setAttribute('class', a[i].parentElement.getAttribute('class') + ' footer-language--active');
            a[i].setAttribute('class', '');
            
        })
    } 
}

/**Отображение строки поиска и взаимодействия с ней*/
async function createSearchBar(){
    const searchButton = header.getElementsByClassName('masthead-search-toggle')[0];

    searchButton.addEventListener('click', ()=>{
        const x = header.getElementsByClassName('header-content')[0];

        x.insertAdjacentHTML("afterbegin", "<form class='masthead-search-form'><div class='masthead-search-inner-wrap'><input class='masthead-search-field' type='text' placeholder='Search for music…'/><a class='masthead-search-toggle-cancel'></a><a class='masthead-search-submit'></a></div></form>");

        const cancelButton = x.getElementsByClassName('masthead-search-toggle-cancel')[0];
        
        cancelButton.addEventListener('click', ()=>{
            cancelButton.parentNode.parentNode.removeChild(cancelButton.parentNode);        
        })

        const searchButton = x.getElementsByClassName('masthead-search-submit')[0];

        searchButton.addEventListener('click', ()=>{
            const hr = "https://www.last.fm/search?q=" + x.getElementsByClassName('masthead-search-field')[0].value;     
            window.location.href = hr;
        })
    })

    document.addEventListener('keydown', function(event){
        if(event.code == 'Enter' && document.getElementsByClassName('masthead-search-field')[0] != undefined){
            const hr = "https://www.last.fm/search?q=" + document.getElementsByClassName('masthead-search-field')[0].value;     
            window.location.href = hr;
        }
    })
}


/**Отображение запущенного трека из списка популярных треков */
async function playTrack(){
    const x = popularTracks.getElementsByClassName('column-tracks-item');

    for(let i = 0; i < x.length; ++i){
        x[i].addEventListener('click', ()=>{
            const srcImgTrack = x[i].getElementsByTagName('img')[0].getAttribute('src');

            const defImgTrack = header.getElementsByTagName('img')[0];

            defImgTrack.setAttribute('src', srcImgTrack);

            const infoTrack = header.getElementsByClassName('player-bar-now-playing-inner-wrap')[0];

            infoTrack.innerHTML = x[i].getElementsByClassName('column-tracks-item-artist')[0].innerHTML + ' - ' + x[i].getElementsByClassName('column-tracks-item-name')[0].innerHTML;
        })
    }
}


