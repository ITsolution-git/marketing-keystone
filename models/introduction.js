var keystone = require('keystone');
var Types = keystone.Field.Types;

var a = new keystone.List('Introduction',{
	map: { name: 'title' },
	nodelete: true,
	track: true,
	label: 'Introduction Page',
    plural: 'Introduction Page',
	autocreate: true
});

a.add({
	title: { type: String, default: 'Our Company', noedit: false},
	leftSection: {
        description: { type: Types.Html, wysiwyg: true, height: 200},
		subTitle: { type: String},
		subdescription: { type: Types.Html, wysiwyg: true, height: 200},
	},
	rightSection: {
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
	}
});

a.register();