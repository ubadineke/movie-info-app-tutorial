document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let searchText = document.getElementById('searchText').value
    getMovies(searchText);
});

 function getMovies(searchText){
     fetch('http://www.omdbapi.com/?i=tt3896198&apikey=af285ce5&s='+searchText)
     .then((res) => res.json())
     .then((data) =>{
        console.log(data)
        let movies = data.Search
        let output = ''
        movies.forEach((movie, index) => {
            output += `
            <div class = "col-md-3">
                <div class = "well text-center">
                    <img id="raft" src = "${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.Title}')" class='btn btn-primary' href="#">Movie Details</a>
                </div>
            </div>
            `;
        })
        document.getElementById('movies').innerHTML = output;
     })
     .catch((err) => {
         console.log(err);
     })
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
    
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=af285ce5&t='+movieId)
    .then((res) => res.json()) 
    .then((data) =>{
        console.log(data)
    let output = `
        <div class="container">
        <div class = "row">
            <div class = "col-md-4">
                <img src ="${data.Poster}" class="thumbnail">
            </div>
            <div class = "col-md-8">
                <h2>${data.Title}</h2>
                <ul class = "list-group">
                    <li class = "list-group-item"><strong>Genre:  </strong>${data.Genre}</li>
                    <li class ="list-group-item"><strong>Released:  </strong>${data.Released}</li>
                    <li class ="list-group-item"><strong>IMDB Rating:  </strong>${data.imdbRating}</li>
                    <li class ="list-group-item"><strong>Actors:  </strong>${data.Actors}</li>
                    <li class ="list-group-item"><strong>Director:  </strong>${data.Director}</li>
                    <li class ="list-group-item"><strong>Writer:  </strong>${data.Writer}</li>
                    <li class ="list-group-item"><strong>Actors:  </strong>${data.Actors}</li>
                    <li class ="list-group-item"><strong>Runtime:  </strong>${data.Runtime}</li>
                </ul>
            </div>
        </div>
        </div>
        
        <div class = "row">
        <div class = "container">
            <div class = "well">
            <h3>Plot</h3>
            ${data.Plot}
            <hr>
            <a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href = "index.html" class="btn btn-default">Go Back To Search</a>
            </div>
            </div>
        </div>
        
    `
    
    document.getElementById('movies').innerHTML = output;
    })
    
    .catch((err) => {
        console.log(err);
    })
    
}
