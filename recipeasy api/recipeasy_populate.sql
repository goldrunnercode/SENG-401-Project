DROP DATABASE RECIPEASY_PERSON;
DROP DATABASE RECIPEASY_MID;
DROP DATABASE RECIPEASY_RECIPE_WRITE;
DROP DATABASE RECIPEASY_RECIPE_READ;

USE RECIPEASY_PERSON;
INSERT INTO Person (isVisible, email, password, fname, lname, isAdmin) VALUES 
	(1,'jett.email','psswd','jett','penner',0),
    (1,'tyler.email','psswd','tyler','witzke',0),
    (1,'dillon.email','psswd','dillon','matthews',0),
    (1,'kia.email','psswd','kia','korsrud',1);

USE RECIPEASY_RECIPE_READ;
INSERT INTO Recipe (name, category, cuisine, vegetarian, glutenFree, image, author) VALUES 
	('Spajetti', 'dinner', 'Italian', 1, 0, 'image src = 1297836', 'jett.email'), 
    ('Maxeroni', 'lunch', 'Italian', 1, 0, 'image src = jadjhkfg8', 'jett.email'),
    ('Tyler\'s chicken pot pie', 'lunch', 'Canadian', 0, 0, 'image src = sjkbd', 'tyler.email'),
    ('Pancakes', 'breakfast', 'USA', 0, 0, 'image src = dsafhjkb', 'dillon.email'),
    ('Turkish Salad', 'lunch', 'Turkish', 0, 1, 'image src = asfbjk', 'dillon.email'),
    ('iKia meatballs', 'dinner', 'Swedish', 0, 1, 'image src = adfjjkbd', 'kia.email');
INSERT INTO Recipe_Ingredients VALUES 
	(1,'Egg'),(1,'Flour'),(1,'Baking Soda'),
    (2, 'Mustard'), (2, 'Ketchup'),
    (3,'Chicken'),(3,'Pot'),(3,'Pie'),
    (4,'Butter'),(4,'Syrup'),(4,'Premade Pancake Mix'),
    (5,'Lettuce'),
    (6,'Money'),(6,'Car'),(6,'Local Ikea');
INSERT INTO Recipe_Instructions VALUES 
	(1,'Step 1'),(1,'Step 2'),
    (2,'Step 1'),(2,'Step 2'),
    (3,'Get chicken in pot'),(3,'make pie'),
    (4,'Put dry mix in mouth'),(4,'Add butter and syrup'),(4,'Dry heave'),
    (5,'Eat lettuce and cry cuz you are pathetic'),
    (6,'Get in car'),(6,'Go to ikea'),(6,'Buy meatballs'),(6,'Realize you are broke. Your wife left you because of how broke you are. Cry. Employees feel bad. Give free meatballs. Works every time.');

SELECT r.r_id, r.description, r.name as title, r.isVisible, ri.ingredient, re.instruction
FROM Recipe as r,  Recipe_Ingredients as ri, Recipe_Instructions as re
WHERE r.isVisible = 1 AND r.r_id = ri.r_id AND r.r_id = re.r_id;

USE RECIPEASY_MID;
INSERT INTO Posts (p_id, r_id) VALUES
	(1,1), (2,1), (3,2), (4,3), (5,3), (6,4);

USE RECIPEASY_RECIPE_WRITE;
UPDATE Max_R_Id SET max_r_id = 7 WHERE max_r_id = 1;

/*
Copy - paste arguments you can use inside of postman in order to test the functionality 
	of specific API requests:
    
Recipe:
http://localhost:8008/recipe

Get:	nothing
Post:	{"title":"Salt and Pepper Shaker","ingredients":["Pepper","Salt"], "instructions":["start by preheating the oven for 1 minute","then dump salt and pepper in oven"], "category":"breakfast","cuisine":"good cuisine", "vegetarian":1,"glutenFree":1, "image":"src = 128937183971kjahkgdsfga", "author":"jett.email"}
Delete:	need to use 	http://localhost:8008/recipe/1
Put:	{"title":"Maxeroni", "author":"jett.email", "category":"lunch","cuisine":"American","vegetarian":1,"glutenFree":0,"image":"image src = jadjhkfg8","ingredients":["Mustard","Ketchup","Meth"],"instructions":["Step 1","Step 2","Step 6"]}

*/