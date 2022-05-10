## **Binar-Kinobi-BackEnd Challenge**

### Important Notes
* Code uses Node.JS
* [Sequelize](https://sequelize.org/) ORM is used. 
* Postgres is required for development
* Run the postman API using the link `http://localhost:3000/`
* To see the documentation of each path open `http://localhost:3000/` for explanation

### Easy Setup for development
* clone repo `git remote add origin https://github.com/meddhawi/binar-kinobi-challenge.git`
* Install necessary dependencies `npm install` on cli
* Copy `.env.example` file to `.env`
* Create Database with Sequelize `npx sequelize db:create`
* Migrate the database `npx sequelize db:migrate`
* Run the seed data as an example `npx sequelize-cli db:seed:all`
* Run the code using `npm start` or `npm run dev`

### How does the code works
This code is an API built on express app imitating [Binar's Apiary Documentation](https://testbinar.docs.apiary.io/). It responds with JSON Format depending on the request and its endpoint. 
To test the API. It is suggested to use postman and use `http://localhost:3000/` with designated endpoint based on the documentation. 
> to enter `/products/` endpoint. It is important to fill in the Authorization Header with the right accessToken given when login

![image](https://user-images.githubusercontent.com/68779526/167640410-343d289b-812a-4dcc-8c69-3421d522164f.png)

#### How to use the API
* Open postman app and enter the url `http://localhost:3000/` 
* Enter register with the endpoint `http://localhost:3000/register`

![image](https://user-images.githubusercontent.com/68779526/167646584-e1ef899a-cb26-4666-9a1a-b2ba9f610634.png)
* Enter login with the credentials that you just entered

![image](https://user-images.githubusercontent.com/68779526/167647042-8c247788-fa87-4c68-a2eb-758ff3b926b0.png)

* Save the accessToken to Authorization Header

![image](https://user-images.githubusercontent.com/68779526/167647476-9d13a663-4678-468c-81cf-b7496eeb980e.png)




### Database usage and settings
> Note: it is important to create and migrate the database first
* PostgresSQL is used for database with Sequelize as its ORM. 
* Dependencies required for this ORM
  * Sequelize
  * Sequelize-cli
  * pg
  * pg-hstore
* Configuration for the database is stored within `.env.example`
* Make sure that the configuration within `.env` matched your own environment 
* The code has 2 different models: Products and Users











