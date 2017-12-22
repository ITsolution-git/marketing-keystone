var keystone = require('keystone');
var Types = keystone.Field.Types;

var a = new keystone.List('About',{
	map: { name: 'title' },
	nodelete: true,
	track: true,
	nocreate: true,
	label: 'About Page',
    plural: 'About Page',
	autocreate: true
});

a.add({
	title: { type: String, default: 'About Page', noedit: true},
	topSection: {
		title: { type: String},
		description: { type: Types.Html, wysiwyg: true, height: 200},
		gallery: { type: Types.Relationship, ref: 'Gallery', index: true}
	},
	block1: {
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
		text: { type: Types.Textarea }
	},
	block2: {
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
		text: { type: Types.Textarea }
	},
	block3: {
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
		text: { type: Types.Textarea }
	},
});

a.register();