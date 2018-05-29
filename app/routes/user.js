//routes/user.js
module.exports = function(app) {
	var user = app.controllers.user;
	/*
		TODO - implementar aqui ou num routes de login :D
		app.post('/login', passport.authenticate('local'), user.login);
	*/
	app.get('/user/', user.find);
	app.get('/user/:id', user.findOne);
	app.post('/user', user.create);
	app.put('/user/:id', user.update);
	app.delete('/user/:id', user.delete);
}