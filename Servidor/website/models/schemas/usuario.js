var mongoose = require('mongoose'),
	schemas = mongoose.Schema;

var usuarioSchema = new schemas({
	nick: {type:String, required:true}
});

var Usuario = mongoose.model('usuarioSchema', usuarioSchema);

module.exports = Usuario;