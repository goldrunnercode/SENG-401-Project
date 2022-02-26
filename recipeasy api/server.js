// Run the code: node server.js

// Setup
const { count } = require('console');
const http = require('http');
const port = 8008;                              // Port for front-end
const mysql = require('mysql');
const { stringify } = require('querystring');
const { REPL_MODE_SLOPPY } = require('repl');
const person_db = mysql.createConnection({    
    // you need to change all of these to your personal sql login information
    // keep the database the same
    host     : 'localhost',
    user     : 'recipeasy',
    password : 'r3c1p3a5y',
    database : 'RECIPEASY_PERSON'
});
const middle_db = mysql.createConnection({
    host     : 'localhost',
    user     : 'recipeasy',
    password : 'r3c1p3a5y',
    database : 'RECIPEASY_MID'
});
const recipe_read_db = mysql.createConnection({
    host     : 'localhost',
    user     : 'recipeasy',
    password : 'r3c1p3a5y',
    database : 'RECIPEASY_RECIPE_READ'
});
const recipe_write_db = mysql.createConnection({
    host     : 'localhost',
    user     : 'recipeasy',
    password : 'r3c1p3a5y',
    database : 'RECIPEASY_RECIPE_WRITE'
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

// main body of the program
const requestListener = function (req, res) {

    // convert the request into a readable format
    res.writeHead(200);
    let body = '';
    req.on('data', (chunk) => {body += chunk});        

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
    switch(url_pieces[1]) {
    case "recipe":
        // need the req.on in order to read it asynchronously
        req.on('end', () => {
            let obj;
            let isJson = false;
            // figure out if it's a get/put/post, etc
            switch(req.method) {
            case "GET":         // Get All Recipes

                /* Surround the sql calls with try/catch for errors.
                    Try not to use "select all" functions. That way we can
                    update the database without breaking the API. Make sure
                    you are using the right database, especilly when working
                    with the read vs write recipe databases
                */ 
                try{
                    recipe_read_db.query(
                            'SELECT r.r_id, r.description, r.name, r.likes, r.isVisible, r.date_posted, rc.category, ri.ingredient ' +
                            'FROM Recipe as r, Recipe_Categories as rc, Recipe_Ingredients as ri ' + 
                            'WHERE r.isVisible = 1 AND r.r_id = rc.r_id AND r.r_id = ri.r_id', 
                            function(err, results) {

                        // handle error and null cases
                        if(err) throw err;
                        if(results == null || results.length == 0) res.write('null', function(err) {res.end();})
                        else {
                            /* for recipes, need to also retrieve all of the 
                                categories and ingredients. Iterating through to
                                combine duplicates and delete other entries
                            */
                            return_results = [];
                            last_r_id = -1;
                            for(i = 0; i < results.length; i++) {
                                // find the first instance of the recipe
                                if(last_r_id == results[i].r_id) continue;
                                last_r_id = results[i].r_id;

                                // create arrays to store duplicates in
                                results[i].categories = [results[i].category];
                                delete results[i].category;
                                results[i].ingredients = [results[i].ingredient];
                                delete results[i].ingredient;

                                // add to return result
                                return_results.push(results[i]);

                                // iterate through, find duplicate recipes, combine
                                for(j = i+1; j < results.length; j++) {
                                    if(results[i].r_id == results[j].r_id) {
                                        
                                        //combine categories
                                        category_found = false;
                                        for(k = 0; k < results[i].categories.length; k++) {
                                            if(results[i].categories[k] == results[j].category) category_found = true;
                                        }
                                        if(!category_found) results[i].categories.push(results[j].category);

                                        //combine ingredients
                                        ingredient_found = false;
                                        for(k = 0; k < results[i].ingredients.length; k++) {
                                            if(results[i].ingredients[k] == results[j].ingredient) ingredient_found = true;
                                        }
                                        if(!ingredient_found) results[i].ingredients.push(results[j].ingredient);
                                    }
                                }
                            }

                            // return the results, as a string, via http
                            res.write(JSON.stringify(return_results), function(err) {res.end();});
                        }
                    });
                } catch(error) { res.end();}
                break;
            case "POST":
                // Create Recipe

                // convert the request to JSON to read
                isJSON = false;
                try{
                    obj = JSON.parse(body);
                    isJSON = true;
                } catch(error) {}
                if(isJSON) {
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
                    if(obj.p_id) p_id = obj.p_id;
                    else valid = false;

                    let description = '';
                    if(obj.description) description = obj.description;
                    else valid = false;

                    let name = '';
                    if(obj.name) name = obj.name;
                    else valid = false;

                    let date_posted = '';
                    if(obj.date_posted) date_posted = obj.date_posted;
                    else valid = false;

                    // create default values for some attributes if they are not there
                    let likes = 0;
                    if(obj.likes) likes = obj.likes;

                    let isVisible = 1;

                    // work with json arrays that will each become their own entries
                    let categories;
                    if(obj.categories && obj.categories.length > 0) categories = obj.categories;
                    else valid = false;

                    let ingredients;
                    if(obj.ingredients && obj.ingredients.length > 0) ingredients = obj.ingredients;
                    else valid = false;

                    /*  For recipes, we need to create numerous entries. We need to 
                        add elements to the recipe table, the ingredients table, the 
                        recipe category table, and then create an element in the 
                        recipe post database. We need the original r_id to do this, 
                        so we will force synchronous linearity before calling the 
                        rest of the sql functions.
                    */ 
                    if(valid) {
                        // get the r_id to use
                        try{
                            recipe_write_db.query('SELECT MAX(max_r_id) as max_r_id FROM Max_R_Id', function(err, results) {
                                if(err) throw err;
                                if(results != null && results.length > 0) {
                                    r_id = results[0].max_r_id;

                                    // Update max_r_id
                                    recipe_write_db.query('UPDATE Max_R_Id SET max_r_id = ' + (r_id + 1) + ' WHERE max_r_id = ' + r_id);

                                    // Create Recipe
                                    recipe_write_db.query('INSERT INTO Recipe (r_id, description, name, likes, isVisible, date_posted) VALUES (' + 
                                            r_id + ',\'' + replaceApostrophe(description) + '\',\'' + replaceApostrophe(name) + '\',' + likes + 
                                            ',' + isVisible + ',\'' + date_posted + '\')');

                                    // Create Recipe Categories
                                    recipe_category_query = 'INSERT INTO Recipe_Categories (r_id, category) VALUES ';
                                    for(i = 0; i < categories.length; i++) {
                                        if(i != 0) recipe_category_query += ',';
                                        recipe_category_query += '(' + r_id + ',\'' + categories[i] + '\')';
                                    }
                                    recipe_write_db.query(recipe_category_query);

                                    // Create Recipe Ingredients
                                    recipe_ingredient_query = 'INSERT INTO Recipe_Ingredients (r_id, ingredient) VALUES ';
                                    for(i = 0; i < ingredients.length; i++) {
                                        if(i != 0) recipe_ingredient_query += ',';
                                        recipe_ingredient_query += '(' + r_id + ',\'' + ingredients[i] + '\')';
                                    }
                                    recipe_write_db.query(recipe_ingredient_query);

                                    // Create entry in middle database
                                    middle_db.query('INSERT INTO Posts (p_id, r_id) VALUES (' + p_id + ',' + r_id + ')');
                                }
                            })
                        } catch(error) {}
                    } else res.end();
                }
                res.end();
                break;
            case "DELETE":
                // Delete a Recipe
                if(url_pieces[2]) {
                    r_id = url_pieces[2];
                    try{
                        recipe_read_db.query('SELECT * FROM Recipe WHERE r_id = ' + r_id, function(err, results){
                            if(err) throw err;
                            if(results != null && results.length > 0) {
                                recipe_write_db.query('INSERT INTO Recipe (r_id, description, name, likes, isVisible, date_posted) VALUES (' + 
                                r_id + ',\'' + results[0].description + '\',\'' + results[0].name + '\',' + results[0].likes + ',0,\'' +
                                results[0].date_posted + '\')'); 
                            }
                        })
                    } catch(error){}
                }
                res.end();
                break;
            case "PUT":
                // Update Recipe

                // convert the request to JSON to read
                isJSON = false;
                try{
                    obj = JSON.parse(body);
                    isJSON = true;
                } catch(error) {}
                if(isJSON) {
                    // work with the JSON information

                    let valid = true;

                    // find each attribute we need
                    let r_id = -1;
                    if(obj.r_id) r_id = obj.r_id;
                    else valid = false;

                    let description = '';
                    if(obj.description) description = obj.description;
                    else valid = false;

                    let name = '';
                    if(obj.name) name = obj.name;
                    else valid = false;

                    let date_posted = '';
                    if(obj.date_posted) date_posted = obj.date_posted;
                    else valid = false;

                    /* if you do normal if statements on integers, in typescript, you
                        could hit an "if(0)" case, which would cause it to error and fail
                        The try catch method ensures it behaves appropriately and treats 
                        it like a full integer. Need to do this for all integers and bools
                        except for id's, because they cannot be 0.
                    */
                    likes = obj.likes;
                    try{
                        if(likes > -1) ;
                    } catch(error){valid = false;}

                    isVisible = obj.isVisible;
                    try{
                        if(isVisible) ;
                    } catch(error) {valid = false;}

                    // work with json arrays that will each become their own entries
                    let categories;
                    if(obj.categories && obj.categories.length > 0) categories = obj.categories;
                    else valid = false;

                    let ingredients;
                    if(obj.ingredients && obj.ingredients.length > 0) ingredients = obj.ingredients;
                    else valid = false;

                    if(valid) {
                        try{
                            // Create Recipe
                            recipe_write_db.query('INSERT INTO Recipe (r_id, description, name, likes, isVisible, date_posted) VALUES (' + 
                                r_id + ',\'' + replaceApostrophe(description) + '\',\'' + replaceApostrophe(name) + '\',' + likes + 
                                ',' + isVisible + ',\'' + date_posted + '\')');

                            // Create Recipe Categories
                            recipe_category_query = 'INSERT INTO Recipe_Categories (r_id, category) VALUES ';
                            for(i = 0; i < categories.length; i++) {
                                if(i != 0) recipe_category_query += ',';
                                recipe_category_query += '(' + r_id + ',\'' + categories[i] + '\')';
                            }
                            recipe_write_db.query(recipe_category_query);

                            // Create Recipe Ingredients
                            recipe_ingredient_query = 'INSERT INTO Recipe_Ingredients (r_id, ingredient) VALUES ';
                            for(i = 0; i < ingredients.length; i++) {
                                if(i != 0) recipe_ingredient_query += ',';
                                recipe_ingredient_query += '(' + r_id + ',\'' + ingredients[i] + '\')';
                            }
                            recipe_write_db.query(recipe_ingredient_query);

                        } catch(error) {}
                    } else res.end();
                }
                res.end();
                break;
            default:
                res.end();
            }
        });
        break;
    default:
        res.write(label, function(err) {res.end();})
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