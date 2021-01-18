const userModel = require('./../models/users');

module.exports = {

    readAll(req, res) {

        userModel.find().populate([{path: 'movies'}]).exec()

            .then((response) => {
                res.send({
                    count: response.length,
                    users: response
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

        userModel.findById(req.params.id)

            .then((response) => {
                if (response) {
                    res.send({
                        user: response
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'There is no user with the following ID: ' + req.params.id
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

        console.log(body);

        if (body.name && body.age) {

            userModel.create({
                name: body.name,
                age: body.age
            })
                .then((response) => {
                    res.send({
                        success: true,
                        message: 'New user created successfully!',
                        user: {
                            _id: response._id,
                            name: response.name,
                            age: response.age
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
                message: 'To create a new user you need both (name, age)!'
            });
        }
    },

    delete(req, res) {

        userModel.findByIdAndRemove(req.params.id)
            .then((response) => {
                res.send({
                    success: true,
                    message: response.name + ' deleted successfully!',
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
