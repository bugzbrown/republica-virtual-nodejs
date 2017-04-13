const assert = require('assert');
const mongoose = require('mongoose');

const enderecosModelTest = require('./models/enderecos_test');
const Endereco = require('../app/models/enderecos');
// Describe tests
describe('Testar classe de enderecos', function(){
    before((done)=>{
        mongoose.connect('mongodb://localhost/testeenderecos');
        mongoose.Promise = global.Promise;
        mongoose.connection.once('open',function(){
            console.log('Connectou no banco');
            done();
        }).on('error', function(error){
            console.log('Error');
            console.log(error);
        });
    });
    enderecosModelTest.rodarTestes();
});
