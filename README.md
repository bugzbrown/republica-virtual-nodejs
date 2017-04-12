# republica-virtual-nodejs
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

