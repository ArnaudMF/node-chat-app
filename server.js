const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// Middleware qui enregistre les logs serveurs
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url} ${req.ip}`;

	console.log(`${log}`);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append server.log')
		}
	});
	next();
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/stylesheets'));
app.use(express.static(__dirname + '/public/media'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// Redirection automatique en cas de non utilisation du /
app.use((req, res, next) => {
  const test = /\?[^]*\//.test(req.url);
  if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
    res.redirect(301, req.url.slice(0, -1));
  else
    next();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageH1: 'Nos meilleurs Outils pour booster votre Webmarketing',
		welcomeMessage :'Les Outils SEO de MindFruits !',
	});
})

// Ci-après toutes les pages et sous-catégories SEO
app.get('/seo-tools', (req, res) => {
	res.render('seo/seo-tools.hbs', {
		pageH1: 'Outils SEO : Boostez votre référencement',
	});
});

app.get('/seo-tools-b', (req, res) => {
	res.render('seo/seo-tools-b.hbs', {
		pageH1: 'Outils SEO V2 : Boostez votre référencement',
	});
});


app.get('/seo-tools/meta-optimizer', (req, res) => {
	res.render('seo/meta-optimizer.hbs', {
		pageH1: 'Outil SEO : Optimisateur de métas pour Google',
	});
});

app.get('/seo-tools/crawler', (req, res) => {
	res.render('seo/mf-crawler.hbs', {
		pageH1: 'Outil SEO : Crawler de site internet',
	});
});

// Ci-après toutes les pages et sous-catégories SEA
app.get('/sea-tools', (req, res) => {
	res.render('sea/sea-tools.hbs', {
		pageH1: 'Outils SEA : Améliorez les performances de vos campagnes',
	});
});

app.get('/sea-tools/keyword-assembler', (req, res) => {
	res.render('sea/keyword-assembler.hbs', {
		pageH1: 'Outil SEA : Assembleur de mots-clés pour le SEA',
	});
});

app.get('/sea-tools/keyword-suggestor', (req, res) => {
	res.render('sea/keyword-suggestor.hbs', {
		pageH1: 'Outil SEA : Récupérez les suggestions des mots-clés Google',
	});
});

app.get('/portfolio', (req, res) => {
	res.render('portfolio.hbs', {
		pageH1: 'Find here our best Portfolio',
	});
});


app.get('/bad', (req, res) => {
	res.send({
		content: 'Error',
		errorType : '404 File not found'
	});
})

// Remplace n'importe quelle tentative d'accès par l'affichage de la page de maintenance
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs')
// });

// Renseignement de la mise en fonctionnement du serveur
app.listen(port, () => {
	console.log(`Server is up on port ${port}.`)
});

