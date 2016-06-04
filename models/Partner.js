var keystone = require('keystone');
var Types = keystone.Field.Types;

var p = new keystone.List('Partner',{ track: true, autocreate: true, sortable: true });

p.add({
	company: {
		name: { type: String},
		logo: {
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
		link:  { type: String }
	},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

p.defaultColumns = 'company.name, state|20%, publishedDate|20%';

p.register();