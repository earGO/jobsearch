const mongoose = require('mongoose');

CheckedCommentSchema = new mongoose.Schema({
	interviewId: mongoose.Schema.Types.ObjectId,
	questionId: String,
	title: String,
	checked: Boolean,
	comment: String
});

module.exports = mongoose.model(
	'CheckedComment',
	CheckedCommentSchema,
	'CheckedComment'
);
