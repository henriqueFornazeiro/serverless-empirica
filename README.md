
# Teste backend 

Implementação de função NodeJS para executar no AWS Lambda utilizando o Serverless Framework .

## Tecnologias utilizadas
  - Javascript
  - NodeJS
  - Serverless Framework

### Execução

1. Clonar o repositorio:

 ```bach
 git clone https://github.com/henriqueFornazeiro/serverless-empirica.git
 ```
 2. Instalar as dependências do projeto:

```bash
npm i
```
3. Faça uma cópia do arquivo `.env.example` e renomeie para `.env.local`;

3. Edite os valores das variáveis para suas credenciais; 

3. Execute para fazer o deploy:

```
$ run dev deploy
```

4. Após executar o deploy, deverá aparecer no terminal:

```bash
Deploying aws-node-project to stage dev ([region])

✔ Service deployed to stack aws-node-project-dev (112s)

functions:
  hello: aws-node-project-dev-hello (1.5 kB)
```
5. A função deverá ser executada no AWS Lambda após carregar o arquivo no bucket
