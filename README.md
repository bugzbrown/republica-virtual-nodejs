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
## Rodando o projeto
Antes de rodar o projeto, execute o npm install para puxar todas as dependências.

```bash
npm install
```
### Interface web
Ainda estou desenvolvendo as interfaces de exemplo de post e afins, porém os testes já estão todos rodando,
mostrando assim que esse método já é viável e que pode ser usado em seus projetos.

## Testes
O projeto tem um pasta de teste que pode ser rodado usando o comando:
```bash
npm test
```
### Resumo dos testes

#### validação
São rodados os testes que garantem a validação do formato do cep.
- 2 testes de formatos inválidos
- 2 testes de formaots aceitos

#### Busca
- Não achar um CEP no Republica Virtual
- Achar um CEP e salva-lo na base
- Achar outro CEP e salva-lo na base
- Buscar novamente um CEP existente para verificar que buscamos ele da base e não da RV.


## Fora o projeto
Embora o projeto seja, ao meu ver, uma boa prática - salvar os dados em base local gera consultas mais rápidas para o 
seu sistema e também ajuda reduzir o trafego para o site do RV com consultas desnecessárias - Você pode tranquilamente
usar somente uma consulta para o serviço de forma independente.

### Exemplo sem projeto
Para usar o RV, vc precisa de alguma biblioteca de HTTP - eu prefiro usar o *request*  que permite facilmente fazer chamadas
http sem muita preocupação


Importe o pacote request via comando 
```bash
npm install --save request
```

crie um arquivo js 
####arquivo.js:
```Javascript
const request = require('request');

// CEP Que vamos procurar:
let cep = "04523001";

// faz a busca
request('http://republicavirtual.com.br/web_cep.php?cep=' + cep + '&formato=json', 
  function(err, res, body){
    console.log(body);
  }
);
```


Basta rodar o arquivo na linha de comando para ver o resultado.
```bash
node arquivo.js
```
resultado em JSON:
```json
{"resultado":"1","resultado_txt":"sucesso - cep completo","uf":"SP","cidade":"S\u00e3o Paulo","bairro":"Indian\u00f3polis","tipo_logradouro":"Avenida","logradouro":"Macuco"}
```

É simples de usar, mas lembre-se, boas práticas recomendam que você adote um modelo parecido com que eu ilustro neste projeto.

