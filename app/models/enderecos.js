// require do mongoose para buscar dados do DB
const mongoose = require('mongoose');
// require do request para fazer chamada de http se nao houver o registro em base 
//const request = require('request');
const rp = require('request-promise');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// cria o schema de endereços
const EnderecoSchema = new Schema({
    tipo_log: String,
    logradouro: String,
    bairro: String,
    cidade: String,
    estado: String,
    pais: String,
    cep: {
        type: String,
        validate: {
            validator: function(v){
                // Mantem somente os digitos
                let vf = v.replace(/[^\d]/,'');
                // verifica se está dentro do tamanho esperado
                return (vf.length===8);
            },
            message: 'CEP inválido'
        },
        required: [true, 'CEP é requerido']
    },
    timestamps: {}
});

// Seta um indice no CEP para garantir que ele é único e responda rapidamente
EnderecoSchema.index({cep:1},{unique:true});

// remover caracteres que nao são digitos
const arrumaCEP = (cep) => {
    return cep.replace(/[^\d]/,'');
};

/**
 * Metodo personalizado para fazer a busca de CEPs
 * @param cep String - numero do CEP para ser consultado
 * */
EnderecoSchema.methods.findCEP = (cep)=>{
    return new Promise((resolve, reject)=>{
        // normalizar o cep
        cep = arrumaCEP(cep);
        
        // fazer busca em promessa
        let endp = Endereco.findOne({cep:cep}).exec();
        endp.then( (end) => {
            if (end){
                // achamos um endereco na base - resolva a promessa
                resolve(end);
            }else{
                // nao achamos um endereco - vamos buscar no republica virtual
                rp('http://republicavirtual.com.br/web_cep.php?cep=' + cep + '&formato=json')
                .then( (results) => {
                    // voltaram os resultados - vamos verificar se temos um resultado positivo
                    let json = JSON.parse(results);
                    if (json.resultado==1) {
                        // OK temos um endereço - vamos salvar ele na base
                        let tmp = {
                            tipo_log: json.tipo_logradouro,
                            logradouro: json.logradouro,
                            bairro: json.bairro,
                            cidade: json.cidade,
                            estado: json.uf,
                            pais: 'Brasil',
                            cep:cep};
                        return Endereco.create(tmp);
                    }else{
                        // nao achamos o cep no republica - rejeitar a promessa
                        reject(("SEM RESULTADOS"));
                    }
                })
                .then((results)=>{
                    if (results==undefined) reject( new Error(results))
                    // devolver o objeto de repsosta
                    resolve(results);
                })
                .catch((err) => {
                    console.log("Erro: ", err);
                });
            }
        })
        .catch((err)=>{
            console.log("error: ", err);
        });
    });
};

var Endereco = mongoose.model('Endereco', EnderecoSchema);

module.exports = Endereco;
