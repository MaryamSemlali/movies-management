const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();
const casual = require('casual');
const cors = require('cors');

mongoose.Promise = global.Promise;
server.use(bodyParser.json());

server.use(cors());

server.listen(3050, () => {
    console.log("Listening on port " + 3050);

    mongoose.connect('mongodb://localhost/user_api_database',{
        useMongoClient: true,
    });

    mongoose.connection
        .once('open', () => {

            // Call routes only when the connection with MongoDB works
            require('./routes')(server);

            /**
             *  Create movies
             */
            const movieModel = require('./models/movies');

            for (let i = 0; i < 30; i++) {
                movieModel.create({
                    title: casual.title,
                    duration: casual.integer(from = 1, to = 6),
                }).then().catch();
            }

            /**
             * create users that have movies
             */
            const userModel = require('./models/users');

            for (let i = 0; i < 30; i++) {
                // Create user
                userModel.create({
                    name: casual.full_name,
                    age: casual.integer(from = 15, to = 70)
                }).then((userResponse) => {

                    // Create movies for user
                    for (let i = 0; i < casual.integer(from = 1, to = 15); i++) {
                        movieModel.create({
                            title: casual.title,
                            duration: casual.integer(from = 1, to = 6),
                        }).then((movieResponse) => {

                            userModel.update({ _id: userResponse._id}, { $push: { movies: movieResponse._id } }, { new: true }).then().catch();

                        }).catch();
                    }
                }).catch();
            }

        })
        .on('error', (error) => {
            throw error;
        });
});
