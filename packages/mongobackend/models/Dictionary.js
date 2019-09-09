const mongoose = require('mongoose');

DictionarySchema = new mongoose.Schema({
	title: String,
	options: [
		{
			value: String
		}
	]
});

module.exports = mongoose.model('Dictionary', DictionarySchema, 'Dictionary');
