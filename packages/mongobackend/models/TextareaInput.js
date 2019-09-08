const mongoose = require('mongoose');

TextareaInputSchema = new mongoose.Schema({
	title: String,
	content: String,
	interviewId: mongoose.Schema.Types.ObjectId,
	questionId: String
});

module.exports = mongoose.model(
	'TextareaInput',
	TextareaInputSchema,
	'TextareaInput'
);
