//frontend/app.js
var express = require('express'),
	app = express();

app.use('/static', express.static(__dirname + '/app'));
app.use('/npm', express.static(__dirname + '/node_modules'));
app.use('/public', express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/app');

//set url default to = #!/
app.get('/', (req, res)=>{
	res.render('index.html');
})

app.on('listening',function(){
    console.log('ok, server is running');
});
app.listen(1337, () => console.log('Frontend started!'));