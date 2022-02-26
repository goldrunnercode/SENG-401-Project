USE RECIPEASY_RECIPE_READ;

INSERT INTO Recipe VALUES (1, 'Description', 'Recipe name 1', 0, 1, '2022-01-01'), (2, 'Description', 'Recipe name 2', 11, 1, '2022-01-01');
INSERT INTO Recipe_Categories VALUES (1,'Italian'), (1, 'Canadian'), (1,'Chinese'),(2, 'Italian'), (2, 'Mexican');
INSERT INTO Recipe_Ingredients VALUES (1,'Egg'),(1,'Flour'),(1,'Baking Soda'),(2, 'Mustard'), (2, 'Ketchup');

SELECT r.r_id, r.description, r.name, r.likes, r.isVisible, r.date_posted, rc.category, ri.ingredient
FROM Recipe as r, Recipe_Categories as rc, Recipe_Ingredients as ri
WHERE r.isVisible = 1 AND r.r_id = rc.r_id AND r.r_id = ri.r_id;

USE RECIPEASY_RECIPE_WRITE;
SELECT * FROM Max_R_Id;

select * from recipe;
select * from recipe_categories;
select * from recipe_ingredients;
