const mongoose = require('mongoose');

FillableSelectSchema = new mongoose.Schema({
	interviewId: mongoose.Schema.Types.ObjectId,
	questionId: String,
	title: String,
	optionsListId: mongoose.Schema.Types.ObjectId,
	selectedOption: mongoose.Schema.Types.ObjectId,
	comment: String
});

module.exports = mongoose.model(
	'FillableSelect',
	FillableSelectSchema,
	'FillableSelect'
);
