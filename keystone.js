// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var Twig = require('twig');

process.env.PORT = ~~process.env.PORT;


//set custom email classes arguments
keystone.set('custom email',{
	sendFrom: process.env.NO_REPLY,
	twig: {
		path: './templates/emails/'
	},
	mailgun: {
		apiKey: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN
	},
	base_url: process.env.BASE_URL
});

//keystone init
keystone.init({
    'debug':true,
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
    'session store': 'redis',
	'session store options':{
		'url':process.env.REDISTOGO_URL
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
	'Products': ['products','categories', 'sub-categories', 'data-sheets'],
	'Blog': ['posts'],
	'Images': 'galleries',
	'Other': ['enquiries','users', 'aggregate-lists']
});

// Start Keystone to connect to your database and initialise the web server

keystone.start({
  onStart: function(){
      console.log('keystone running');
  },
  onError: function(e){
      console.log('keystone error');
      console.log(e.toString())
  }
});
