const mongoose = require('mongoose');

QuestionSchema = new mongoose.Schema({
	interviewId: mongoose.Schema.Types.ObjectId,
	title: String,
	optionsListId: mongoose.Schema.Types.ObjectId,
	selectedOptionId: mongoose.Schema.Types.ObjectId,
	comment: String
});

module.exports = mongoose.model('Question', QuestionSchema, 'Question');
