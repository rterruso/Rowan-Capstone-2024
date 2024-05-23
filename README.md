CinemaWorld


Overview

CinemaWorld is a full-stack web application that provides comprehensive movie information to its users. It allows users to browse movies, check detailed descriptions, rate them, and write reviews. The application is designed to help movie enthusiasts find information about their favorite films and discover new ones.



Technologies Used

Front-End: React, HTML, CSS
Back-End: Node.js, Express
Database: MongoDB
Authentication: Passport.js


Features
Movie search functionality with various filters
User registration and authentication
Detailed movie descriptions including cast, crew, and user reviews
User profile management
Responsive web design for various devices
Getting Started
Prerequisites
Before running this project locally, you'll need to install the following software:

Node.js
MongoDB
Git (optional, for cloning the repository)


Installation
Follow these steps to get your development environment running:

Clone the repository (optional):

git clone https://github.com/yourusername/cinemaworld.git
cd cinemaworld


Install backend dependencies:

cd server
npm install

Install frontend dependencies:

cd into root
npm install


Set up environment variables:
Create a .env file in the server directory and add the following:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/cinemaworld
SECRET_KEY=your_secret_key


Start the MongoDB server:
Ensure that MongoDB is running on your machine. You can start MongoDB with the following command:

mongod


Run the backend server:

cd in server and npm start

Run the React application:
Open a new terminal window, go to the client directory, and run:

npm start



Usage
Home Page: Browse the latest movies and featured content.
Search: Use the search bar to find movies by titles.
Authentication: Users can register and log in to access personalized features.
Movie Details: Click on any movie card to get detailed information including reviews, ratings, and cast.
Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

License
MIT