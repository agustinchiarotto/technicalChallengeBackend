# Challenge para candidatos a Backend Developers - Kin+Carta

**Guillermo Agustín Chiarotto**
Email: Agusgc_99@hotmail.com
Phone: +542994575660
Linkedin: https://www.linkedin.com/in/agustinchiarotto/

[![Generic badge](https://img.shields.io/badge/node->=v12.18.3-green.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/npm-v6.14.8-green.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/mongo-v4.4.1-green.svg)](https://shields.io/)

---

**Objective**
The objective of this code is to respond to the functionality presented in the Kin+Carta backend challenges. It has different endpoints detailed in the api.html file.

---

**Technologies**
This challenge is solved principally with NodeJs, Express and Mongoose. Besides that, it uses Jest for testing. It also has different config files for globally set the prettier configuration for all the project and the node version needed to run this server.

---

**Documentation**
The file api.html has the entire documentation for this API. There you could find a description of each endpoint, with his parameters, responses, and examples.

---

**Testing**
There is a db manager (dbManager.js) that allows creating a virtual database to be able to carry out all the tests without having to modify the real database

---

**Instalation**

- Before you clone this project make sure you have installed the following requirements in your environment:
  - [**NodeJS & NPM**](https://nodejs.org/en/download/package-manager/)
  - [**MongoDB**](https://www.mongodb.com/try/download/community) (MongoClient needs to be up and running)
- Run command `npm i` on the same route as package.json file.
- If you are ussing nvm (node version manager), run `nvm use`. You need at least version 12.18.3 to run this server.

---

**Execution**

- To start running the server use the command: `npm start`. From this point the API is ready to be used.
- To start teting on the server use command: `npm test`.
- If you want to create and save on you databse mockdata use the comand `npm mockdata`.

```
There are some environment variables you can change:
* **NODE_ENV:** sets the environment you are working on (default: development).
* **API_HOSTNAME:** sets the API's hostname (default: 127.0.0.1)
* **API_PORT:** sets the API's port (default: 3000).
* **DB_HOSTNAME:** sets the database hostname (default: 127.0.0.1).
* **DB_PORT:** sets the database port (default: 27017).

Find more information about the API's endpoints in the api.html file.



```
