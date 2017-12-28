var keystone = require('keystone');

exports = module.exports = {
	
	list: function(req,res){
		var view = new keystone.View(req,res);
		var locals = res.locals;

		view.on('init',function(next){
			keystone.list('Category').model.find().populate('sub').exec(function(err,categories){
				locals.categories = categories;
				next(err);
			});
		});
		
		view.on('init',function(next){
			keystone.list('Sub Category').model.findOne({slug: req.params.slug}).exec(function(err,category){
				locals.category = category
				keystone.list('Product').model.find({category: category._id}).exec(function(err, products){
					locals.products = products
					next(err);
				})
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
		
		view.on('init', function(next) {
			keystone.list('Post').model.find({state: 'published'}).sort('-publishedDate').limit(2).exec(function(err, results) {
				locals.recentPosts = results;
				next(err);
			});
		});
		
		view.render('category-list');
	},
};