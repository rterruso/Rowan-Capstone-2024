const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();
const uri = process.env.MONGODB_URI;
const port = 5000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    });

//Defines a Movie Schema
const MovieSchema = new mongoose.Schema({
    movieID: {
        type: Number,
        required: true,
    },
    movieTitle: {
        type: String,
        required: true,
    },
});

//Creates Movie model for MovieSchema
const Movie = mongoose.model('Movie', MovieSchema);

app.post('/savetoqueue', async (req, res) => {
    const movieID = req.body.id;
    const movieTitle = req.body.title;

    if (!movieID || !movieTitle) {
        console.log({ error: 'Missing movie ID or title' });
        return res.send ({ error: 'Missing movie ID or title' });
    }

    let existingMovie = await Movie.findOne({ movieID: movieID });
    
    try {
        if (existingMovie) {
            await existingMovie.save();
            console.log(movieTitle + ' count incremented in the queue!');
            return res.send ({ message: movieTitle + " is already in your queue"});
        } else {
            const newMovie = new Movie({ movieID: movieID, movieTitle: movieTitle });
            await newMovie.save();
            console.log(movieTitle + ' saved successfully to your queue!');
            return res.send ({ message: movieTitle + " saved successfully to your queue!"});
        }
    } catch (error) {
        console.error('Error saving/updating movie with title: ' + movieTitle + ' ' + error.message);
        return res.send({ message: 'Error saving/updating movie with title: ' + movieTitle + '\n' + error });
    }
});

// Endpoint to fetch data from the database
app.get('/fetchfromqueue', async (req, res) => {
    try {
        // Fetch data from the database
        const movies = await Movie.find();

        // Send the fetched data as a response
        return res.send(movies);
    } catch (error) {
        console.error('Error fetching data from the queue: ' + error.message);
        return res.send({ error: 'Error fetching user information: ' + error.message });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));