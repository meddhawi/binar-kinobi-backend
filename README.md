## **Binar-Kinobi-BackEnd Challenge**

### Important Notes
* Code uses Node.JS
* [Sequelize](https://sequelize.org/) ORM is used. 
* Postgres is required for development
* Run the postman API using the link `http://localhost:3000/`

### Setup for development
* clone repo `git remote add origin https://github.com/meddhawi/binar-kinobi-challenge.git`
* Install necessary dependencies `npm install` on terminal
* Copy `.env.example` file to `.env`
* Create Database with Sequelize `npx sequelize db:create`
* Migrate the database `npx sequelize db:migrate`
* Run the seed data as an example `npx sequelize-cli db:seed:all`
* Run the code using `npm start` or `npm run dev`

### Testing the API using Postman

