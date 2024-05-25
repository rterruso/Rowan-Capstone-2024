import { fetchTrendingMoviesData, getAuthorization } from './FetchMovieData';
import { mapGenres } from './GetGenresData';
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';
//import { manipulateData } from './ManipulateData';

//FIX REDUNDANT CALLS
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

const FetchSearchedMovies = ({ searchResults, sortValue, filterValue }) => {
    const [movies, setMovieData] = useState([]);
    const [movieCount, setMovieCount] = useState([]);
    let movieRef = [];
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setMovieData(searchResults);
            setMovieCount(searchResults.length);
        }
        fetchData();
    }, [])

    //FIX REDUNDANT CALLS
    const manipulateData = (sortValue, filterValue) => {
        let len = 0, ref = [];

        if (filterValue !== 'all') {
            for (let i = 0; i < movies.length; i++) {
                if (mapGenres(movies[i]).includes(filterValue)) {
                    ref.push(movies[i]);
                }
            }

            len = ref.length;
        } else {
            ref = movies;
            len = movieCount;
        }

        if (sortValue === 'title-asc') {
            for (let i = 0; i < len - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < len; j++) {
                    if (
                        ref[j].title.toLowerCase() <
                        ref[minIndex].title.toLowerCase()
                    ) {
                        minIndex = j;
                    }
                }
                if (i !== minIndex) {
                    const temp = ref[i];
                    ref[i] = ref[minIndex];
                    ref[minIndex] = temp;
                }
            }
        } else if (sortValue === 'title-desc') {
            for (let i = 0; i < len - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < len; j++) {
                    if (
                        ref[j].title.toLowerCase() >
                        ref[minIndex].title.toLowerCase()
                    ) {
                        minIndex = j;
                    }
                }
                if (i !== minIndex) {
                    const temp = ref[i];
                    ref[i] = ref[minIndex];
                    ref[minIndex] = temp;
                }
            }
        } else if (sortValue === 'date-asc') {
            for (let i = 0; i < len - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < len; j++) {
                    if (
                        ref[j].release_date.toLowerCase() >
                        ref[minIndex].release_date.toLowerCase()
                    ) {
                        minIndex = j;
                    }
                }
                if (i !== minIndex) {
                    const temp = ref[i];
                    ref[i] = ref[minIndex];
                    ref[minIndex] = temp;
                }
            }
        } else if (sortValue === 'date-desc') {
            for (let i = 0; i < len - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < len; j++) {
                    if (
                        ref[j].release_date.toLowerCase() <
                        ref[minIndex].release_date.toLowerCase()
                    ) {
                        minIndex = j;
                    }
                }
                if (i !== minIndex) {
                    const temp = ref[i];
                    ref[i] = ref[minIndex];
                    ref[minIndex] = temp;
                }
            }
        } else if (sortValue === 'rating-asc') {
            for (let i = 0; i < len - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < len; j++) {
                    if (
                        ref[j].vote_average < ref[minIndex].vote_average
                    ) {
                        minIndex = j;
                    }
                }
                if (i !== minIndex) {
                    const temp = ref[i];
                    ref[i] = ref[minIndex];
                    ref[minIndex] = temp;
                }
            }
        } else if (sortValue === 'rating-desc') {
            for (let i = 0; i < len - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < len; j++) {
                    if (
                        ref[j].vote_average > ref[minIndex].vote_average
                    ) {
                        minIndex = j;
                    }
                }
                if (i !== minIndex) {
                    const temp = ref[i];
                    ref[i] = ref[minIndex];
                    ref[minIndex] = temp;
                }
            }
        }

        return ref;
    }

    movieRef = manipulateData(sortValue, filterValue);

    const openModalContainer = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    return (
        <div className="movie-overview" class="row">
            <div>
                {movieRef.map((movie) => (
                    <div>
                        <img className="movie-poster" alt={movie.title}
                            src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
                            onClick={() => openModalContainer(movie)}
                        />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>
            {isModalOpen && <MovieModal movie={selectedMovie} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default FetchSearchedMovies;