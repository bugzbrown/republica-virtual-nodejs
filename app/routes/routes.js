const Endereco = require('../models/enderecos.js');

module.exports = function(router){
	
    router.get('/', function(req, res){
        res.render('home.ejs');
	});
    router.post('/resposta', function(req, res){
        let end = new Endereco();
        end.findCEP(req.body.txtcep).then((result)=>{
            res.render('resposta.ejs',{result:result});
        }).catch((err)=>{
            console.log('Erro',err);
        });
        
	});

    
}
