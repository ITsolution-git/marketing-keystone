var keystone = require('keystone');
var Types = keystone.Field.Types;
var mailer = require('../email')();

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	subject: { type: String, required: true },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now },
});

Enquiry.schema.pre('save', function(next) {
	var _t = this;
	this.sendNotificationEmail(function(err,result){
		if(err !== null){
			_t.sendFailure = true;
		}
		next();
	});
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {
	
	console.log('sending email');
	
	if(typeof callback !== 'function'){
		callback = function(){ next(); };
	}
	
	var enquiry = this;
		
	mailer.send('enquiry-notification',{
		to: 'stuckinabox@live.com',
		from: {
			name: 'FridaMailer',
			email: 'no-reply@frida.hogs.xyz'
		},
		subject: '[Contact Request] Frida Kahlo',
		enquiry: enquiry
	},callback);
		
};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, subject, createdAt';
Enquiry.register();
