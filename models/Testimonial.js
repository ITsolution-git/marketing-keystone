var keystone = require('keystone');
var Types = keystone.Field.Types;

var t = new keystone.List('Testimonial',{ track: true, autocreate: true });

t.add({
	text: { type: Types.Textarea, label: 'Quote' },
	author: {
		image: { type: Types.CloudinaryImage },
		name: { type: String},
		title: { type: String}
	},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

t.register();