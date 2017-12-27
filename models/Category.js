var keystone = require('keystone');
var Types = keystone.Field.Types;

var s = new keystone.List('Category',{
	map: { name: 'name' },
	nodelete: true,
	track: true,
	label: 'Category',
    plural: 'Category',
	autocreate: true
});

s.add({
	name: { type: String, default: 'Category', required: true },
	description: {
		type: Types.Textarea
	},
	sub: { type: Types.Relationship, ref: 'Sub Category', many: true}
});

s.register();