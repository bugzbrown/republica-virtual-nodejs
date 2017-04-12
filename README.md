# republica-virtual-nodejs
Script exemplo para usar o serviço da república virtual

Importar o pacote request via comando 
```bash
npm install --save request
```
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
