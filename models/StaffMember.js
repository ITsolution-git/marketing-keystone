var keystone = require('keystone');
var Types = keystone.Field.Types;

var s = new keystone.List('Staff Member',{ track: true, autocreate: true });

s.add({
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
	title: { type: String},
	subTitle1: { type: String},
	subdescription1: { type: Types.Html, wysiwyg: true, height: 200},
	subTitle2: { type: String},
	subdescription2: { type: Types.Html, wysiwyg: true, height: 200},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

s.register();