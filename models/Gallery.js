var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	images: {
		type: Types.LocalFiles, 
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
	}
});

Gallery.register();
