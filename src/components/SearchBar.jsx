import { useState } from 'react';
import SortFilterMenu from './SortFilterMenu';
import FetchSearchedMovies from './FetchSearchedMovies';
import { getAuthorization } from './FetchMovieData';

const SearchBar = ({ sortValue, filterValue }) => {
    const [movieTitle, setMovieTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleMovieTitleChange = (event) => {
        setMovieTitle(event.target.value);
    };

    const searchMovieTitle = async () => {
        const API_KEY = 'd7dd778d2f341c096662f9f44263b64e';
        const url =
            'https://api.themoviedb.org/3/search/movie?api_key=' +
            API_KEY +
            '&query=' +
            movieTitle;
        const response = await fetch(url, getAuthorization());
        const movies = JSON.parse(await response.text());
        setSearchResults(movies.results);
    };

    return (
        <div className="search-container">
            <input type="text" id="search-box" placeholder="Search for a movie..." autocomplete="on" value={movieTitle} onChange={handleMovieTitleChange} />
            <button id="search-button" onClick={searchMovieTitle}>Search</button>
            <FetchSearchedMovies searchResults={searchResults} sortValue={sortValue} filterValue={filterValue} />
        </div>
    );
}

export default SearchBar;