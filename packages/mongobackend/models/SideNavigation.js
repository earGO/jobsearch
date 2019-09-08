const mongoose = require('mongoose');

SideNavigationSchema = new mongoose.Schema({
	icon: String,
	displayedTitle: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model(
	'SideNavigation',
	SideNavigationSchema,
	'SideNavigation'
);
