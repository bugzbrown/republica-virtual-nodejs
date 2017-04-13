# republica-virtual-nodejs

## Projeto exemplo
Este projeto exemplo serve dois propósitos:

1) Permitir que eu entenda como funciona o desenvovlimento en NodeJs / caso de estudo

2) Dar uma opção para quem está procurando algum sistema de consulta de CEP.

O projeto usa o MongoDB para fazer um armazenamento local dos dados que são consultados no Republica Virtual. Dessa forma, consultas 
subsequentes ao CEP serão buscadas da base local e não do serviço online.

Isso acontece de forma transparente para o desenvolvedor, que recebe devolta um objeto com essa estrutura:

```Javascript
{ __v: 0,
  tipo_log: 'Rua',
  logradouro: 'Doutor Pelágio Marques',
  bairro: 'Vila Matilde',
  cidade: 'São Paulo',
  estado: 'SP',
  pais: 'Brasil',
  cep: '03512010',
  _id: 58ef97dd068f313698861eb5 }
```

### fluxo
O fluxo é bem simples:
```
Você busca o CEP usando o metodo *modelo.findCEP('00000-000')*

O CEP é valido? Se sim, fazemos um consulta na base local.
Se o CEP existe na base local, retornamos o documento.
Se o CEP não existe na base, fazemos uma consulta no Republica Virtual.
Se o CEP não existe no RV retornamos um erro avisando que não foi encontrado o CEP
Se o CEP existe, salvamos ele na base local, e retornamos o documento salvo.

```


Script exemplo para usar o serviço da república virtual

Importar o pacote request via comando 
```bash
npm install --save request
```

Seu arquivo.js:
```Javascript

const request = require('request');
// coração do script é esse... porém, será desenvolvido para contar todos os ceps que são consultados para
// evitar que sejam feitas queries desnecessárias ao servidor do RV.

// CEP Que vamos procurar:
let cep = "04523001";

// faz a busca
request('http://republicavirtual.com.br/web_cep.php?cep=' + cep + '&formato=json', 
  function(err, res, body){
    console.log(body);
  }
);
```

Eu vou subir um projeto exemplo em breve, mas isso já deve ajduar.
Basta rodar o arquivo na linha de comando para ver o resultado.
```bash
node arquivo.js
```
resultado em JSON:
```json
{"resultado":"1","resultado_txt":"sucesso - cep completo","uf":"SP","cidade":"S\u00e3o Paulo","bairro":"Indian\u00f3polis","tipo_logradouro":"Avenida","logradouro":"Macuco"}
```

