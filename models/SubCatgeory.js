var keystone = require('keystone');
var Types = keystone.Field.Types;

var s = new keystone.List('Sub Category',{
	map: { name: 'name' },
	nodelete: true,
	track: true,
	label: 'Sub Category',
    plural: 'Sub Category',
	autocreate: true
});

s.add({
	name: { type: String, default: 'Sub Category', required: true },
	description: {
		type: Types.Textarea
	},
	parent: { type: Types.Relationship, ref: 'Category', refPath: 'sub' }
});

s.register();