const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log)
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append server.log.')
		}
	});
	next();
});

// Code for maintenace that'll overwrite any other code.
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageH1: "Home Page",
		pageTitle: "Home Page"
	});
});


app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: "About Page"
	});
});

app.get('/bad', (req, res) => {
	res.send({ErrorNumber: '404',
			ErrorMessage: 'Sorry, could not find the resource on the server, bitch'
		});
});

app.listen(3000, () => {
	console.log('Server is up.')
});



// app.get('/', (req, res) => {
// 	// res.send('<h1>Hello Express!</h1>');
// 	res.send({name: 'Arnaud',
// 			likes: [
// 			'RC Model', 
// 			'Computers'
// 			]
// 		});
// });