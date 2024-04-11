
export default function ViewControls(){

    return(
        <div className="view-controls-container">
            <div className="sort-controls-container">
                {/* Sort Control Options */}
                <select id="sort-select">
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
                <select id="filter-select">
                    <option value="all">All</option>
                    <option value="genre-action">Action</option>
                    <option value="genre-adventure">Adventure</option>
                    <option value="genre-animation">Animation</option>
                    <option value="genre-comedy">Comedy</option>
                    <option value="genre-crime">Crime</option>
                    <option value="genre-documentary">Documentary</option>
                    <option value="genre-drama">Drama</option>
                    <option value="genre-family">Family</option>
                    <option value="genre-fantasy">Fantasy</option>
                    <option value="genre-history">History</option>
                    <option value="genre-horror">Horror</option>
                    <option value="genre-music">Music</option>
                    <option value="genre-mystery">Mystery</option>
                    <option value="genre-romance">Romance</option>
                    <option value="genre-science_fiction">Science Fiction</option>
                    <option value="genre-tv_movie">TV Movie</option>
                    <option value="genre-thriller">Thriller</option>
                    <option value="genre-war">War</option>
                    <option value="genre-western">Western</option>
                </select>
            </div>
        </div>                
    
    );

}