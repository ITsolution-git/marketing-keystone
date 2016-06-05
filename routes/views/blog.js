var keystone = require('keystone');
var async = require('async');

exports = module.exports = {
	
	list: function(req,res){
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		// Init locals
		locals.data = {
			posts: [],
		};
		
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
				locals.tags = results.items;
				next(err);
			});
		});
		
		view.on('init',function(next){
			
			var now = new Date();
			
			var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			
			var current_year  = now.getFullYear();
			var current_month = now.getMonth() + 1;
			
			var archives = [];
			
			
			
			for(var i=0;i<6;i++){
				current_month--;
				if(current_month < 0){
					current_month = 11;
					current_year--;
				}
				archives.push({
					url:'?archive='+(current_month+1 )+'-'+current_year,
					title: months[current_month] + ' ' + current_year
				});
			}
			
			locals.archives = archives;
			next();
		});
		
		view.on('init', function(next) {
			keystone.list('Post').model.find({state: 'published'}).sort('-publishedDate').limit(6).exec(function(err, results) {
				locals.recentPosts = results;
				next(err);
			});
		});
		
		// Load the posts
		view.on('init', function(next) {
			
			var tag = req.query.tag || false;
			var archive = req.query.archive || false;
			
			var q = keystone.list('Post').paginate({
					page: req.query.page || 1,
					perPage: 10,
					maxPages: 10,
					filters: {
						'state': 'published'
					}
				})
				
			q.sort('-publishedDate').populate('author');
			
			if(archive){
				var t = archive.split('-');
				if(t.length == 2){
					var d = new Date();
					var year = parseInt(t[1]),
					  month  = parseInt(t[0])-1,
					  day   = 1;
					d.setFullYear(year,month,day);
					var start = new Date(d.toISOString());//1st day of month
					d.setMonth( d.getMonth() + 1);
					var end  = new Date(d.toISOString());
					q.where({
						publishedDate:  { $gte: start, $lte: end }
					});
					var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
					locals.data.archiveSelected = months[month] +' '+ year;
				}
				
			}
			else if(tag){
				locals.data.selectedTag = tag;
				q.where({tags: tag});
			}
			
			q.exec(function(err, results) {
				locals.data.posts = results;
				next(err);
			});
			
		});
		
		// Render the view
		view.render('blog-list');
	},
	single: function(req,res){
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		
		// Set locals
		
		locals.filters = {
			post: req.params.post
		};
		locals.data = {
			posts: [],
			recentPosts: [],
			archives: [],
			tags: []
		};
		
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
				locals.tags = results.items;
				next(err);
			});
		});
		
		view.on('init',function(next){
			
			var now = new Date();
			
			var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			
			var current_year  = now.getFullYear();
			var current_month = now.getMonth() + 1;
			
			var archives = [];
			
			
			
			for(var i=0;i<6;i++){
				current_month--;
				if(current_month < 0){
					current_month = 11;
					current_year--;
				}
				archives.push({
					url:'?archive='+(current_month+1 )+'-'+current_year,
					title: months[current_month] + ' ' + current_year
				});
			}
			
			locals.archives = archives;
			next();
		});
		
		view.on('init', function(next) {
			keystone.list('Post').model.find({state: 'published'}).sort('-publishedDate').limit(6).exec(function(err, results) {
				locals.recentPosts = results;
				next(err);
			});
		});
			
		
		// Load the current post
		view.on('init', function(next) {
			
			var q = keystone.list('Post').model.findOne({
				state: 'published',
				slug: locals.filters.post
			}).populate('author');
			
			q.exec(function(err, result) {
				locals.data.post = result;
				next(err);
			});
			
		});
		
		
		
		// Render the view
		view.render('blog-single');

	}
};
