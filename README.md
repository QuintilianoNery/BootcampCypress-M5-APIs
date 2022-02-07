<h1 align="center">Projeto: APIs-BootcampCypress-M5 </h1>

<p align="center"><img src="API.png" width="80%"/></p>

---

## Configurando o Ambiente :gear:

- [Cypress.io](http://www.cypress.io)

- [Documentação Cypress](https://docs.cypress.io/guides/overview/why-cypress.html)

### Requisitos para instalação

- [Node.js](https://nodejs.org/en/)
- [Java 8 ou superrior caso use o Allure Report](https://javadl.oracle.com/webapps/download/AutoDL?BundleId=244036_89d678f2be164786b292527658ca1605)

### Instalação do NPM e instalação do Cypress

Na pasta do projeto abra o terminal ou no VSCode use o Ctrl + ' (aspas simples), e digite os comandos abaixo:

```shell
npm init -y
npm install --yes
npm install cypress@5.3.0 --save-dev
npm  install -D bahmutov/cy-spok
npm  install -D leite
```

### Comandos para iniciar o Cypress :gear:

#### Iniciar o Cypress no navegador:

```shell
   npx cypress open
```

#### Para executar em modo headless:

```shell
   npx cypress run
```

#### Endpoints utilizados nos testes
```
url padrão:http://treinamento-api.herokuapp.com
ping: https://treinamento-api.herokuapp.com/ping
POST:https://treinamento-api.herokuapp.com/booking
GET:https://treinamento-api.herokuapp.com/booking/{ID}
GET LISTA: https://treinamento-api.herokuapp.com/booking
GET NOME: https://treinamento-api.herokuapp.com/booking?firstname={NOME}
GET DATA: https://treinamento-api.herokuapp.com/booking?checkin={AAAA-MM-DD}
PUT: https://treinamento-api.herokuapp.com/booking/{id}
DELETE:https://treinamento-api.herokuapp.com/booking/{id}
```
