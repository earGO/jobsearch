const mongoose = require('mongoose');

SelectOptionsSchema = new mongoose.Schema({
	title: String,
	options: [
		{
			optionId: mongoose.Schema.Types.ObjectId,
			optionValue: String
		}
	]
});

module.exports = mongoose.model(
	'SelectOptions',
	SelectOptionsSchema,
	'SelectOptions'
);
