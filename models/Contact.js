var keystone = require('keystone');
var Types = keystone.Field.Types;

var c = new keystone.List('Contact',{
	map: { name: 'title' },
	nodelete: true,
	track: true,
	nocreate: true,
	label: 'Contact Page',
    plural: 'Contact Page',
	autocreate: true
});

c.add({
	title: { type: String, default:'Contact Page', noedit: true},
	block1:{
		title: { type: String},
		text: { type: Types.Html, wysiwyg: true}
	},
	block2:{
		title: { type: String},
		text: { type: Types.Html, wysiwyg: true}
	}
});

c.register();