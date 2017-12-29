var keystone = require('keystone');
var Types = keystone.Field.Types;

var a = new keystone.List('Buy Now',{
	map: { name: 'title' },
	nodelete: true,
	track: true,
	label: 'Buy Now Section',
    plural: 'Buy Now Section',
	autocreate: true
});

a.add({
	title: { type: String, default: 'Buy Now', noedit: true},
    description: { type: Types.Html, wysiwyg: true, height: 200},
    button_title: { type: String, default: 'Buy Now', noedit: true}
});

a.register();