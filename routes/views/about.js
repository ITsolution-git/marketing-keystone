var keystone = require('keystone');

exports = module.exports = function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	
	view.on('init',function(next){
		keystone.list('Product').model.find({state:'published',nav: true}).select('title slug').exec(function(err,result){
			locals.productLinks = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Testimonial').model.find({state:'published'}).sort('+sortOrder').exec(function(err,result){
			locals.testimonials = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Partner').model.find({state:'published'}).sort('+sortOrder').limit(5).exec(function(err,result){
			locals.partners = result;
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
	
	view.on('init',function(next){
		keystone.list('Stats').model.findOne().exec(function(err,result){
			locals.stats = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('About').model.findOne().populate('topSection.gallery').exec(function(err,result){
			locals.about = result;
			next(err);
		});
	});

	view.on('init',function(next){
		keystone.list('Introduction').model.findOne().exec(function(err,result){
			locals.intro = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Staff Member').model.findOne({state:'published'}).exec(function(err,result){
			locals.staff = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Category').model.find().populate('sub').exec(function(err,categories){
			locals.categories = categories;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Buy Now').model.findOne().exec(function(err,result){
			locals.buynow = result;
			next(err);
		});
	});
	
	view.render('about');
};