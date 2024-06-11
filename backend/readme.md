# Backend for "Shop" project

## Microservices list

- shop
- auth
- payments
- api-gateway

## Install

### For Mac/Linux

1. Install dependencies in root project and in the each microservice:

```bash
npm install
```

2. Add values to .env files in each microservice

Copy content of ".example.env" files to the ".env" files

### For Window

1. Install dependencies in root project and in the each microservice:

```bash
npm install
```

2. Install dependencies for all microservice:

**Warning:** please use bash terminal. It supports `cd` command.

For "common" module:

```bash
cd common && npm install && npm run build && npm link
```

For "auth" service:

```bash
cd auth && npm install && npm link common
```

For "api-gateway" service:

```bash
cd api-gateway && npm install && npm link common
```

For "payments" service:

```bash
cd payments && npm install && npm link common
```

For "shop" service:

```bash
cd shop && npm install && npm link common
```

## Development mode

### For Mac/Linux

To run all microservices with api-gateway via PM2 in **development** mode run following command in project root:

```bash
npm start
```

### For Windows

In the root of project:

```bash
node develop.mjs
```
