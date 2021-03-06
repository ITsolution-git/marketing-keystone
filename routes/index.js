/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

// 
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('../mongo_express_config');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = importRoutes('./views');

// Setup Route Bindings
exports = module.exports = function (app) {

	
	//homepage
	app.get('/', routes.index);
	
	//about
	app.get('/about',routes.about);

	//about
	app.get('/category/:slug',routes.category.list);
	
	//contact
	app.all('/contact', routes.contact);
	
	//blog
	app.get('/blog/:category?', routes.blog.list);
	app.get('/blog/post/:post', routes.blog.single);
	
	//products
	app.get('/products', routes.products.list);
	app.get('/products/:slug', routes.products.single);
	
	
	
	if(keystone.get('env')=='development'){
        //mongo express
        app.use('/mongo_express', middleware.requireUser, mongo_express(mongo_express_config));
    }

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
};
