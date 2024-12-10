<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


## Description

The project is a web application where users can create and manage groups, post available time slots for events or activities, and allow group members to reserve or cancel these slots.
Database: Postgres

*Functional Requirements*: <a href="https://github.com/VladHolobyn/reservation-project/issues/1">#1</a>
*ERD*: <a href="https://github.com/VladHolobyn/reservation-project/issues/2">#2</a>
*Postman Collection*: <a href="https://github.com/VladHolobyn/reservation-project/blob/master/src/postman/NestJS.postman_collection.json">#3</a>




## Project setup

```bash
npm install
```

Define environment variables in _.env_ file
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD
- JWT_SECRET

## Compile and run the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```