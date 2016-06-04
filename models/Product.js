var keystone = require('keystone');
var Types = keystone.Field.Types;

var Product = new keystone.List('Product', {
	autocreate: true,
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	track: true
});

Product.add({
	title: { type: String, required: true, initial: true, default: 'Pending Product'},
	image: {
		type: Types.LocalFile, 
		dest: 'public/ul/',
		allowedtypes: ['image/jpeg','image/png','image/gif','image/bmp'],
		fileName: function(item,file){
			var n = ''+item.title;
			n = n.toLowerCase();
			n = n.replace(/[^a-zA-Z0-9 ]/g,"").replace(' ','-');
			return n + '.' + file.extension;
		},
		format: function(item, file){
			return '<img src="../../ul/'+file.filename+'" />';
		}
	},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	showFeatures: { type: Types.Boolean, default: true},
	feature1:{
		title: { type: String, label:'Feature 1 Title', dependsOn: { showFeatures: true } },
		text: { type: Types.Textarea, label:'Feature 1 Title', dependsOn: { showFeatures: true } },
	},
	feature2:{
		title: { type: String, label:'Feature 2 Title', dependsOn: { showFeatures: true } },
		text: { type: Types.Textarea, label:'Feature 2 Title', dependsOn: { showFeatures: true } },
	},
	feature3:{
		title: { type: String, label:'Feature 3 Title', dependsOn: { showFeatures: true } },
		text: { type: Types.Textarea, label:'Feature 3 Title', dependsOn: { showFeatures: true } },
	},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	nav: { type: Types.Boolean, default: false, label:'Shown In Navbar Products Dropdown', index: true },
	datasheets: { type: Types.Relationship, ref:'Data Sheet', hidden: true, many: true}
});

Product.register();