require('dotenv').config({path: __dirname + '/.env'});
const compression = require('compression');
const express = require('express');
const _ = require('lodash');
const { render } = require('ejs');
const app = express();
const { checkUrl } = require('./middleware/urlMiddleware');
const tools42 = require('./library/tools42')

// define global language variable
global.lang = 'it';
global.production = false;
if (process.env.NODE_ENV === "production") {global.production = true}

// carica i moduli delle route
const itRoutes = require('./routes/itRoutes');
const enRoutes = require('./routes/enRoutes');

// avvio di base
app.set('view engine', 'ejs');
const server = app.listen(process.env.PORT, () => {
    const port = server.address().port;
    if (process.env.NODE_ENV == "development") {
        console.log(`Server in esecuzione sulla porta ${port} && Testato con Node v.20.10.0`);
    }
});

app.use(express.json());
app.set('x-powered-by', false)
app.set('trust proxy', true)

// ATTIVARE IN PRODUZIONE
app.use(compression()); 

app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));

app.get('/', checkUrl, (req, res) => { res.redirect(`/${lang}`);});

app.use('/it', checkUrl, itRoutes);
app.use('/en', checkUrl, enRoutes);

//avoid 404 by 301 redirect in dbTable else return 404
app.use( (req,res) => {
    const var404=tools42.avoid404(req.protocol + '://' + req.get('host') + req.originalUrl, 'json');
    if (var404 != null) { res.redirect(301, req.protocol + '://' + req.get('host') + var404) } 
    else { res.status(404).render(`404-${lang}`,  {nerror:404, titolo:"404"} ) }
} )