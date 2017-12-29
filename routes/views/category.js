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
				var q = keystone.list('Product').paginate({
					page: req.query.page || 1,
					perPage: 3,
					maxPages: 24,
					filters: {
						'state': 'published'
					}
				})
				.select('title slug image content.brief');
				
				locals.productQuery = req.query.q || false;
				if(locals.productQuery){
					var exp = RegExp(locals.productQuery,'i');
					q.and([
						{ $or : [
							{'title': { $regex: exp } },
							{'content.extended': { $regex: exp } }
						] },
					]);
				}
				
				q.find({category: category._id}).exec(function(err,result){
					locals.products = result;
					next(err);
				});
				
				// keystone.list('Product').model.find({category: category._id}).exec(function(err, products){
				// 	locals.products = products
				// 	next(err);
				// })
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
		
		view.on('init',function(next){
			keystone.list('Buy Now').model.findOne().exec(function(err,result){
				locals.buynow = result;
				next(err);
			});
		});

		view.render('category-list');
	},
};