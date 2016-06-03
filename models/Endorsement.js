var keystone = require('keystone');
var Types = keystone.Field.Types;

var e = new keystone.List('Endorsement',{ track: true, autocreate: true });

e.add({
	company: {
		name: { type: String},
		logo: { type: Types.CloudinaryImage },
		link:  { type: String }
	},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

e.register();