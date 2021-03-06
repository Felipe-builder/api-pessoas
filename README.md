<p align="center">
  <a href="">
    <img src="./src/assets/logo.png" height="150" width="175" alt="logo" />
  </a>
</p>

<p align="center"><b>Projeto APIs REST em NodeJS (Desafio)</b></p>

<div align="center">


</div>

  <h1 align="center">API - Pessoas</h1>
  <h3 align="center"></h3>
  <p align="center" style="indent-text">resume<p>

## Pre Requisites
<a href="https://nodejs.org/en/download/"><img src="https://img.shields.io/badge/nodejs-v16.14.0-green?style=for-the-badge&logo=node.js"/></a></br>
<a href="https://www.mongodb.com/try/download/community"><img src="https://img.shields.io/badge/mongodb-yellowgreen?style=for-the-badge&logo=mongodb"/></a></br>
<a href="https://docs.npmjs.com/about-npm"><img src="https://img.shields.io/badge/npm-v8.3.1-yellow?style=for-the-badge&logo=npm"/></a></br>
<a href="https://code.visualstudio.com/download"><img src="https://img.shields.io/badge/vscode-yellow?style=for-the-badge&logo=Visual Studio Code"/></a>

# Summay

API built in nodejs whose functionality is to manipulate data from "users" and "jobs". 


## Recursos
### Consumido
>- API
>   - POST /usuarios
>   - GET /usuarios
>   - GET /usuarios/busca-data?dt_criacao=\<createAt\>
>   - GET /usuarios/busca-nome?usuario_nome=\<nome\>
>   - GET /usuarios/:id
>   - PUT /usuarios/:id
>   - DELETE /usuarios/:id
>   - POST /jobs
>   - GET /jobs
>   - GET /jobs/busca-usuario-id?usuario=\<id\>
>   - GET /jobs/busca-usuario-nome?usuario_nome=\<nome\> (BUG = falta ajustar)
>   - GET /jobs/busca-data?dt_criacao=\<createdAt\>
>   - GET /jobs/:id
>   - PUT /jobs/:id
>   - DELETE /jobs/:id

[Postman Collections](./postman/API_Pessoas.postman_collection.json)

# Compilation Guide

1. Clone the project from GitHub:

```
git clone https://github.com/Felipe-builder/api-pessoas.git
```


2. Install depencendies

```
npm install
```
 > - Connect to mongodb cloud database
 >   - Create your account at https://cloud.mongodb.com
 >   - First Case(If you want to create your own database) do: After starting your organization, in your 'database' click on 'connect 'and 'connect your application' and use the template.

> mongo -u "user" -p "password" HOSTIP --authenticationDatabase "admin" 
> to access mongo in CLI
>
>> ```
>> mongodb+srv://<username>:<password>@linkapi.lhkas.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
>> ``` 
>or
> - Second Case
>     - Send your IP so that your connection to the project database can be allowed
    
1. Run

```
npm run dev
```
or

```
npm start
```

The application will respond on port `3000`, to test if it has been correctly uploaded, just access [localhost:3000](http://localhost:3000).

To end an application just press `ctrl+c` in the terminal.

## Application access

The application will respond on port `3000`, to test if it has been correctly uploaded, just access [localhost:3000](http://localhost:3000).
test users usernames and passwords 

## References

> https://nodejs.org/docs/latest-v16.x/api/index.html

> https://www.mongodb.com/docs 

> https://mongoosejs.com/docs/api.html

> https://momentjs.com/docs/
