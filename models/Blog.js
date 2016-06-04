var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
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
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	tags: { type: Types.TextArray }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.schema.post('save', function() {
	
	keystone.list('Post').model.find({state: 'published'}).select('tags').exec(function(err,results){
		var allItems = [];
		console.log(results);
		for(var i=0;i<results.length;i++){
			var tags = results[i].tags;
			for(var j=0;j<tags.length;j++){
				if(allItems.indexOf(tags[j]) === -1){
					allItems.push(tags[j]);
				}
			}
			if(i===results.length - 1 ){
				console.log(allItems);
				keystone.list('Aggregate List').model.update({ slug: 'tag-aggregator' },{items:allItems},{},function(err2,numAffected){});
			}
		}
	});

});

/**
 * PostCategory Model
 * ==================
 */
Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();

var keystone = require('keystone');
var Types = keystone.Field.Types;

