var keystone = require('keystone');
var Types = keystone.Field.Types;

var t = new keystone.List('Testimonial',{ track: true, autocreate: true, sortable: true });

t.add({
	text: { type: Types.Textarea, label: 'Quote' },
	author: {
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
		name: { type: String},
		title: { type: String}
	},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

t.defaultColumns = 'author.name, state|20%, publishedDate|20%';

t.register();