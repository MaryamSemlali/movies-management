const userController = require('./../controllers/user-controller');
const movieController = require('./../controllers/movie-controller');

module.exports = (server) => {

    /**
     * Users Routes
     */
    server.get('/users', userController.readAll);

    server.get('/user/:id', userController.read);

    server.post('/user', userController.create);

    server.delete('/user/:id', userController.delete);

    /**
     * Movies Routes
     */
    server.get('/movies', movieController.readAll);

    server.get('/movie/:id', movieController.read);

    server.post('/movie', movieController.create);

    server.delete('/movie/:id', movieController.delete);
};
