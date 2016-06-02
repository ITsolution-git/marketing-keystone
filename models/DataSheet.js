var keystone = require('keystone');
var Types = keystone.Field.Types;

var ds = new keystone.List('Data Sheet',{autocreate: true});

ds.add({
	title:{type: String},
	file:{
		type: Types.LocalFile, 
		dest: 'public/ul/',
		allowedtypes: ['application/pdf','application/x-pdf','text/html'],
		fileName: function(item,file){
			var n = ''+item.title;
			n = n.toLowerCase();
			n = n.replace(/[^a-zA-Z0-9 ]/g,"").replace(' ','-');
			return n + '.' + file.extension;
		},
		format: function(item, file){
			return '<a target="_blank" href="../../ul/'+file.filename+'">View Datasheet</a>';
		}
	},
	products: { type: Types.Relationship, ref: 'Product', many: true}
});

ds.schema.post('save',function(){
	var products = this.products;
	var id = this._id;
	keystone.list('Product').model.update({
		_id: { $in : products }
	},{
		$push: { datasheets: id }
	},{
		multi: true
	},
	function(err,nAff){
		
	});
});

ds.register();