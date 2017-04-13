
module.exports = function(router){
	
    router.get('/', function(req, res){
        res.render('home.ejs');
	});
    router.post('/resposta', function(req, res){
        res.render('resposta.ejs');
	});

    
}
