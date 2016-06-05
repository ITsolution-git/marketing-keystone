// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var Twig = require('twig');


//set custom email classes arguments
keystone.set('custom email',{
	sendFrom: 'no-reply@jeda.hogs.xyz',
	twig: {
		path: './templates/emails/'
	},
	mailgun: {
		apiKey: 'key-2b1d1709d3206060e9465097f142c2aa',
		domain: 'jeda.hogs.xyz'
	},
	base_url: (keystone.get('env') == 'production') ? 'http://fridacommunity.org' : 'http://jeda.hogs.xyz'
});

//keystone init
keystone.init({

	'name': 'Jeda',
	'brand': 'Jeda',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'twig',

	'twig options':{ method: 'fs' },
	'custom engine':Twig.render,

	'auto update': true,
	'session': true,
	'session store options':{
		'host': '127.0.0.1',
		'port': '6379',
	},
	'auth': true,
	'user model': 'User',

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes

keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'Home': ['home-settings','sliders','why-choose-us','testimonials','partners','stats'],
	'About': ['abouts','staff-members'],
	'Footer':'footers',
	'Contact':'contacts',
	'Products': ['products','data-sheets'],
	'Blog': ['posts'],
	'Images': 'galleries',
	'Other': ['enquiries','users']
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
