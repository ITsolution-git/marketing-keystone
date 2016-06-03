var keystone = require('keystone');
var Types = keystone.Field.Types;

var s = new keystone.List('Stats',{
	map: { name: 'title' },
	nodelete: true,
	track: true,
	nocreate: true,
	label: 'Stats Section',
    plural: 'Stats Section',
	autocreate: true
});

s.add({
	title: { type: String, default: 'Stats Section', noedit: true, hidden: true },
	stat1: {
		title: {type: String},
		value: {type: String},
		text: {type: Types.Textarea }
	},
	stat2: {
		title: {type: String},
		value: {type: String},
		text: {type: Types.Textarea }
	},
	stat3: {
		title: {type: String},
		value: {type: String},
		text: {type: Types.Textarea }
	},
	stat4: {
		title: {type: String},
		value: {type: String},
		text: {type: Types.Textarea }
	},
	stat5: {
		title: {type: String},
		value: {type: String},
		text: {type: Types.Textarea }
	},
});

s.register();