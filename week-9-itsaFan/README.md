# Simple MBanking Server using Express, MySQL, & Typeorm

### Technology Used:

<p align="left">    
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="30"
                height="30" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="30"
                height="30" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="30"
                height="30" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="30"
                height="30"/>
                
</p>

## Brief Description

Express.js, commonly referred to as Express, is a minimal and flexible web application framework for Node.js, a runtime environment that allows developers to execute JavaScript code server-side. Express.js provides a set of tools and features that make it easier to build web applications and APIs. MySQL is a powerful open-source relational database management system, to efficiently store, manage, and retrieve structured data. MySQL is widely known for its reliability, scalability, and ease of use, making it a popular choice for a variety of applications, from small-scale projects to large enterprise solutions.

#### Assignment Purpose:

This project is made for RevoU assignment.<br>
The purpose of this assignment is to implement express API for MBanking App to display the user's total balance and total expenses. The user data will be stored on MySQL, and create a CRUD operations to interact or manipulate the data on the database.

#### Guide to use this app

1. Git clone this repository.
2. Open the project and start with `npm install`, this will install all dependencies.
3. Create your own .env file (this will contain sensitive data or variables for your project.)
   - For this project, you can change the port number and secret key as you like, below is the example:

```env
PORT=8080
DB_HOST=localhost
DB_PORT=3036
DB_USER=root
DB_PASSWORD=your_password
DB_SCHEMA=your_own_schema
```

4. Run `npm start` to start the project, you will get a notification like this `Server listening on port 8080`
5. Now you have successfully run the project & refer to routes to see the endpoint.

#### Important!

You will also need API tools to help you ensure that the function you created is working properly, in my case I use `Postman`, <br>
you can install it [here](https://www.postman.com/), You will also need postman to access the endpoint for this back-end project, since it have JWT authentication & authorization to access a certain or specific endpoint.

### This project is deployed using railway.app

#### Endpoints

| Context                       | method |                                      example: body(JSON) | endpoint                                                                         |
| ----------------------------- | :----: | -------------------------------------------------------: | -------------------------------------------------------------------------------- |
| Get-All-Users                 |  get   |                                                        - | https://simple-mbanking-server-production.up.railway.app/api/users               |
| Get-User-byId                 |  get   |                                                        - | https://simple-mbanking-server-production.up.railway.app/api/users/2             |
| Create User                   |  post  |           {"username": "Steffan", "address": "Denpasar"} | https://simple-mbanking-server-production.up.railway.app/api/users/              |
| Make transaction as 'income'  |  post  | {"userId": 1,"transactionType": "income","amount": 7000} | https://simple-mbanking-server-production.up.railway.app/api/user/transactions   |
| Make transaction as 'expense' |  post  | {"userId": 1,"transactionType": "income","amount": 3000} | https://simple-mbanking-server-production.up.railway.app/api/user/transactions/  |
| Update user data              |  put   |     {"username": "Update User","address": "new address"} | https://simple-mbanking-server-production.up.railway.app/api/users/2             |
| Delete user by id             |  del   |                                                        - | https://simple-mbanking-server-production.up.railway.app/api/users/5             |
| Find-All-Transactions         |  get   |                                                        - | https://simple-mbanking-server-production.up.railway.app/api/user/transactions/  |
| Update-transaction            |  put   |             {"transactionType": "income","amount": 6000} | https://simple-mbanking-server-production.up.railway.app/api/user/transactions/2 |
| Delete-transaction            |  del   |                                                        - | https://simple-mbanking-server-production.up.railway.app/api/user/transactions/2 |




[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Z42oEjTh)
