var keystone = require('keystone');

exports = module.exports = {
	
	list: function(req,res){
		var view = new keystone.View(req,res);
		var locals = res.locals;
		
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
		
		view.on('init', function(next) {
			keystone.list('Post').model.find({state: 'published'}).sort('-publishedDate').limit(2).exec(function(err, results) {
				locals.recentPosts = results;
				next(err);
			});
		});
		
		
		view.on('init',function(next){
			
			//actual products. includes pagination and search
			var q = keystone.list('Product').paginate({
				page: req.query.page || 1,
				perPage: 12,
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
			
			q.exec(function(err,result){
				locals.products = result;
				next(err);
			});
			
		});
		
		
	
	
		view.render('products-list');
	},
	
	single: function(req,res){
		var view = new keystone.View(req,res);
		var locals = res.locals;
		
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
		
		view.on('init', function(next) {
			keystone.list('Post').model.find({state: 'published'}).sort('-publishedDate').limit(2).exec(function(err, results) {
				locals.recentPosts = results;
				next(err);
			});
		});
		
		view.on('init',function(next){
			keystone.list('Product').model.findOne({state:'published',slug: req.params.slug }).populate('datasheets').populate('category').exec(function(err,results) {
				if(results == null){
					return res.status(404).send(keystone.wrapHTMLError('Sorry, no page could be found at this address (404)'));
				}else{
					keystone.list('Sub Category').model.findOne({'_id': results.category._id}).populate('parent').exec(function(err, cat){
						results.category = cat
						locals.product = results;
						console.log(results)
						next();
					})
				}
			});
		});
		
		view.render('products-single');
	},
	
	
};