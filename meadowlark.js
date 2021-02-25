/*
    Code copied from Web Development with Express and Node, 2nd Edition
    by Ethan Brown

    Semicolons added by me, Erik L. Meyer
*/

const express = require('express');
const expressHandelbars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

const fortunes = [
    "Conquer fears",
    "Rivers need springs",
    "Don't fear unknown",
    "Pleasant surprise!",
    "Keep it simple"
]

app.use(express.static(__dirname + '/public'));

// Configure Handlebars view engine
app.engine('handlebars', expressHandelbars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about', {fortune: randomFortune});
})

// My secret page -EM
app.get('/secret', (req, res) => res.render('secret'));

// Custom 404 page
app.use((req, res) => {
    res.status(404);
    res.render('404');
})

// Custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))
