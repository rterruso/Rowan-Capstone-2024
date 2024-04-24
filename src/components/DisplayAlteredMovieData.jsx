import { fetchTrendingMoviesData } from './FetchMovieData';
import { mapGenres } from './GetGenresData';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const handleButtonClick = async (movieID, movieTitle) => {
    const data = {
        id: movieID,
        title: movieTitle
    };

    const options = {
        method: 'POST', // HTTP method
        headers: {
            accept: 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify(data) // Convert data object to JSON string
    };

    await fetch('http://localhost:5000/savetoqueue', options)
        .then(response => response.text())
        .then(data => {
            alert('Movie sent successfully: ' + data);
            // Handle successful response (e.g., display a success message)
        })
        .catch(error => {
            alert('Error sending movie data: ' + error);
            // Handle errors (e.g., display an error message)
        });
};

function MovieModal(props) {
    const { movie, onClose } = props;
    let title = movie.title, overview = movie.overview, releaseDate = movie.release_date,
        poster = movie.poster_path, rating = Math.round(movie.vote_average * 10) / 10, genres = mapGenres(movie), id = movie.id;

    return (
        <div className="modal">
            <div className="modal-content">
                <h5 className='close-button' onClick={onClose}>&times;</h5>
                <img className="modal-poster" alt={title} src={"https://image.tmdb.org/t/p/original/" + poster} />
                <h5>{title}</h5>
                <h5>Overview: {overview}</h5>
                <h5>Release Date: {releaseDate}</h5>
                <h5>Rating: {rating}</h5>
                <h5>{genres}</h5>
                <button className="save-to-queue-button" onClick={() => handleButtonClick(id, title)}>Save to Queue</button>
            </div>
        </div>
    );
}

MovieModal.propTypes = {
    movie: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    // title: PropTypes.string.isRequired,
    // overview: PropTypes.string.isRequired,
    // releaseDate: PropTypes.string.isRequired,
    // poster: PropTypes.string.isRequired,
    // rating: PropTypes.number.isRequired,
    // genres: PropTypes.array.isRequired,
    // id: PropTypes.number.isRequired
};

const DisplayAlteredMovieData = (props) => {
    const { movieResults, sortValue, filterValue } = props;
    const [movies, setMovieData] = useState([]);
    const [movieCount, setMovieCount] = useState(0);
    let movieRef = [];
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const movies = Object.keys(movieResults).length === 0 ? await fetchTrendingMoviesData() : movieResults;
            setMovieData(movies.results);
            setMovieCount(movies.results.length);
        }
        fetchData();
    }, [movieResults]);

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
        <div className="movie-overview">
            <h2>Movies</h2>
            <div>
                {movieRef.map((movie, index) => (
                    <div key={index}>
                        <img className="movie-poster"
                            alt={movie.title}
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

DisplayAlteredMovieData.propTypes = {
    movieResults: PropTypes.array.isRequired,
    sortValue: PropTypes.string.isRequired,
    filterValue: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // overview: PropTypes.string.isRequired,
    // releaseDate: PropTypes.string.isRequired,
    // poster: PropTypes.string.isRequired,
    // rating: PropTypes.number.isRequired,
    // genres: PropTypes.array.isRequired,
    // id: PropTypes.number.isRequired
};

export default DisplayAlteredMovieData;