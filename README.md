<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios-new.png" />

<h3 align="center">
  Desafio 09: Relacionamentos com banco de dados no Node.js
</h3>

<blockquote align="center">“Mude você e todo o resto mudará naturalmente”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/valdirmendesdev/gostack-database-relations?color=%2304D361">

  <a href="https://valdirmendes.dev">
    <img alt="Made by Valdir mendes" src="https://img.shields.io/badge/made%20by-Valdir%20Mendes-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/valdirmendesdev/gostack-database-relations/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/valdirmendesdev/gostack-database-relations?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

Nesse desafio, foi proposto o desenvolvimento de uma aplicação para cadastro de clientes, produtos e criação de pedidos de compras.

O intuito desse desafio é promover a utilização do TypeScript, uso do banco de dados com o TypeORM e relacionamentos ManyToMany.

### Rotas da aplicação

- **`POST /customers`**: A rota recebe `name` e `email` dentro do corpo da requisição, sendo o `name` o nome do cliente a ser cadastrado. Ao cadastrar um novo cliente, um registro será criado dentro do banco de dados e será retornado o cliente criado com os campos `name`, `email`, `created_at`, `updated_at`.

- **`POST /products`**: Essa rota recebe `name`, `price` e `quantity` dentro do corpo da requisição, sendo o `name` o nome do produto a ser cadastrado, `price` o valor unitário e `quantity` a quantidade existente em estoque do produto. Com esses dados, o sistema criará um registro no banco de dados um novo produto com os seguintes campos: `name`, `price`, `quantity`, `created_at`, `updated_at` e será retornado o produto criado.

- **`POST /orders/`**: Essa rota recebe no corpo da requisição o `customer_id` e um array de produtos, contendo o `id` e a `quantity` que você deseja adicionar a um novo pedido. O sistema você deve cadastrar um novo pedido, com o cliente relacionado ao `customer_id` informado, `created_at` e `updated_at` .

**Exemplo de requisição para criação de um pedido**: JSON com o formato parecido com esse
```json
{
  "customer_id": "e26f0f2a-3ac5-4c21-bd22-671119adf4e9",
  "products": [
    {
      "id": "ce0516f3-63ae-4048-9a8a-8b6662281efe",
      "quantity": 5
    },
    {
      "id": "82612f2b-3f31-40c6-803d-c2a95ef35e7c",
      "quantity": 7
    }
  ]
}
```

**Exemplo de resposta de criação de um pedido**: JSON retornado com o formato parecido com esse
```json
{
  "id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
  "created_at": "2020-05-11T07:09:48.767Z",
  "updated_at": "2020-05-11T07:09:48.767Z",
  "customer": {
    "id": "e26f0f2a-3ac5-4c21-bd22-671119adf4e9",
    "name": "Rocketseat",
    "email": "oi@rocketseat.com.br",
    "created_at": "2020-05-11T06:20:28.729Z",
    "updated_at": "2020-05-11T06:20:28.729Z"
  },
  "order_products": [
    {
      "product_id": "ce0516f3-63ae-4048-9a8a-8b6662281efe",
      "price": "1400.00",
      "quantity": 5,
      "order_id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
      "id": "265b6cbd-3ab9-421c-b358-c2e2b5b3b542",
      "created_at": "2020-05-11T07:09:48.767Z",
      "updated_at": "2020-05-11T07:09:48.767Z"
    },
    {
      "product_id": "82612f2b-3f31-40c6-803d-c2a95ef35e7c",
      "price": "500.00",
      "quantity": 7,
      "order_id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
      "id": "ae37bcd6-7be7-47b9-b277-afee35aab4e4",
      "created_at": "2020-05-11T07:09:48.767Z",
      "updated_at": "2020-05-11T07:09:48.767Z"
    }
  ]
}
```

- **`GET /orders/:id`**: Essa rota retorna as informações de um pedido específico, identificado pelo `id` informado na rota, se existir.

## Dependências da aplicação

Para o correto funcionamento da aplicação é necessário fazer uma conexão com um banco de dados postgres. Recomendamos a seguinte configuração:

```json
{
  ...
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_desafio09",
  ...
}
```

Caso queira utilizar outras configurações, utilize o arquivo [ormconfig](./ormconfig.json) presente no projeto.

## :running: Rodando a aplicação

Para executar a aplicação, clone este repositório, entre na pasta do projeto e instale as dependências com o seguinte comando no terminal:

```bash
yarn
```

Com o postgres rodando e com o banco de dados criado, utilize o comando abaixo para criar as tabelas e relacionamentos no banco de dados.

```bash
yarn typeorm migration:run
```

Para rodar a aplicação, execute o seguinte comando no terminal:

```bash
yarn dev:server
```

Para rodar os testes automatizados, crie um banco de dados postgres com o nome **gostack_desafio09_tests** e execute o seguinte comando no terminal:

```bash
yarn test
```

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
