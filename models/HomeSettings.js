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
	products_bg: { type: Types.CloudinaryImage, label:'Products Section Background Image' },
	testimonials_bg: { type: Types.CloudinaryImage, label:'Testimonials Section Background Image' },
	stats_bg: { type: Types.CloudinaryImage, label:'Stats Section Background Image' },
});

h.register();