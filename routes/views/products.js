var keystone = require('keystone');

exports = module.exports = {
	
	list: function(req,res){
		var view = new keystone.View(req,res);
		var locals = res.locals;
		
		view.render('products-list');
	},
	
	single: function(req,res){
		var view = new keystone.View(req,res);
		var locals = res.locals;
		
		view.render('products-single');
	},
	
	
};