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
	likes: [{ type: Schema.Types.ObjectId, ref: 'user' }], // Seznam uporabnikov, ki so glasovali za like
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'user' }], // Seznam uporabnikov, ki so glasovali za dislike
	'description': String,	// Dodano polje za opis slike
	'createdAt': { type: Date, default: Date.now } // Dodano polje za datum objave
});

module.exports = mongoose.model('photo', photoSchema);
