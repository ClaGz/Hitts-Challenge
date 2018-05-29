module.exports = (app) => {
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/hitts-challenge');
	return mongoose;
}