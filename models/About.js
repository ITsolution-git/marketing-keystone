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
		image: { type: Types.CloudinaryImage},
		title: { type: String},
		text: { type: Types.Textarea }
	},
	block2: {
		image: { type: Types.CloudinaryImage},
		title: { type: String},
		text: { type: Types.Textarea }
	},
	block3: {
		image: { type: Types.CloudinaryImage},
		title: { type: String},
		text: { type: Types.Textarea }
	},
	staff: { type: Types.Relationship, ref: 'Staff Member', index: true, many: true, label:'Our Leaders'},
});

a.register();