const express = require('express');
const hbs = require('hbs')
const fs = require('fs')

var app = express();
app.use(express.static(__dirname + '/public'))

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log + '\n',(err)=>{
		if(err){

			console.log('unable')
		}
	})
	next();
})

app.use((req,res,next) => {
	res.render('maintenance.hbs')
});

hbs.registerHelper('getCurrentYear',() => {
	 return new Date().getFullYear()
})


hbs.registerHelper('screamIt',(text) => {
	console.log(text)
	return text.toUpperCase();
})

app.get('/',(req, res) => {
	res.render('home.hbs',{
	pageTitle : 'Home page',
	welcomeMessage: 'welcome to website'
	})
})
		
app.get('/about',(req,res) => {
	res.render('home.hbs',{
		pageTitle:'hii home page',
		welcomeMessage : 'welcome to my home',
		// currentYear: new Date().getFullYear()
	})
});



app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'unavble to handle req'
	})
})

app.listen(3000, () => {
	console.log('server is up to 3000')
});
