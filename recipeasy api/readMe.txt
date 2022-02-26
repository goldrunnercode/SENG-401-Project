To run the code, you need to first create the sql tables and information. Run the recipeasy.sql file to create everything as appropriate.
If you ever want to trash the entire database and start again (aka wipe all the information out of the database), just run the commands
DROP DATABASE <database name>   for each of the four databases.
I also have very minimal code set up for checking the databases inside of the recipeasy_populate.sql - this file is purely to test and 
honestly isn't important

Afterwards, you need to install an angular cli in the folder that has the actual project - the API is run via the server.js file and the package-lock.json file. 
Install the node modules as needed. Inside of the server.js file, you need to configure the host, username, password as you have set up on your local sql.
You can leave the database the same if you don't chnage the recipeasy.sql file.

To run the code, just run     node server.js
