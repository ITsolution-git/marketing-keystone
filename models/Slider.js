var keystone = require('keystone');
var Types = keystone.Field.Types;

var Slider = new keystone.List('Slider',{
	map: { name: 'header' },
	sortable: true,
	autocreate: true
});

Slider.add({
	header: {type: String, label: 'Header Text',default:'Untitled Slide'},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	subheader: {type: Types.Html, wysiwyg: true, height: 150, label: 'Subheader Text'},
	image: {
		type: Types.LocalFile, 
		dest: 'public/ul/',
		allowedtypes: ['image/jpeg','image/png','image/gif','image/bmp'],
		fileName: function(item,file){
			var n = ''+item.title;
			n = n.toLowerCase();
			n = n.replace(/[^a-zA-Z0-9 ]/g,"").replace(' ','-');
			return n + '.' + file.extension;
		},
		format: function(item, file){
			return '<img src="../../ul/'+file.filename+'" />';
		}
	},
	/* 
	  button visibility
	  keystone doesnt support nested dependsOn yet, so it gets its own top level field for now.
	  see issue for more details: https://github.com/keystonejs/keystone/issues/2778
	*/
	bvisible:{type: Types.Boolean, label:'Show Button'},
	button: {
		text: {type: String, label:'Button Text',dependsOn: { bvisible : true } },
		url: {type: String, label: 'Button URL',dependsOn: { bvisible: true } }
	}
});

Slider.register();