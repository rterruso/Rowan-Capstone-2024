// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// const mongoURI = process.env.MONGODB_URI;

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(error => console.error('Error connecting to MongoDB:', error));

// // Define a Movie Schema (Optional, but recommended)
// const MovieSchema = new mongoose.Schema({
//     movieId: {
//         type: Number,
//         required: true,
//     },
// });

// const Movie = mongoose.model('Movie', MovieSchema);

// app.post('/SaveToQueue', async (req, res) => {
//     try {
//         const { movieId } = req.body; // Access movie ID from request body

//         // Option 1: Using the Movie model (if you defined a schema)
//         const newMovie = new Movie({ movieId });
//         await newMovie.save();

//         // Option 2: Without a schema (less secure)
//         await Movie.create({ movieId }); // Assuming 'Movie' collection exists

//         alert('Movie saved successfully:', movieId);
//         res.json({ message: 'Movie saved successfully!' });
//     } catch (error) {
//         console.error('Error saving movie:', error);
//         res.status(500).json({ message: 'Error saving movie' });
//     }
// });

// app.listen(3000, () => console.log('Server listening on port 3000'));
