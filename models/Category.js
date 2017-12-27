var keystone = require('keystone');
var Types = keystone.Field.Types;

var s = new keystone.List('Category',{
	autocreate: true,
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true
});

s.add({
	name: { type: String, default: 'Category', required: true },
	description: {
		type: Types.Textarea
	},
	sub: { type: Types.Relationship, ref: 'Sub Category', many: true}
});

s.register();