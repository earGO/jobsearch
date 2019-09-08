const mongoose = require('mongoose');

SelectSchema = new mongoose.Schema({
	interviewId: mongoose.Schema.Types.ObjectId,
	questionId: String,
	title: String,
	optionsListId: mongoose.Schema.Types.ObjectId,
	selectedOption: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Select', SelectSchema, 'Select');
