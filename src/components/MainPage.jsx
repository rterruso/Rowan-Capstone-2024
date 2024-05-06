import { useState } from 'react';
import { getAuthorization } from './FetchMovieData.js';
import DisplayMovieData from './DisplayMovieData.jsx';
// import Login from '../pages/Login.jsx';
// import Register from '../pages/Register.jsx';
// import WelcomeUser from './WelcomeUser.jsx';
// import WelcomeMessage from './WelcomeMessage.jsx';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sortValue, setSortValue] = useState('date-asc');
    const [filterValue, setFilterValue] = useState('all');
    const [movieTitle, setMovieTitle] = useState('');
    const [movieResults, setMovieResults] = useState([]);
    
    const handleSortSelect = (event) => {
        setSortValue(event.target.value);
    };

    const handleFilterSelect = (event) => {
        setFilterValue(event.target.value);
    };

    const handleMovieTitleChange = (event) => {
        setMovieTitle(event.target.value);
    };

    const handleMovieSearch = async () => {
        const API_KEY = 'd7dd778d2f341c096662f9f44263b64e';
        const URL =
            'https://api.themoviedb.org/3/search/movie?api_key=' +
            API_KEY +
            '&query=' +
            movieTitle;
        const RESPONSE = await fetch(URL, getAuthorization());
        const movieResults = JSON.parse(await RESPONSE.text());
        setMovieResults(movieResults);
    };

    const handleLoginClick = () => {
        navigate('/Login');
        // setIsLoggedIn(true);
    };

    const handleRegisterClick = () => {
        navigate('/Register');
    };

    // const handleLogoutClick = () => {
    //     setIsLoggedIn(false);
    // }
    
    return (
        <div className="menu">
            {/* <WelcomeMessage /> */}
            {/* <WelcomeUser /> */}
            <div className="login-register-container">
                <button onClick={handleLoginClick} className="login">Login</button>
                <button onClick={handleRegisterClick} className="register">Register</button>
            </div>
            <div className="search-container">
                <input type="text" id="search-box" placeholder="Search for a movie..." autoComplete="on" value={movieTitle} onChange={handleMovieTitleChange} />
                <button id="search-button" onClick={handleMovieSearch}>Search</button>
            </div>
            <div className="sort-filter-container">
                <div className="sort-controls-container">
                    {/* Sort Control Options */}
                    <select id="sort-select" value={sortValue} onChange={handleSortSelect}>
                        <option value="title-asc">Title (A-Z)</option>
                        <option value="title-desc">Title (Z-A)</option>
                        <option value="date-asc">Release Date (Newest)</option>
                        <option value="date-desc">Release Date (Oldest)</option>
                        <option value="rating-asc">Rating (Ascending)</option>
                        <option value="rating-desc">Rating (Descending)</option>
                    </select>
                </div>

                <div className="filter-controls-container">
                    {/* Filter Control Options */}
                    <select id="filter-select" value={filterValue} onChange={handleFilterSelect}>
                        <option value="all">All</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Animation">Animation</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Drama">Drama</option>
                        <option value="Family">Family</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="History">History</option>
                        <option value="Horror">Horror</option>
                        <option value="Music">Music</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="TV Movie">TV Movie</option>
                        <option value="Thriller">Thriller</option>
                        <option value="War">War</option>
                        <option value="Western">Western</option>
                    </select>
                </div>
            </div>
            <DisplayMovieData movieResults={movieResults} sortValue={sortValue} filterValue={filterValue} />
        </div>
    );
}

export default MainPage;