export const getAuthorization = () => {
    return {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkN2RkNzc4ZDJmMzQxYzA5NjY2MmY5ZjQ0MjYzYjY0ZSIsInN1YiI6IjY1YzUwNjU0MTk0MTg2MDE2Mjc1ZTA2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3pn0_lr-lCIVOigU8uHz6BcWtEGSXbSsQlbASJgoL84',
        },
    };
};

export const fetchTrendingMoviesData = async () => {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', getAuthorization());
    const data = await response.text ();
    return JSON.parse (data);
};