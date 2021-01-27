const apiURL = 'https://api.lyrics.ovh'
const SearchBtn = document.getElementById('SearchBtn');
const inputValue = document.getElementById('inputValue');
const showLyric = document.getElementById('showLyric');
const showTitleSong = document.getElementById('titleSong');

SearchBtn.addEventListener('click',()=>{
   const SearchInput = inputValue.value.trim();
   if(!SearchInput){
       alert("There are no search value");
   }else{
       searchSong(SearchInput);
       inputValue.value = '';
       
   }
})
function searchSong(SearchInput){
    fetch(apiURL+'/suggest/'+SearchInput)
    .then(res => res.json())
    .then(data => {
        getSong(data);
        fetchData = data;
    })
}

    function getSong(data){
const showId = document.getElementById('showId');
        showId.innerHTML = "";
        for (let i = 0; i < data.data.length; i++) {
            const details = data.data[i];
            showId.innerHTML += `
                <div class="song-list text-center">
                    <p class="author lead text-right">
                        <strong>${details.artist.name}</strong> -${details.title}
                        <button class="btn btn-success" onclick="getLyric(${i})">Get Lyric</button>
                    </p>
                </div>
            `
            if(i==5){
                break;
            }
        }
    }

    function getLyric(index){
        const artist = fetchData.data[index].artist.name;
        const title = fetchData.data[index].title;
        showTitleSong.innerText = `${artist} - ${title}`
        fetch(`${apiURL}/v1/${artist}/${title}`) 
        .then(res => res.json())
        .then(data =>{
            const lyric = data.lyrics;
            if(!lyric){
                showLyric.innerHTML = `<h1 class="text-danger">Sorry lyric has been dismissed</h1>`;
            }else{
                showLyric.innerText = lyric;
            }
        })
    }