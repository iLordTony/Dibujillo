var mongoose = require('mongoose'),
	usuarioModel = require('./schemas/usuario');

var Usuario = function(conf){
	conf = conf || {};
	this.model = usuarioModel;
}

Usuario.prototype.login = function(data, callback){
	this.model.findOneAndUpdate({
		nick: data.nick
	}, data, {upsert:true}).exec(function(err, doc){
		callback(doc);
	});
}

module.exports = Usuario;