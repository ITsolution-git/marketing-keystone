var keystone = require('keystone');

exports = module.exports = {
	
	list: function(req,res){
		var view = new keystone.View(req,res);
		var locals = res.locals;
		
		view.on('init',function(next){
			keystone.list('Category').model.find().populate('sub').exec(function(err,categories){
                console.log(categories)
                locals.categories = categories;
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
		
		view.on('init', function(next) {
			keystone.list('Post').model.find({state: 'published'}).sort('-publishedDate').limit(2).exec(function(err, results) {
				locals.recentPosts = results;
				next(err);
			});
		});
		
		view.render('category-list');
	},
};