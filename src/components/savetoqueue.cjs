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
    const movieID = req.body;
    console.log (movieID);
    const movieTitle = req.body.title;

    if (!movieID || !movieTitle) {
        console.log({ error: 'Missing movie ID or title' });
        return res.send ({ error: 'Missing movie ID or title' });
    }

    const newMovie = new Movie({ movieID: movieID, movieTitle: movieTitle });

    try {
        await newMovie.save();

        console.log(movieTitle + ' saved successfully to your queue!');
        return res.send({ message: movieTitle + ' saved successfully to your queue!' });
    } catch (error) {
        console.error('Error saving movie with title: ' + movieTitle + ' ' + error.message);
        return res.send({ message: 'Error saving movie with title: ' + movieTitle + '\n' + error });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));