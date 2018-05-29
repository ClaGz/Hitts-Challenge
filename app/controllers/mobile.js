module.exports = function(app) {
	var Mobile = app.models.mobile;
	var dateFormat = require('dateFormat');

	var MobileController = {
		index: function ( req, res ) {
			res.send('index');
		},
		//todo - make queryParams work!
		find: (req, res) => {
			let query = (req.query.id) ? Mobile.findOne({'_id': req.query.id}) : Mobile.find();

			query.exec((err, mobile)=>{
				if(err)
					return res.status(500).send("Ocorreu um erro ao buscar os celulares");
				res.send(mobile);
			})
		},
		//todo - make queryParams work!
		findOne: (req, res) => {
			if(!req.params.id)
				return res.status(404).send('Celular não encontrado');

			Mobile.findOne({'_id': req.params.id}).exec((err, mobile)=>{
				if(err)
					return res.status(500).send("Ocorreu um erro ao buscar os celulares");
				res.send(mobile);
			})
		},
		create: (req, res) => {
			if(!req.body)
				return res.status(400).send('Atributos inválidos');

			//TODO - externalizar para um middleware ou num service de validação
			req.checkBody('model', 'Modelo é obrigatório').notEmpty();
			req.checkBody('price', 'Preço é obrigatório').notEmpty();
			req.checkBody('price', 'Preço precisa ser numeral').custom(val => {
				return app.validator.isFloat(val.toString().replace('.', ',') || '', {locale:'pt-BR'});
			});
			req.checkBody('brand', 'Marca é obrigatória').notEmpty();
			req.checkBody('photo', 'Foto é obrigatória').notEmpty();
			req.checkBody('date', 'Data é obrigatória').notEmpty();
			req.checkBody('date', 'Data precisa ter formato de data').custom(val=> {
				return app.validator.isISO8601(val.toString()||'') || app.validator.isRFC3339(val.toString()||'') || !isNaN(Date.parse(val));
			});

			var errors = req.validationErrors();

			if(errors)
				return res.status(400).send(errors);
			else{
				//REFATORAR
				var mobile = new Mobile();
				mobile.model = req.body.model;
				mobile.price = req.body.price.toString().replace(',', '.');
				mobile.brand = req.body.brand;
				mobile.photo = req.body.photo;
				mobile.date = req.body.date;
								
				mobile.save(function (err) {
				if(err) 
					return res.send({error: err});
				
				res.send(mobile);
			});
			}
		},
		update: (req, res) => {
			let id = req.params.id || req.query.id;
			if(!id)
				return res.status(400).send('Atributos inválidos');

			//TODO - externalizar para um middleware ou num service de validação
			req.checkBody('model', 'Modelo é obrigatório').notEmpty();
			req.checkBody('price', 'Preço é obrigatório').notEmpty();
			req.checkBody('price', 'Preço precisa ser numeral').custom(val => {
				return app.validator.isFloat(val.toString().replace('.', ',') || '', {locale:'pt-BR'});
			});
			req.checkBody('brand', 'Marca é obrigatória').notEmpty();
			req.checkBody('photo', 'Foto é obrigatória').notEmpty();
			req.checkBody('date', 'Data é obrigatória').notEmpty();
			req.checkBody('date', 'Data precisa ter formato de data').custom(val=> {
				return app.validator.isISO8601(val.toString()||'') || app.validator.isRFC3339(`${val}`||'') || !isNaN(Date.parse(val));
			});

			var errors = req.validationErrors();

			if(errors)
				return res.status(400).send(errors);
			else{
				Mobile.update(
					{"_id": id},
					{
						$set: {
							model: req.body.model,
							price: req.body.price.toString().replace(',', '.'),
							brand: req.body.brand,
							photo: req.body.photo,
							date: req.body.date
						}
					},
					{}, function(err, mobile){
	    			if (err) return res.send(500, { error: err });
	    			
	    			return res.send(mobile);
				});
			}
		},
		delete: (req, res) => {
			let id = req.params.id || req.query.id;
			if(!id)
				return res.status(404).send('Celular não encontrado');

			Mobile.remove ({"_id": id }, function(err, project) {
				if ( err ) {
					//Mostrar erros na pagina!
					res.status(500).send(err);
				}
				res.send({ message: 'Celular deletado.' });
			});
		}
	}
	return MobileController;
}