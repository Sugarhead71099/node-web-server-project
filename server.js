/*** Configuration ***/

const express = require('express'),
	  hbs = require('hbs'),
	  fs = require('fs');

const port = process.env.PORT || 3000;

// Start express server
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper( 'getCurrentYear', () => new Date().getFullYear() );
hbs.registerHelper( 'screamIt', (text) => text.toUpperCase() );



/*** Middleware ***/
app.use((request, response, next) => {
	let now = new Date().toString();
	let log = `${now}: ${request.method} ${request.url}`;

	console.log(log);
	fs.appendFile('server.log', `${log}\n`, (error) => {
		if ( error )
		{
			console.log('Unable to append to server.log.');
		}
	});

	next();
});

// app.use( (request, response, next) => response.render('maintenance') );

app.use(express.static(__dirname + '/public'));



/*** Routing ***/
app.get('/', (request, response) => {
	response.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome To The Homepage',
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Unable to handle request',
	});
});



// Listen on port
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});