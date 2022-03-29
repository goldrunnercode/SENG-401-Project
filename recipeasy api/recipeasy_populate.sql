DROP DATABASE RECIPEASY_PERSON;
DROP DATABASE RECIPEASY_MID;
DROP DATABASE RECIPEASY_RECIPE_WRITE;
DROP DATABASE RECIPEASY_RECIPE_READ;

USE RECIPEASY_PERSON;
INSERT INTO Person (isVisible, email, password, fname, lname, isAdmin) VALUES 
	(1,'jett.email','psswd','jett','penner',0),
    (1,'tyler.email','psswd','tyler','witzke',0),
    (1,'dillon.email','psswd','dillon','matthews',0),
    (1,'ath.email','psswd','athena','MR',1);

USE RECIPEASY_RECIPE_READ;
INSERT INTO Recipe (name, category, cuisine, vegetarian, glutenFree, image, author) VALUES 
	('Spaghetti', 'dinner', 'Italian', 1, 0, 'image src = 1297836', 'jett.email'),
    ('Chicken Pot Pie', 'lunch', 'Canadian', 0, 0, 'image src = sjkbd', 'tyler.email'),
    ('Pancakes', 'breakfast', 'USA', 0, 0, 'image src = dsafhjkb', 'dillon.email');
INSERT INTO Recipe_Ingredients VALUES 
	(1,'Pasta'),(1,'Tomato sauce'),(1,'Meatballs'),
    (2,'Chicken'),(2,'Corn'),(2,'Premade Crust'),(2,'Broth'),
    (3,'Milk'),(3,'Egg'),(3,'Premade Pancake Mix'),(3,'Butter'),(3,'Syrup');
INSERT INTO Recipe_Instructions VALUES 
	(1,'cook pasta'),(1,'preheat oven to 400'),(1,'cook meatballs'),(1,'heat sauce'),(1,'pour and serve'),
    (2,'mold crust to pan'),(2,'cook chicken'),(2,'cut vegetables'),(2,'add , chicken and broth to crust'), (2,'preheat oven and cook'),
    (3,'pour mix into bowl'),(3,'add milk and egg'),(3,'cook'),(3,'serve with butter and syrup');

SELECT r.r_id, r.description, r.name as title, r.isVisible, ri.ingredient, re.instruction
FROM Recipe as r,  Recipe_Ingredients as ri, Recipe_Instructions as re
WHERE r.isVisible = 1 AND r.r_id = ri.r_id AND r.r_id = re.r_id;

USE RECIPEASY_MID;
INSERT INTO Posts (p_id, r_id) VALUES
	(1,1), (2,2), (3,3);

USE RECIPEASY_RECIPE_WRITE;
UPDATE Max_R_Id SET max_r_id = 3 WHERE max_r_id = 1;

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