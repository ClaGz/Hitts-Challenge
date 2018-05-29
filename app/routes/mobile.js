//routes/mobile.js
module.exports = function(app) {
	var mobile = app.controllers.mobile;
	app.get('/mobile/', mobile.find);
	app.get('/mobile/:id', mobile.findOne);
	app.post('/mobile', mobile.create);
	app.put('/mobile/:id', mobile.update);
	app.delete('/mobile/:id', mobile.delete);
}