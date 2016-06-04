var keystone = require('keystone');
var Types = keystone.Field.Types;

var h = new keystone.List('Home Settings',{
	nodelete: true,
	track: true,
	nocreate: true,
	label: 'Settings',
    plural: 'Settings',
	autocreate: true
});

h.add({
	title: { type: String, default:'Home Settings', noedit: true},
	header_bg: {
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
		},
		label:'Site Header Background Image' 
	},
	products_bg: {
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
		},
		label:'Products Section Background Image' 
	},
	testimonials_bg: {
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
		},
		label:'Testimonials Section Background Image' 
	},
	stats_bg: {
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
		},
		label:'Stats Section Background Image' 
	}
});

h.register();