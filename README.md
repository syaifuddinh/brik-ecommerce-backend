
# E-Commerce Backend

## How to install
- After pull from repository,  run : yarn install
- Turn on your postgre service, create database in postgresql
- Open .env file, adjust PORT, HOST, and Postgree Configuration (database name, user, password and host)
-  Migrate and seed database with running : yarn migrate

## How to run
- After all installing procedures done, run : yarn dev
- This application would run on : http://localhost:3300, or any port did you wrote in .env

## User for login
- username : admin
- password : 12345678

## Technologies
- Typescript
- Express JS
- Knex : migrating database
- PostgreSQL

## Routes
- POST /auth/login = Login
- POST /auth/register = Registration
- GET /auth/validate = Check either user is still login or not
- POST /auth/logout = Logout
- GET /product = Homepage or List Product
- POST /product  = Creating Product
- GET /product/:id = Detail Product

## Directories
- src
    - assets
    - interfaces
    - layouts
    - models
    - pages
    - services
    - ui 
    - utils

### src
It contains main source code of this application
### config
It contains general configuration and database connector
### controllers
It contains controllers for connect route and models
### interfaces
It contains interfaces / datatypes
### middlewares
It contains middleware
### models
It contains central data processing

