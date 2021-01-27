const apiURL = 'https://api.lyrics.ovh'
const inputValue = document.getElementById('inputValue');
const showDataId = document.getElementById('showId');
const showTitleSong = document.getElementById('titleSong');
const showLyric = document.getElementById('showLyric');

const SearchBtn = document.getElementById("SearchBtn").addEventListener("click", () => {
    const SearchInput = inputValue.value.trim();
    if (!SearchInput) {
        alert("There is nothing to search");
        searchResult.innerHTML = '';
        inputValue.value = '';

    } else {
        searchSong(SearchInput);
        inputValue.value = '';
    }
})
function searchSong(SearchInput) {
    fetch(apiURL + '/suggest/' + SearchInput)
        .then(res => res.json())
        .then(data => {
            displayData(data);
            fetchData = data;
        })
}

function displayData(data) {
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = '';
    for (let i = 0; i < data.data.length; i++) {
        if(i===5){
            break;
        }
        const details = data.data[i];
        searchResult.innerHTML += `
    <div  class="search-result col-md-8 mx-auto py-4">       
    <div class="single-result row align-items-center p-3">
        <div class="col-md-9 my-2">
        <h3 class="lyrics-name">${details.artist.name}</h3>
        <p class="author lead">Album by <span>${details.album.title}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric(${i})" class="btn btn-success"><span data-artist="">Get Lyrics</span></button>
    </div>
    </div>
    `
    
    }
}

function getLyric(index) {
    const artist = fetchData.data[index].artist.name;
    const title = fetchData.data[index].title;
    showTitleSong.innerText = `${artist} - ${title}`
    fetch(`${apiURL}/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const lyric = data.lyrics;
            if (!lyric) {
                showLyric.innerHTML = `<h1 class="text-danger">Sorry lyric has been dismissed</h1>`;
            } else {
                showLyric.innerText = lyric;
            }
        })
}