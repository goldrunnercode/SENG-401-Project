# SENG 401 Final Project - Recipeasy

## Contributors:
- Jett Penner
- Eli St. James
- Athena McNeil-Roberts
- Tyler Witzke
- Dillon Matthews
- Mohamed Mansour
- Evan Lester

## Instructions to run locally:

This application requires nodeJS, typescript, Angular and mysql

1. Create a new folder on computer and clone repository 

2. Follow link to download mysql & mysql workbench: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/
once downloaded, create a new user using mysql client, with the following commands:

CREATE USER 'recipeasy'@'localhost' IDENTIFIED BY 'r3c1p3a5y';   
GRANT ALL PRIVILEGES ON *.* TO 'recipeasy'@'localhost' WITH GRANT OPTION;   
FLUSH PRIVILEGES;   
ALTER USER 'recipeasy'@'localhost' IDENTIFIED WITH mysql_native_password BY 'r3c1p3a5y';   
FLUSH PRIVILEGES;   

3. Within mysql workbench, run recipeasy.sql 
   - optional: if want some pre filled data, run recipeasy_populate.sql

4. In terminal, change directory to cloned SENG-401-project 

5. If not already installed:

    follow link to download nodeJS: https://nodejs.org/en/download/
    run the following commands:
        npm i mysql   
        npm install -g typescript   
        npm install -g @angular/cli   
        ng add @angular/material   
             - select first color theme (Indigo&Pink) and Y to all following questions   
        npm install   

6. Open a new terminal and, change directory to cloned SENG-401-project 

7. In first terminal navigate to 'recipeasy api' folder:   
    cd recipeasy\ api

8. In this terminal, start api with command:    
    node app.js

9. In second terminal navigate to 'recipeasy' folder:   
    cd recipeasy

10. In this terminal, start the application with command:   
    ng serve

11. In browser, go to url http://localhost:4200/
12. Create account, post recipes, etc 

## To run unit tests:

1. In terminal, change directory to cloned SENG-401-project  

2. Navigate to 'recipeasy' folder:   
    cd recipeasy

3. run command: ng test
