// Run the code: node server.js

// Setup
const { count } = require('console');
const http = require('http');
const port = 8008;                              // Port for front-end
const mysql = require('mysql');
const { stringify } = require('querystring');
const { REPL_MODE_SLOPPY } = require('repl');
const { resourceLimits } = require('worker_threads');
//password : r3c1p3a5y
const person_db = mysql.createConnection({
    // you need to change all of these to your personal sql login information
    // keep the database the same
    host: 'localhost',
    user: 'recipeasy',
    password: 'r3c1p3a5y',
    database: 'RECIPEASY_PERSON'
});
const middle_db = mysql.createConnection({
    host: 'localhost',
    user: 'recipeasy',
    password: 'r3c1p3a5y',
    database: 'RECIPEASY_MID'
});
const recipe_read_db = mysql.createConnection({
    host: 'localhost',
    user: 'recipeasy',
    password: 'r3c1p3a5y',
    database: 'RECIPEASY_RECIPE_READ'
});
const recipe_write_db = mysql.createConnection({
    host: 'localhost',
    user: 'recipeasy',
    password: 'r3c1p3a5y',
    database: 'RECIPEASY_RECIPE_WRITE'
});
person_db.connect();
middle_db.connect();
recipe_read_db.connect();
recipe_write_db.connect();

// label
const label = 'Recipeasy: Recipes Made Easy';

// function to remove apostrophies. You need this anytime the user could put
// an apostrophe in the text, as sql syntax would break it otherwise.
function replaceApostrophe(input) {
    let re = /'/gi;
    return input.replace(re, "\\\'")
}

function updateRecipe(results, i) {
    recipe_read_db.query('SELECT * FROM Recipe WHERE r_id = ' + results[i].r_id, function(err2, results2) {
        if(err2) throw(err2)
        if(results2 != null && results2.length > 0) {
            recipe_read_db.query('UPDATE Recipe SET isVisible = ' + results[i].isVisible + ', name = \'' + replaceApostrophe(results[i].name) + 
            '\', category = \'' + replaceApostrophe(results[i].category) + '\', cuisine = \'' + replaceApostrophe(results[i].cuisine) + 
            '\', vegetarian = ' + results[i].vegetarian + ', glutenFree = ' + results[i].glutenFree + 
            ', image = \'' + replaceApostrophe(results[i].image) + '\', author = \'' + replaceApostrophe(results[i].author) + 
            '\' WHERE r_id = ' + results[i].r_id);
        } else {
            recipe_read_db.query('INSERT INTO Recipe (r_id, name, category, cuisine, vegetarian, glutenFree, image, author, isVisible) VALUES (' +
            results[i].r_id + ',\'' + replaceApostrophe(results[i].name) + '\',\'' + replaceApostrophe(results[i].category) +
            '\',\'' + replaceApostrophe(results[i].cuisine) + '\',' +  results[i].vegetarian + ',' + results[i].glutenFree + ',\'' + replaceApostrophe(results[i].image) + '\',\'' + 
            replaceApostrophe(results[i].author) + '\',' + results[i].isVisible + ')');
        }
    })
}

function updateIngredient(results, i) {
    recipe_read_db.query('SELECT * FROM Recipe_Ingredients WHERE r_id = ' + results[i].r_id + ' AND ingredient = \'' + results[i].ingredient + '\'', function(err2, results2) {
        if(err2) throw(err2)
        if(results2 == null || results2.length == 0) {
            recipe_read_db.query('INSERT INTO Recipe_Ingredients (r_id, ingredient) VALUES (' + results[i].r_id + ',\'' + results[i].ingredient + '\')')
        } 
    })
}

function updateInstructions(results, i) {
    recipe_read_db.query('SELECT * FROM Recipe_Instructions WHERE r_id = ' + results[i].r_id + ' AND instruction = \'' + results[i].instruction + '\'', function(err2, results2) {
        if(err2) throw(err2)
        if(results2 == null || results2.length == 0) {
            recipe_read_db.query('INSERT INTO Recipe_Instructions (r_id, instruction) VALUES (' + results[i].r_id + ',\'' + results[i].instruction + '\')')
        } 
    })
}


// main body of the program
const requestListener = function (req, res) {

    // convert the request into a readable format
    res.writeHead(200);
    let body = '';
    req.on('data', (chunk) => { body += chunk });

    /* identify the url they called
        if they have http://localhost:8008/recipe/2/test, 
        then url_pieces[0] = <null> and 
        url_pieces[1] = recipe and 
        url_pieces[1] = 2 and
        url_pieces[2] = test, etc
    */
    url_pieces = req.url.split('/');

    console.log('URL: ' + url_pieces[1] + ' method: ' + req.method);

    /* switch the first url link. If you want to add more urls, 
        then you have to just add more switch cases. If you want
        to add more sub urls, create a switch case inside
    */
    switch (url_pieces[1]) {
        case "recipe":
            // need the req.on in order to read it asynchronously
            req.on('end', () => {
                let obj;
                let isJson = false;
                // figure out if it's a get/put/post, etc
                switch (req.method) {
                    case "GET":         // Get All Recipes

                        /* Surround the sql calls with try/catch for errors.
                            Try not to use "select all" functions. That way we can
                            update the database without breaking the API. Make sure
                            you are using the right database, especilly when working
                            with the read vs write recipe databases
                        */
                        try {
                            recipe_read_db.query(
                                'SELECT r.r_id, r.name as title, r.category, r.cuisine, ' +
                                'r.vegetarian, r.glutenFree, r.image, r.author, ri.ingredient,  re.instruction ' +
                                'FROM Recipe as r, Recipe_Ingredients as ri, Recipe_Instructions as re ' +
                                'WHERE r.isVisible = 1 AND r.r_id = ri.r_id AND r.r_id = re.r_id',
                                function (err, results) {

                                    // handle error and null cases
                                    if (err) throw err;
                                    if (results == null || results.length == 0) res.write('null', function (err) { res.end(); })
                                    else {
                                        /* for recipes, need to also retrieve all of the 
                                            categories and ingredients. Iterating through to
                                            combine duplicates and delete other entries
                                        */
                                        return_results = [];
                                        last_r_id = -1;
                                        for (i = 0; i < results.length; i++) {
                                            // find the first instance of the recipe
                                            if (last_r_id == results[i].r_id) continue;
                                            last_r_id = results[i].r_id;

                                            // create arrays to store duplicates in

                                            results[i].ingredients = [results[i].ingredient];
                                            delete results[i].ingredient;

                                            results[i].instructions = [results[i].instruction];
                                            delete results[i].instruction;

                                            // add to return result
                                            return_results.push(results[i]);

                                            // iterate through, find duplicate recipes, combine
                                            for (j = i + 1; j < results.length; j++) {
                                                if (results[i].r_id == results[j].r_id) {

                                                    //combine ingredients
                                                    ingredient_found = false;
                                                    for (k = 0; k < results[i].ingredients.length; k++) {
                                                        if (results[i].ingredients[k] == results[j].ingredient) ingredient_found = true;
                                                    }
                                                    if (!ingredient_found) results[i].ingredients.push(results[j].ingredient);

                                                    //combine instructions
                                                    instruction_found = false;
                                                    for (k = 0; k < results[i].instructions.length; k++) {
                                                        if (results[i].instructions[k] == results[j].instruction) instruction_found = true;
                                                    }
                                                    if (!instruction_found) results[i].instructions.push(results[j].instruction);
                                                }
                                            }
                                        }

                                        // return the results, as a string, via http
                                        res.write(JSON.stringify(return_results), function (err) { res.end(); });
                                    }
                                });
                        } catch (error) { res.end(); }
                        break;
                    case "POST":        // Create Recipe

                        // convert the request to JSON to read
                        isJSON = false;
                        try {
                            obj = JSON.parse(body);
                            isJSON = true;
                        } catch (error) { }
                        if (isJSON) {
                            // work with the JSON information

                            /* don't want to insert a value into the
                                sql database with missing information.
                                The valid boolean will ensure everything
                                is there. There can be additional attributes,
                                we don't care about that.
                            */
                            let valid = true;

                            // find each attribute we need

                            let name = '';
                            if (obj.title) name = obj.title;
                            else valid = false;

                            let isVisible = 1;

                            let ingredients;
                            if (obj.ingredients && obj.ingredients.length > 0) ingredients = obj.ingredients;
                            else valid = false;

                            let instructions;
                            if(obj.instructions && obj.instructions.length > 0) instructions = obj.instructions;
                            else valid = false;

                            let category = '';
                            if(obj.category) category = obj.category;
                            else valid = false;

                            let cuisine = '';
                            if(obj.cuisine) cuisine = obj.cuisine;
                            else valid = false;

                            let vegetarian = 0;
                            if(obj.vegetarian) vegetarian = 1;

                            let glutenFree = 0;
                            if(obj.glutenFree) glutenFree = 1;

                            let image = '';
                            if(obj.image) image = obj.image;
                            else valid = false;

                            let author = '';
                            if(obj.author) author = obj.author;
                            else valid = false;

                            // let description = '';
                            // if (obj.description) description = obj.description;
                            // else valid = false;

                            // let date_posted = '';
                            // if (obj.date_posted) date_posted = obj.date_posted;
                            // else valid = false;

                            // create default values for some attributes if they are not there
                            // let likes = 0;
                            // if (obj.likes) likes = obj.likes;

                            // work with json arrays that will each become their own entries
                            // let categories;
                            // if (obj.categories && obj.categories.length > 0) categories = obj.categories;
                            // else valid = false;

                            /*  For recipes, we need to create numerous entries. We need to 
                                add elements to the recipe table, the ingredients table, the 
                                recipe category table, and then create an element in the 
                                recipe post database. We need the original r_id to do this, 
                                so we will force synchronous linearity before calling the 
                                rest of the sql functions.
                            */
                            if (valid) {
                                // get the r_id to use
                                try {
                                    recipe_write_db.query('SELECT MAX(max_r_id) as max_r_id FROM Max_R_Id', function (err, results) {
                                        if (err) throw err;
                                        if (results != null && results.length > 0) {
                                            r_id = results[0].max_r_id;

                                            // Update max_r_id
                                            recipe_write_db.query('UPDATE Max_R_Id SET max_r_id = ' + (r_id + 1) + ' WHERE max_r_id = ' + r_id);

                                            // Create Recipe
                                            recipe_write_db.query('INSERT INTO Recipe (r_id, name, category, cuisine, vegetarian, glutenFree, image, author, isVisible) VALUES (' +
                                                r_id + ',\'' + replaceApostrophe(name) + '\',\'' + replaceApostrophe(category) +
                                                '\',\'' + replaceApostrophe(cuisine) + '\',' +  vegetarian + ',' + glutenFree + ',\'' + replaceApostrophe(image) + '\',\'' + 
                                                replaceApostrophe(author) + '\',' + isVisible + ')');

                                            // Create Recipe Categories
                                            // recipe_category_query = 'INSERT INTO Recipe_Categories (r_id, category) VALUES ';
                                            // for (i = 0; i < categories.length; i++) {
                                            //     if (i != 0) recipe_category_query += ',';
                                            //     recipe_category_query += '(' + r_id + ',\'' + categories[i] + '\')';
                                            // }
                                            // recipe_write_db.query(recipe_category_query);

                                            // Create Recipe Ingredients
                                            recipe_ingredient_query = 'INSERT INTO Recipe_Ingredients (r_id, ingredient) VALUES ';
                                            for (i = 0; i < ingredients.length; i++) {
                                                if (i != 0) recipe_ingredient_query += ',';
                                                recipe_ingredient_query += '(' + r_id + ',\'' + ingredients[i] + '\')';
                                            }
                                            recipe_write_db.query(recipe_ingredient_query);

                                            // Create Recipe Instructions
                                            recipe_instruction_query = 'INSERT INTO Recipe_Instructions (r_id, instruction) VALUES ';
                                            for (i = 0; i < instructions.length; i++) {
                                                if (i != 0) recipe_instruction_query += ',';
                                                recipe_instruction_query += '(' + r_id + ',\'' + instructions[i] + '\')';
                                            }
                                            recipe_write_db.query(recipe_instruction_query);

                                            person_db.query('SELECT p_id FROM Person WHERE email = \'' + author + '\'', function(err2, results2) {

                                                if(err2) throw err2;
                                                if(results2 != null && results2.length > 0) {
                                                    p_id = results2[0].p_id;

                                                    middle_db.query('INSERT INTO Posts (p_id, r_id) VALUES (' + p_id + ',' + r_id + ')');
                                                }
                                            })

                                            // Create entry in middle database
                                        }
                                    })
                                } catch (error) { }
                            } else res.end();
                        }
                        res.end();
                        break;
                    case "DELETE":      // Delete a Recipe
                        if (url_pieces[2]) {
                            r_id = url_pieces[2];
                            try {
                                recipe_read_db.query('SELECT * FROM Recipe WHERE r_id = ' + r_id, function (err, results) {
                                    if (err) throw err;
                                    if (results != null && results.length > 0) {
                                        recipe_write_db.query('INSERT INTO Recipe (r_id, name, category, cuisine, vegetarian, glutenFree, image, author, isVisible, date_posted, likes, description) VALUES (' +
                                            r_id + ',\'' + results[0].name + '\',\'' + results[0].category + '\',\'' + results[0].cuisine + '\',' + results[0].vegetarian + ',' +
                                            results[0].glutenFree + ',\'' + results[0].image + '\',\'' + results[0].author + '\',0,\'' + results[0].date_posted + '\',' + results[0].likes + ',\'' + results[0].description + '\')');
                                    }
                                })
                            } catch (error) { }
                        }
                        res.end();
                        break;
                    case "PUT":         // Update Recipe

                        // convert the request to JSON to read
                        isJSON = false;
                        try {
                            obj = JSON.parse(body);
                            isJSON = true;
                        } catch (error) { }
                        if (isJSON) {
                            // work with the JSON information

                            let valid = true;

                            // find each attribute we need

                            let name = '';
                            if (obj.title) name = obj.title;
                            else valid = false;

                            /* if you do normal if statements on integers, in typescript, you
                                could hit an "if(0)" case, which would cause it to error and fail
                                The try catch method ensures it behaves appropriately and treats 
                                it like a full integer. Need to do this for all integers and bools
                                except for id's, because they cannot be 0.
                            */

                            let isVisible = 1;

                            let ingredients;
                            if (obj.ingredients && obj.ingredients.length > 0) ingredients = obj.ingredients;
                            else valid = false;

                            let instructions;
                            if(obj.instructions && obj.instructions.length > 0) instructions = obj.instructions;
                            else valid = false;

                            let category = '';
                            if(obj.category) category = obj.category;
                            else valid = false;

                            let cuisine = '';
                            if(obj.cuisine) cuisine = obj.cuisine;
                            else valid = false;

                            vegetarian = obj.vegetarian;
                            try {
                                if (vegetarian);
                            } catch (error) { valid = false; }

                            glutenFree = obj.glutenFree;
                            try {
                                if (glutenFree);
                            } catch (error) { valid = false; }

                            let image = '';
                            if(obj.image) image = obj.image;
                            else valid = false;

                            let author = '';
                            if(obj.author) author = obj.author;
                            else valid = false;

                            // likes = obj.likes;
                            // try {
                            //     if (likes > -1);
                            // } catch (error) { valid = false; }
                            
                            // let categories;
                            // if (obj.categories && obj.categories.length > 0) categories = obj.categories;
                            // else valid = false;

                            if (valid) {
                                try {
                                    recipe_read_db.query('SELECT r_id FROM Recipe WHERE name = \'' + replaceApostrophe(name) + '\' AND author = \'' + replaceApostrophe(author) + '\' AND isVisible = 1', function(err, results) {
                                        if (err) throw err;
                                        if (results != null && results.length > 0) {
                                            r_id = results[0].r_id;
                                        
                                            // Create Recipe
                                            recipe_write_db.query('INSERT INTO Recipe (r_id, name, category, cuisine, vegetarian, glutenFree, image, author, isVisible) VALUES (' +
                                                r_id + ',\'' + replaceApostrophe(name) + '\',\'' + replaceApostrophe(category) + '\',\'' + replaceApostrophe(cuisine) +
                                                '\',' + vegetarian + ',' + glutenFree + ',\'' + replaceApostrophe(image) + '\',\'' + replaceApostrophe(author) + '\',' + isVisible + ')');

                                            // Create Recipe Categories
                                            // recipe_category_query = 'INSERT INTO Recipe_Categories (r_id, category) VALUES ';
                                            // for (i = 0; i < categories.length; i++) {
                                            //     if (i != 0) recipe_category_query += ',';
                                            //     recipe_category_query += '(' + r_id + ',\'' + categories[i] + '\')';
                                            // }
                                            // recipe_write_db.query(recipe_category_query);

                                            // Create Recipe Ingredients
                                            recipe_ingredient_query = 'INSERT INTO Recipe_Ingredients (r_id, ingredient) VALUES ';
                                            for (i = 0; i < ingredients.length; i++) {
                                                if (i != 0) recipe_ingredient_query += ',';
                                                recipe_ingredient_query += '(' + r_id + ',\'' + ingredients[i] + '\')';
                                            }
                                            recipe_write_db.query(recipe_ingredient_query);

                                            // Create Recipe Instructions
                                            recipe_instruction_query = 'INSERT INTO Recipe_Instructions (r_id, instruction) VALUES ';
                                            for (i = 0; i < instructions.length; i++) {
                                                if (i != 0) recipe_instruction_query += ',';
                                                recipe_instruction_query += '(' + r_id + ',\'' + instructions[i] + '\')';
                                            }
                                            recipe_write_db.query(recipe_instruction_query);
                                        }
                                    });
                                } catch (error) { }
                            } else res.end();
                        }
                        res.end();
                        break;
                    default:
                        res.end();
                }
            });
            break;
        case "middle":
            req.on('end', () => {
                let obj;
                let isJson = false;

                // determine middle functionality by url
                switch (url_pieces[2]) {
                    case "recipe":
                        // determine method
                        switch (req.method) {
                            case "GET":     // Get Saved Recipes
                                if (url_pieces[3]) {     // if there is a p_id in the address
                                    try {
                                        // Get all the r_id's corresponding to a p_id
                                        middle_db.query('SELECT r_id FROM Saves WHERE p_id = ' + url_pieces[3], function (err, results) {
                                            if (err) throw err;
                                            if (results != null && results.length > 0) {

                                                // Convert all the r_ids into a query to get the full recipe
                                                recipe_query = 'SELECT r.name, r.instructions, r.category, r.cuisine, r.vegetarian, r.glutenFree, r.image, r.author, ri.ingredient ' +
                                                    'FROM Recipe as r, Recipe_Ingredients as ri, Recipe_Instructions as re ' +
                                                    'WHERE r.isVisible = 1 AND r.r_id = ri.r_id r.r_id = re.r_id AND ('
                                                for (i = 0; i < results.length; i++) {
                                                    if (i != 0) recipe_query += ' OR ';
                                                    recipe_query += 'r.r_id = ' + results[i].r_id;
                                                }
                                                recipe_query += ')';

                                                // Get all the recipes of the saved user
                                                recipe_read_db.query(recipe_query, function (err2, results2) {
                                                    if (err2) throw err;
                                                    if (results2 == null || results2.length == 0) res.write('null', function (err2) { res.end(); })
                                                    else {
                                                        /* for recipes, need to also retrieve all of the 
                                                            categories and ingredients. Iterating through to
                                                            combine duplicates and delete other entries
                                                        */
                                                        return_results = [];
                                                        last_r_id = -1;
                                                        for (i = 0; i < results2.length; i++) {
                                                            // find the first instance of the recipe
                                                            if (last_r_id == results2[i].r_id) continue;
                                                            last_r_id = results2[i].r_id;

                                                            // create arrays to store duplicates in
                                                            // results2[i].categories = [results2[i].category];
                                                            // delete results2[i].category;
                                                            results2[i].ingredients = [results2[i].ingredient];
                                                            delete results2[i].ingredient;

                                                            results2[i].instructions = [results2[i].instruction];
                                                            delete results2[i].instruction;
                                                            // add to return result
                                                            return_results.push(results2[i]);

                                                            // iterate through, find duplicate recipes, combine
                                                            for (j = i + 1; j < results2.length; j++) {
                                                                if (results2[i].r_id == results2[j].r_id) {

                                                                    //combine categories
                                                                    // category_found = false;
                                                                    // for (k = 0; k < results2[i].categories.length; k++) {
                                                                    //     if (results2[i].categories[k] == results2[j].category) category_found = true;
                                                                    // }
                                                                    // if (!category_found) results2[i].categories.push(results2[j].category);

                                                                    //combine ingredients
                                                                    ingredient_found = false;
                                                                    for (k = 0; k < results2[i].ingredients.length; k++) {
                                                                        if (results2[i].ingredients[k] == results2[j].ingredient) ingredient_found = true;
                                                                    }
                                                                    if (!ingredient_found) results2[i].ingredients.push(results2[j].ingredient);

                                                                    instruction_found = false;
                                                                    for (k = 0; k < results2[i].instructions.length; k++) {
                                                                        if (results2[i].instructions[k] == results2[j].instruction) instruction_found = true;
                                                                    }
                                                                    if (!instruction_found) results2[i].instructions.push(results2[j].instruction);
                                                                }
                                                            }
                                                        }

                                                        // return the results, as a string, via http
                                                        res.write(JSON.stringify(return_results), function (err) { res.end(); });
                                                    }
                                                })
                                            } else res.end();
                                        });
                                    } catch (error) { res.end(); }
                                } else res.end();
                                break;
                            case "POST":    // Save Recipe
                                // convert the request to JSON to read
                                isJSON = false;
                                try {
                                    obj = JSON.parse(body);
                                    isJSON = true;
                                } catch (error) { }
                                if (isJSON) {
                                    // work with the JSON information

                                    /* don't want to insert a value into the
                                        sql database with missing information.
                                        The valid boolean will ensure everything
                                        is there. There can be additional attributes,
                                        we don't care about that.
                                    */
                                    let valid = true;

                                    // find each attribute we need
                                    let p_id = -1;
                                    if (obj.p_id) p_id = obj.p_id;
                                    else valid = false;

                                    let r_id = -1;
                                    if (obj.r_id) r_id = obj.r_id;
                                    else valid = false;


                                    if (valid) {
                                        try {
                                            // Check to see if the entry already exists
                                            middle_db.query('SELECT p_id, r_id FROM Saves WHERE p_id = ' + p_id + ' AND r_id = ' + r_id, function (err, results) {
                                                if (err) throw err;
                                                if (results == null || results.length == 0) {
                                                    // If there is no entry, create one
                                                    middle_db.query('INSERT INTO Saves (p_id, r_id) VALUES (' + p_id + ',' + r_id + ')');
                                                }
                                            });
                                        } catch (error) { }
                                    }
                                }
                                res.end();
                                break;
                            default:
                                res.end();
                        }

                        break;
                    case "user":        // Get Post User
                        if (url_pieces[3] && req.method == 'GET') {     // if there is an r_id in the address and they are requesting a get
                            try {
                                middle_db.query('SELECT p_id FROM Posts WHERE r_id = ' + url_pieces[3], function (err, results) {
                                    if (err) throw err;
                                    if (results != null && results.length > 0) {
                                        // only ever one user (unique constraint in table)
                                        person_db.query('SELECT p_id, isVisible, email, password, fname, lname, isAdmin FROM Person WHERE isVisible = 1 AND p_id = ' + results[0].p_id, function (err2, results2) {
                                            if (err2) throw err2;
                                            if (results2 != null && results2.length == 1) {
                                                // return user information
                                                res.write(JSON.stringify(results2), function (err) { res.end(); });
                                            } else res.end();
                                        });
                                    } else res.end();
                                })
                            } catch (error) { res.end(); }
                        } else res.end();
                        break;
                    default:
                        res.end();
                }
            });
            break;
        case "user":
            req.on('end', () => {
                let obj;
                let isJson = false;

                switch (req.method) {
                    case "GET":         // Get All Users
                        try {
                            person_db.query(
                                'SELECT p.email, p.password, p.fname, p.lname, p.p_id ' +
                                'FROM person as p ' +
                                'WHERE p.isVisible = 1',
                                function (err, results) {

                                    // handle error and null cases
                                    if (err) throw err;
                                    if (results == null || results.length == 0) res.write('null', function (err) { res.end(); })
                                    else {
                                        res.write(JSON.stringify(results), function (err) { res.end(); });
                                    }
                                });
                        } catch (error) { res.end(); }
                        break;
                    case "DELETE":   // Delete a User
                        if (url_pieces[2]) {
                            p_id = url_pieces[2];
                            try {
                                person_db.query('UPDATE Person SET isVisible = 0 WHERE p_id = ' + p_id)
                            } catch (error) { }

                            try {
                                middle_db.query('SELECT r_id FROM posts WHERE p_id = ' + p_id, function (err, results) {
                                    if (err) throw err;
                                    if (results != null && results.length > 0) {
                                        for (i = 0; i < results.length; i++) {
                                            recipe_read_db.query('SELECT * FROM Recipe WHERE r_id = ' + results[i].r_id, function (err2, results2) {
                                                if(err2) throw err2;
                                                if(results2 != null && results2.length > 0 {
                                                   recipe_write_db.query('INSERT INTO Recipe (r_id, fname, lname, instructions, category, cuisine, vegetarian, glutenFree, image, author, isVisible, date_posted, likes, description) VALUES (' +
                                                        results[0].r_id + ',\'' + results[0].fname + '\',\'' + results[0].lname + '\',\'' + results[0].instructions + '\',\'' + results[0].category + '\',\'' + results[0].cuisine + '\',' + results[0].vegetarian + ',' +
                                                        results[0].glutenFree + ',\'' + results[0].image + '\',\'' + results[0].author + '\',0,\'' + results[0].date_posted + '\',' + results[0].likes + ',\'' + results[0].description + '\')');
                                            })
                                        }
                                    }

                                })
                            } catch (error) { }
                        }
                        res.end();
                        break;
                    case "POST":
                        // convert the request to JSON to read
                        isJSON = false;
                        try {
                            obj = JSON.parse(body);
                            isJSON = true;
                        } catch (error) { }
                        if (isJSON) {
                            // work with the JSON information

                            /* don't want to insert a value into the
                                sql database with missing information.
                                The valid boolean will ensure everything
                                is there. There can be additional attributes,
                                we don't care about that.
                            */
                            let valid = true;

                            // find each attribute we need
                            let p_id = -1;
                            if (obj.p_id) p_id = obj.p_id;
                            else valid = false;

                            let email = '';
                            if (obj.email) email = obj.email;
                            else valid = false;

                            let password = '';
                            if (obj.password) password = obj.password;
                            else valid = false;

                            let fname = '';
                            if (obj.fname) fname = obj.fname;
                            else valid = false;

                            let lname = '';
                            if (obj.lname) lname = obj.lname;
                            else valid = false;

                            // create default values for some attributes if they are not there
                            let isAdmin = 0;

                            let isVisible = 1;

                            if (valid) {
                                // get the p_id to use
                                try {
                                    person_db.query('SELECT MAX(p_id) as max_p_id FROM Person', function (err, results) {
                                        if (err) throw err;
                                        if (results != null && results.length > 0) {
                                            p_id = results[0].max_p_id + 1;

                                            // Create User
                                            person_db.query('INSERT INTO Person (p_id, isVisible, email, password, fname, lname, isAdmin) VALUES (' +
                                                p_id + ',' + isVisible + ',\'' + replaceApostrophe(email) + '\',\'' + replaceApostrophe(password) + '\',\'' + replaceApostrophe(fname) +
                                                + '\',\'' + replaceApostrophe(lname) + '\',' + isAdmin + ')');
                                        }
                                    })
                                } catch (error) { }
                            } else res.end();
                        }
                        res.end();
                        break;
                    case "PUT":
                            // convert the request to JSON to read
                        isJSON = false;
                        try {
                            obj = JSON.parse(body);
                            isJSON = true;
                        } catch (error) { }
                        if (isJSON) {
                            // work with the JSON information

                            /* don't want to insert a value into the
                                sql database with missing information.
                                The valid boolean will ensure everything
                                is there. There can be additional attributes,
                                we don't care about that.
                            */
                            let valid = true;

                            // find each attribute we need
                            let p_id = -1;
                            if (obj.p_id) p_id = obj.p_id;
                            else valid = false;

                            let email = '';
                            if (obj.email) email = obj.email;
                            else valid = false;

                            let password = '';
                            if (obj.password) password = obj.password;
                            else valid = false;

                            let fname = '';
                            if (obj.fname) fname = obj.fname;
                            else valid = false;

                            let lname = '';
                            if (obj.lname) lname = obj.lname;
                            else valid = false;

                            let isAdmin = -1;
                            if (obj.isAdmin) isAdmin = obj.isAdmin;
                            else valid = false;

                            // create default values for some attributes if they are not there

                            let isVisible = 1;

                            if (valid) {
                                try {
                                    // Update User
                                    person_db.query('INSERT INTO Person (p_id, isVisible, email, password, fname, ;name, isAdmin)VALUES (' +
                                        p_id + ',' + isVisible + ',\'' + replaceApostrophe(email) + '\',\'' + replaceApostrophe(password) + '\',\'' + replaceApostrophe(fname) +
                                        '\',\'' + replaceApostrophe(lname) + '\',' + isAdmin + ')');
                                } catch (error) { }
                            } else res.end();
                        }
                        res.end();
                        break;
                }
            });
            break;
        case "update":
            req.on('end', () => {
                try {
                    recipe_write_db.query('SELECT * FROM Recipe', function(err, results) {
                        if(err) throw err;
                        if(results != null && results.length > 0) {
                            for(i = 0; i<results.length; i++) {
                                updateRecipe(results, i)
                            }
                        }
                    });
                } catch(error) {}
                res.end();
            });
            break;
        case "update2":
            req.on('end', () => {
                try {
                    recipe_write_db.query('SELECT * FROM Recipe_Ingredients', function(err, results) {
                        if(err) throw err;
                        if(results != null && results.length > 0) {
                            for(i = 0; i<results.length; i++) {
                                updateIngredient(results, i);
                            }
                        }
                    });

                    recipe_write_db.query('SELECT * FROM Recipe_Instructions', function(err, results) {
                        if(err) throw err;
                        if(results != null && results.length > 0) {
                            for(i = 0; i<results.length; i++) {
                                updateInstructions(results, i);
                            }
                        }
                    });
                } catch(error) {}
                res.end();
            });
            break;
        case "update3":
            req.on('end', () => {
                try {
                    recipe_write_db.query('DELETE FROM Recipe_Ingredients WHERE r_id > 0');

                    recipe_write_db.query('DELETE FROM Recipe_Instructions WHERE r_id > 0');

                    recipe_write_db.query('DELETE FROM Recipe WHERE r_id > 0');

                } catch(error) {}
                res.end();
            });
            break;
        default:
            res.write(label, function (err) { res.end(); })
    }
}

// opens the main body up, runs program
const server = http.createServer(requestListener);
console.log(`Express server listening on port ` + port);

server.listen(port);


/* Helpful copy-paste methods:
    http://localhost:8008
    {"p_id":1, "description":"example description of a recipe", "name":"Jetts Recipe", "date_posted":"2022-03-14", "likes":4, "categories":["Italian", "Mexican", "Canadian"], "ingredients":["Egg", "Flour", "Baking Soda"]}
*/
