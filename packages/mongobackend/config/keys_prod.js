module.exports = {
	/*======================Facebook auth credent========================*/
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	CALLBACK_URL: process.env.CALLBACK_URL,

	/*======================MongoDB credent========================*/
	MONGODB_URI: 'mongodb://localhost/jobsearch',

	/*======================CORS domains whitelist========================*/
	WHITELIST: process.env.WHITELIST
};
