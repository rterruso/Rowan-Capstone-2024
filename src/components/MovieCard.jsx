import movieData from '../assets/movie_data.json';

function MovieCard(){
    return(
    movieData.map((movieData,i) =>
        <div className="movie-card">
            <img className="card-image" alt="Movie Poster" src={"https://image.tmdb.org/t/p/original/"+movieData.poster_path}></img>
            <h2>{movieData.title}</h2>
            <p>{movieData.release_date}</p>
            <p>{movieData.vote_average.toPrecision(2)}/10</p>
            <p>{movieData.original_language}</p>
        </div>
    )
    )
}

export default MovieCard