var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.on('init',function(next){
		keystone.list('Product').model.find({state:'published',nav: true}).select('title slug').exec(function(err,result){
			locals.productLinks = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Product').model.find({state:'published'}).select('title slug image content.brief').limit(8).exec(function(err,result){
			locals.products = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Slider').model.find({state:'published'}).sort('+sortOrder').exec(function(err,result){
			locals.slides = result;
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

	view.on('init',function(next){
		keystone.list('Category').model.find().populate('sub').exec(function(err,categories){
			locals.categories = categories;
			next(err);
		});
	});
	
	// load six most recent posts
	view.on('init', function(next) {
		keystone.list('Post').model.find({
				'state': 'published'
			})
		.sort('-publishedDate')
		.limit(6)
		.lean()
		.exec(function(err, results) {
			var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
			for(var i=0;i<results.length;i++){
				
				var d = new Date(results[i].publishedDate).toISOString().split('T')[0].split('-');
				var month = months[parseInt(d[1])];
				var day = d[2];
				results[i].publishedDate2 = {
					month: month,
					day: day
				};
				
			}
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
		keystone.list('Why Choose Us').model.findOne().exec(function(err,result){
			locals.why = result;
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
	
	
	view.render('index');
};
