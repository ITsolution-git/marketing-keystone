var keystone = require('keystone');
var Types = keystone.Field.Types;

var s = new keystone.List('Sub Category',{
	autocreate: true,
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true
});

s.add({
	name: { type: String, default: 'Sub Category', required: true },
	description: {
		type: Types.Textarea
	},
	parent: { type: Types.Relationship, ref: 'Category', refPath: 'sub' }
});

s.register();