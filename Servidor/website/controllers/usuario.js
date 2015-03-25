var usuarioView = require('../views/usuario'),
	usuarioModel = require('../models/usuario');

var Usuario = function(conf){
	conf = conf || {}

	this.view = new usuarioView();
	this.model = new usuarioModel();

	this.response = function(){
		this[conf.funcionalidad](conf.req, conf.res, conf.next);
	}
}

Usuario.prototype.get_index = function(req, res, next){
	object = {};
	this.view.index(res, object);
}

Usuario.prototype.post_login = function(req, res, next){
	this.model.login(req.body, function(doc){
		console.log(doc);
		if(doc !== {}){
			res.redirect('/sala/esperando/');
		}
	});
}

module.exports = Usuario;