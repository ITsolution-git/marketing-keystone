var keystone = require('keystone');
var Types = keystone.Field.Types;

var f = new keystone.List('Footer',{
	nodelete: true,
	track: true,
	nocreate: true,
	label: 'Footer',
    plural: 'Footer',
	autocreate: true
});

f.add({
	backgroundImage: {
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
	text: { type: Types.Html, wysiwyg: true}
});

f.register();