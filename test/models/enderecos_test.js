const chai = require('chai');
const should = chai.should();
const Endereco = require('../../app/models/enderecos');

const enderecosModelTest = {
    rodarTestes:()=>{
        
        /**
         * VALIDACAO DO CEP
         */
        describe('Testar Validacao de CEP', ()=>{
            it('deveria gerar erro com cep invalido "abcde343214"',(done)=>{
                let end = new Endereco({cep:'abcde343214'});
                end.validate((err)=>{
                    chai.expect(err.errors.cep).to.exist;
                    done();
                });
            });
            it('deveria gerar erro com cep invalido "01234-1234"',(done)=>{
                let end = new Endereco({cep:'01234-1234'});
                end.validate((err)=>{
                    chai.expect(err.errors.cep).to.exist;
                    done();
                });
            });
            it('deveria aceitar cep "02502-050"',(done)=>{
                let end = new Endereco({cep:'02502-050'});
                end.validate((err)=>{
                    chai.expect(err).to.be.null;
                    done();
                });
            });
            it('deveria aceitar cep "02502050"',(done)=>{
                let end = new Endereco({cep:'02502050'});
                end.validate((err)=>{
                    chai.expect(err).to.be.null;
                    done();
                });
            });
        });
        
        /**
         * BUSCAR CEP
         */
        describe('Buscar um CEP novo', ()=>{
            before((done)=>{
                // vamos zerar a base de enderecos para testar
                Endereco.remove({}).then((res)=>{done()});
            });

            it('deveria nao encontrar o CEP 99998-888 no Republica Virtual e gerar um erro', ()=>{
                let end = new Endereco();
                return (end.findCEP('99998-888'))
                .then((retorno)=>{
                        chai.expect(retorno._id).to.exist;
                    })
                .catch( (err) => {
                    chai.expect(err).to.exist;
                    chai.expect(err).be.eq('SEM RESULTADOS');
                });
            });
            it('deveria buscar o CEP 03512-010 do Republica Virtual e salvar na base', ()=>{
                let end = new Endereco();
                return (end.findCEP('03512-010'))
                    .then((retorno)=>{
                        chai.expect(retorno._id).to.exist;
                    });
            });
            
            it('deveria buscar o CEP 03513-010 do Republica Virtual e salvar na base', ()=>{
                let end = new Endereco();
                return (end.findCEP('03513-010'))
                    .then((retorno)=>{
                        chai.expect(retorno._id).to.exist;
                    });
            });
            
            it('deveria retornar o CEP 03512-010 da base e não da republica', (done) => {
                let end = new Endereco();
                end.findCEP('03512-010').then((retorno)=>{
                    // esperamos um resultado da base
                    chai.expect(retorno._id).to.exist;
                    //esperamos que tenha somente dois registros no banco
                    let tmp = Endereco.find({}).then( (res)=>{
                        chai.expect(res.length).to.be.eq(2);
                        done();
                    });
                });
            });
        });
    }
};

module.exports = enderecosModelTest;

