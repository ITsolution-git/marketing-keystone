var keystone = require('keystone');
var Types = keystone.Field.Types;

var w = new keystone.List('Why Choose Us',{
	map: { name: 'title' },
	nodelete: true,
	track: true,
	nocreate: true,
	label: 'Why Choose Us',
    plural: 'Why Choose Us',
	autocreate: true
});

w.add({
	title: {type: String,default:'Why Choose Us'},
	section1: {
		icon : { type: Types.Select, options: 'option 1,option2,option3',label:'Section 1 Icon'},
		title: { type: String, label: 'Section 1 Title'},
		text: { type: Types.Textarea, label: 'Section 1 Text Section'}
	},
	section2: {
		icon : { type: Types.Select, options: 'option 1,option2,option3',label:'Section 2 Icon'},
		title: { type: String, label: 'Section 2 Title'},
		text: { type: Types.Textarea, label: 'Section 2 Text Section'}
	},
	section3: {
		icon : { type: Types.Select, options: 'option 1,option2,option3',label:'Section 3 Icon'},
		title: { type: String, label: 'Section 3 Title'},
		text: { type: Types.Textarea, label: 'Section 3 Text Section'}
	},
	section4: {
		icon : { type: Types.Select, options: 'option 1,option2,option3',label:'Section 4 Icon'},
		title: { type: String, label: 'Section 4 Title'},
		text: { type: Types.Textarea, label: 'Section 4 Text Section'}
	},
	section5: {
		icon : { type: Types.Select, options: 'option 1,option2,option3',label:'Section 5 Icon'},
		title: { type: String, label: 'Section 5 Title'},
		text: { type: Types.Textarea, label: 'Section 5 Text Section'}
	},
	section6: {
		icon : { type: Types.Select, options: 'option 1,option2,option3',label:'Section 6 Icon'},
		title: { type: String, label: 'Section 6 Title'},
		text: { type: Types.Textarea, label: 'Section 6 Text Section'}
	}
});

w.register();