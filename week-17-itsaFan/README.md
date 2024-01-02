# Week 17 - Assignment

### Technology Used:

<p align="left">    
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="30"
                height="30" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="30"
                height="30" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg"
           width="30"
                height="30" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="30"
                height="30"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" width="30" height="30" />       
</p>

## Brief Description

#### Assignment Purpose:

This project is made for RevoU assignment.<br>
The purpose of this assignment is to learn about Fullstack Integration. Based on the front-end website and back-end that we developed from previous weeks, integrate it into full end to end product.

- Milestones:
  - Fullstack development fundamental.
  - Frontend and Backend Deployment on Firebase.
  - Web Quality Knowledge
  - SE best practices
  - DevOps

#### Guide to use this app

1. Git clone this repository.
2. Use `npm install` on both `client` & `functions` folder to install all depedencies.
3. Both `client` & `functions` have .env file, so you need to configure your own .env.
4. Refer to `.env.example` file on `client` & `functions` root directory.
5. Then to start the project on your local development. First on `functions`, You need to uncomment `app.listen` & comment or remove the exports
   ```javascript
   // app.listen(config.port, () => console.log(`Server is running on http://localhost:${config.port}`));
   exports.week_17_steffansim = functions.https.onRequest(app)
   ```
6. Then run `npx vite` on `client`.

### Deployment && Screenshots
**Notes: this project is deployed using Firebase provided by our instructor**<br>
#### Website Link: [Client](https://week-17-steffansim.web.app/)


#### Screenshots
![Alt text](readme_ss/image-4.png)
![Alt text](readme_ss/image.png)
![Alt text](readme_ss/image-1.png)
![Alt text](readme_ss/image-2.png)
![Alt text](readme_ss/image-3.png)
![Alt text](readme_ss/ss-5.png)



[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/B55J7eQC)
