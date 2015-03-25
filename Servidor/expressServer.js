var express = require('express'),
	conf = require('../conf'),
	bodyParser = require('body-parser'),
	middlewares = require('../middlewares/admin'),
	swig = require('swig'),
	router = require('./website/router');

var ExpressServer = function(conf){
	conf = conf || {}

	//variable del servidor
	this.expressServer = express();

	//el middleware de body
	this.expressServer.use(bodyParser.urlencoded({extended:true}));

	//aqui estan los demas middlewares
	for(var middleware in middlewares){
		this.expressServer.use(middlewares[middleware]);
	}

	//esta es la configuracion de swig
	this.expressServer.engine('html', swig.renderFile);
	this.expressServer.set('view engine', 'html');
	this.expressServer.set('views', __dirname + '/website/views/templates');

	//esta es la funcionalidad de las urls
	for(var controller in router){
		for(var funcionalidad in router[controller].prototype){
			var metodo = funcionalidad.split('_')[0];
			var entorno = funcionalidad.split('_')[1];
			var data = funcionalidad.split('_')[2];
			data = (data !== undefined && metodo == 'get') ? ':data':'';
			var url = '/' + controller + '/' + entorno + '/' + data;
			this.router(metodo, funcionalidad, url, controller);
		}
	}
}

ExpressServer.prototype.router = function(metodo, funcionalidad, url, controller){
	console.log(url);
	this.expressServer[metodo](url, function(req, res, next){
		var conf = {
			'funcionalidad': funcionalidad,
			'req': req,
			'res': res,
			'next': next
		}
		var Controller = new router[controller](conf);
		Controller.response();
	});
}

module.exports = ExpressServer;
