var Usuario = function(conf){
	conf = conf || {}
}

Usuario.prototype.index = function(res, object){
	res.render('index', object);
}

Usuario.prototype.login = function(res, object){
	res.render('', object);
}

module.exports = Usuario;