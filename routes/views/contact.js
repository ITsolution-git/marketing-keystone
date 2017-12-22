var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	
	view.on('init',function(next){
		keystone.list('Product').model.find({state:'published',nav: true}).select('title slug').exec(function(err,result){
			locals.productLinks = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Home Settings').model.findOne().exec(function(err,result){
			locals.settings = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Footer').model.findOne().exec(function(err,result){
			locals.footer = result;
			next(err);
		});
	});
	
	view.on('init',function(next) {
		keystone.list('Aggregate List').model.findOne({slug:'blog-tag-aggregator'}).exec(function(err,results){
			if(results == null)
				locals.tags = [];
			else
				locals.tags = results.items;
			
			next(err);
		});
	});
	
	view.on('init', function(next) {
		keystone.list('Post').model.find({state: 'published'}).sort('-publishedDate').limit(2).exec(function(err, results) {
			locals.recentPosts = results;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Contact').model.findOne().exec(function(err,result){
			locals.contact = result;
			next(err);
		});
	});
		
		

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, subject, message',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('contact');
};
