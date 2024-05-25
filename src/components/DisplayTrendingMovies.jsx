import { fetchTrendingMoviesData } from './FetchMovieData'; 
import { mapGenres } from './GetGenresData';
import { useState, useEffect } from "react";

function MovieModal({ movie, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h5 className='close-button' onClick={onClose}>&times;</h5>
                <img className="modal-poster" alt={movie.title} src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} />
                <h5>{movie.title}</h5>
                <h5>Overview: {movie.overview}</h5>
                <h5>Release Date: {movie.release_date}</h5>
                <h5>Rating: {Math.round(movie.vote_average * 10) / 10}</h5>
                <h5>{mapGenres(movie)}</h5>
                <button class="save-to-queue-button rounded-0" onClick="queue.js">Save to Queue</button>
            </div>
        </div>
    );
}

function DisplayTrendingMovies() {
    const [movies, setMovieData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const movies = await fetchTrendingMoviesData();
            setMovieData(movies.results);
        };
        fetchData();
    }, []);

    const openModalContainer = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    return (
        <div className="movie-overview" class="row">
            <h2>Movies</h2>
            <div>
                {movies.map((movie) => (
                    <div>
                        <img className="movie-poster" alt={movie.title}
                            src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
                            onClick={() => openModalContainer (movie)}
                        />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
            {isModalOpen && <MovieModal movie={selectedMovie} onClose={() => setIsModalOpen(false)}/>}
        </div>
    );
}

export default DisplayTrendingMovies;