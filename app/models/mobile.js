//Mobile.js
module.exports = function (app)  {
	Schema = app.config.mongo.Schema,
	objectId = Schema.ObjectId;

	var MobileSchema = new Schema({
		model: {type: String, required: true},
		price: {type: Number, required: true},
		brand: {type: String, required: true},
		photo: {type: String, required: true},
		date: {type: String, required: true}
	});

	return app.config.mongo.model('Mobile', MobileSchema);
};