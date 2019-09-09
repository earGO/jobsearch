const mongoose = require('mongoose');

InterviewSchema = new mongoose.Schema({
	companyId: mongoose.Schema.Types.ObjectId,
	questions: [
		{
			questionId: mongoose.Schema.Types.ObjectId,
			title: String
		}
	]
});

module.exports = mongoose.model('Interview', InterviewSchema, 'Interview');
