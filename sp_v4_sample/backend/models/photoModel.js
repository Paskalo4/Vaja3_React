var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'name' : String,
	'path' : String,
	'postedBy' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'views' : Number,
	'likes' : Number,
	'description': String,	// Dodano polje za opis slike
	'createdAt': { type: Date, default: Date.now } // Dodano polje za datum objave
});

module.exports = mongoose.model('photo', photoSchema);
