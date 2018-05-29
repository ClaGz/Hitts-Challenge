module.exports = function(app) {
	var User = app.models.user;
	var dateFormat = require('dateFormat');

	//todo - por isso sem require
	var userModel = require('../models/user');

	var UserController = {
		/*
		TODO - implementar aqui ou num login controller :D
		login: (req, res) => {
			// If this function gets called, authentication was successful.
			// `req.user` contains the authenticated user.
			res.send(req.user);
		},*/
		//todo - make queryParams work!
		find: (req, res) => {
			let query = (req.query.id) ? User.findOne({'_id': req.query.id}) : User.find();

			query.exec((err, user)=>{
				if(err)
					return res.status(500).send("Ocorreu um erro ao buscar os usuários");
				res.send(user);
			})
		},
		//todo - make queryParams work!
		findOne: (req, res) => {
			if(!req.params.id)
				return res.status(404).send('Usuário não encontrado');

			User.findOne({'_id': req.params.id}).exec((err, user)=>{
				if(err)
					return res.status(500).send("Ocorreu um erro ao buscar o usuário");
				res.send(user);
			})
		},
		create: (req, res) => {
			if(!req.body)
				return res.status(400).send('Atributos inválidos');

			//TODO - externalizar para um middleware ou num service de validação
			req.checkBody('name', 'Nome é obrigatório').notEmpty();
			req.checkBody('email', 'Email é obrigatório').notEmpty();
			req.checkBody('password', 'Senha é obrigatória').notEmpty;
			req.checkBody('confirmPassword', 'A confirmação de senha está diferente').equals(req.body.password);			

			var errors = req.validationErrors();

			if(errors)
				return res.status(400).send(errors);
			else {
				//REFATORAR
				var user = new User();
				user.name = req.body.name;
				user.email = req.body.email;
				user.password = req.body.password;

				userModel.createUser(user, (err, user)=>{
					if(err) 
						return res.send({error: err});
					res.send(user);
				})
			}
		},
		update: (req, res) => {
			res.send('try again, not ready yet!');
		},
		delete: (req, res) => {
			res.send('try again, not ready yet!');
		}
	}
	return UserController;
}