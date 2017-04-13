// criar um express para podermos brincar com 
// a aplicação num ambiente user friendly

const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 8081;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// conectar com um banco de dados
// essa parte pode ser comentada pois não é necessária
// porem, é recomendado que se armazene os resultados
// consultados para evitar ficar batendo no serviço da
// republica virtual melhorando a performance do seu site

var configDB = require('./config/database.js');


// definir as rotas
mongoose.connect(configDB.url);
mongoose.Promise = global.Promise;

app.set('views', './app/views');
app.set('view engine', 'ejs');

var routes = express.Router();
require('./routes/routes.js')(routes);

app.use('/',routes);


app.listen(port);
console.log('Server running on port: ' + port);
