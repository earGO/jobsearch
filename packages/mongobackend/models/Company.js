const mongoose = require('mongoose');

CompanySchema = new mongoose.Schema({
	title: String,
	address: String,
	website: String,
	comment: String
});

module.exports = mongoose.model('Company', CompanySchema, 'Company');
