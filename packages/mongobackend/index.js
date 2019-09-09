const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	app = express(),
	port = process.env.PORT || 5010,
	keys = require('./config/keys');

app.use(express.static('public'));
app.use(bodyParser.text());
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

const mongoDB = keys.MONGODB_URI;

mongoose.Promise = global.Promise;
//connect to mongoose
mongoose
	.connect(mongoDB, {useNewUrlParser: true})
	.then(() => console.log('MongoDB connected!'))
	.catch(err => console.log('error connecting to MongoDB\n', err));

app.listen(port, function() {
	console.log('server up and running on port', port);
});
