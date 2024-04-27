import { useState, useEffect } from 'react';

function QueueList() {
    const [movieQueue, setMovieQueue] = useState([]);
    const [queueCount, setQueueCount] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch movie data from the server
                const response = await fetch('http://localhost:5000/fetchfromqueue');
                if (!response.ok) {
                    throw new Error('Failed to fetch movie data');
                }
                const data = await response.json();
                // Update state with fetched movie data
                setMovieQueue(data);
                setQueueCount(data.length);
                console.log (queueCount);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        fetchMovies();
    }, [movieQueue]);

    return (
        <div className="queue">
            <h3>Queue</h3>
            <div>
                {movieQueue.map(movie => (
                    <div key={movie._id}>
                        <h3>{movie.movieTitle}</h3>
                        <p>ID: {movie.movieID}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QueueList;