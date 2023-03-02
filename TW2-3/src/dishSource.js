import {BASE_URL, API_KEY} from "../src/apiConfig.js";
const endpointSD = "recipes/search?";
const endpointGDD = "recipes/";

function treatHTTPResponseACB(response){
    if(!response.ok) throw new Error("API problem "+response.status);
    return response.json();
}

function transformSearchResultACB(params){
    return params.results;
}

function getDishDetails(id) {
    return fetch(BASE_URL+ endpointGDD + id + "/information", {
        "method": "GET", 
        "headers": {
            'X-Mashape-Key': API_KEY, 
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com", 
        }
    }).then(treatHTTPResponseACB);
}
function searchDishes(params){
    return fetch(BASE_URL+endpointSD+new URLSearchParams(params) /*query string*/, {
        "method": "Get", 
        "headers": {
            'X-Mashape-Key': API_KEY,
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        }
    })
    .then(treatHTTPResponseACB).then(transformSearchResultACB);
}


export {getDishDetails, searchDishes}