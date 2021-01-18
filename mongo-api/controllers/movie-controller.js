const movieModel = require('./../models/movies');

module.exports = {

    readAll(req, res) {

        movieModel.find()

            .then((response) => {
                res.send({
                    count: response.length,
                    movies: response
                });
            })

            .catch((err) => {
                res.send({
                    success: false,
                    message: err
                });
            });
    },

    read(req, res) {

        movieModel.findById(req.params.id)

            .then((response) => {
                if (response) {
                    res.send({
                        movie: response
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'There is no movie with the following ID: ' + req.params.id
                    });
                }
            })

            .catch((err) => {
                res.send({
                    success: false,
                    message: err
                });
            });
    },

    create(req, res) {
        const body = req.body;

        if (body.title && body.duration) {

            movieModel.create({
                title: body.title,
                duration: body.duration
            })
                .then((response) => {
                    res.send({
                        success: true,
                        message: 'New movie created successfully!',
                        movie: {
                            _id: response._id,
                            title: response.title,
                            duration: response.duration
                        }
                    });
                })

                .catch((err) => {
                    res.send({
                        success: false,
                        message: err
                    });
                });

        } else {
            res.send({
                success: false,
                message: 'To create a new movie you need both (title, duration)!'
            });
        }
    },

    delete(req, res) {

        movieModel.findByIdAndRemove(req.params.id)
            .then((response) => {
                res.send({
                    success: true,
                    message: response.title + ' deleted successfully!',
                });
            })

            .catch((err) => {
                res.send({
                    success: false,
                    message: err
                });
            });
    }
};
