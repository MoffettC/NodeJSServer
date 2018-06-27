//NodeJS server 
//server side code in /api/ url
//while client side angular might be in /app/ url

const express = require('express'); //requires express framework
const app = express(); //initializes framework

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //parses for post requests

const cors = require('cors');
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions)) ; //installs cross origin resource sharing, so front-end code can call backend code that may be under another domain (ie: /app calls to /api domain)

app.listen(8000, () => { //listens on port for start up cmd
	console.log('Server started!'); //logs to console when server started
});

app.route('/api/cats').get((req, res) => { //if get request to this URL
	res.send({ //respond by sending JSON back
		cats: [{ name: 'lilly' }, { name: 'lucy' }]
	})
});

app.route('/api/cats/:name').get((req, res) => { //requests specific name, based on name route parameter, ':' means dynamic var
	const requestedCatName = req.params['name'] //request to get name
	//search db is one is there
	res.send({ name: requestedCatName }); //respond with name
}); 

app.route('/api/cats').post((req, res) => { //if posting to this URL
  	res.send(201, req.body); //201 created code
});

app.route('/api/cats/:name').put((req, res) => { //update at this URL
  	res.send(200, req.body); //200 OK code
});

app.route('/api/cats/:name').delete((req, res) => { //delete at this URL
  	res.sendStatus(204); //204 request successful, nothing returned
});