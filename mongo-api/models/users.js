const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./movies');

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    age:{
        type: String,
        required: true
    },

    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }]
});

UserSchema.virtual('countMovies').get(() => {
    return this.movies.length;
});

UserSchema.pre('remove', (next) => {
    Movie.remove({_id: {$in : this.movies }}).then(() => {
        next();
    });
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
