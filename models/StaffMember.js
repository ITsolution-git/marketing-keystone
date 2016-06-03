var keystone = require('keystone');
var Types = keystone.Field.Types;

var s = new keystone.List('Staff Member',{ track: true, autocreate: true });

s.add({
	image: { type: Types.CloudinaryImage },
	name: { type: String},
	title: { type: String},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

s.register();