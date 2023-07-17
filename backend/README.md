
# How to run?

```bash
docker-compose up --build 
```

Если не хотите через докер и у вас есть локальная mongodb, то просто замените .env файл

```bash
# install
npm install
# test
npm run test
# Development
npm run dev
```

env example:

```txt
PORT=3000
NODE_ENV=development
MONGO_HOST=mongo
MONGO_USERNAME=admin
MONGO_PASSWORD=root
MONGO_PORT=27017
MONGO_DBNAME=maindb
```
