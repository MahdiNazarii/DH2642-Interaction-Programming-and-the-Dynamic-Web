// Add relevant imports here 
import DinnerModel from "./DinnerModel";
import { getDishDetails } from "./dishSource";
import firebaseConfig from "/src/firebaseConfig.js";
import { def } from "@vue/shared";

// Initialise firebase
firebase.initializeApp(firebaseConfig);
const REF="dinnerModel36";
firebase.database().ref(REF+"/test").set("dummy");


function observerRecap(model) {
    function observerCB(payload){
        console.log(payload);
    }
    model.addObserver(observerCB);
    //TODO
}

function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
        if(firebaseData.val() == undefined){
            return new DinnerModel(2, []);
        }
        
        function createModelACB(dishArray){
            const nr_guest = firebaseData.val().numsguests;
            return new DinnerModel(nr_guest, dishArray);
        }
        function makeDishPromiseCB(dishId){
            return getDishDetails(dishId);
        }
        
        const dishPromiseArray = Object.keys(firebaseData.val().dishes || []).map(makeDishPromiseCB);
        return Promise.all(dishPromiseArray).then(createModelACB);
    }
    return firebase.database().ref(REF /* <-- note! Whole object! */).once("value").then(makeBigPromiseACB);
}



function updateFirebaseFromModel(model) {
    function observerACB(payload) {
        if(payload && payload.hasOwnProperty("numsGuests")) {
            firebase.database().ref(REF+"/numsguests").set(model.numberOfGuests);
        }
        if (payload && payload.hasOwnProperty("currentDishId")){
            firebase.database().ref(REF+"/currentDish").set(model.currentDish);
        }
        if(payload && payload.hasOwnProperty("addDish")){
            firebase.database().ref(REF+"/dishes/"+payload.addDish.id).set(payload.addDish.title);
        }
        if(payload && payload.hasOwnProperty("removeDish")){
            firebase.database().ref(REF+"/dishes/"+payload.removeDish.id).set(null);
        }
    }
    model.addObserver(observerACB);
    return;
    //TODO
}


function updateModelFromFirebase(model) {
    firebase.database().ref(REF+"/numsguests").on("value", 
    function guestsChangedInFirebaseACB(firebaseData){ model.setNumberOfGuests(firebaseData.val());});

    firebase.database().ref(REF+"/currentDish").on("value", 
    function currentDishChangedInFirebaseACB(firebaseData){ model.setCurrentDish(firebaseData.val());});

    firebase.database().ref(REF+"/dishes/").on("child_added", 
    function dishAddedInFirebaseACB(firebaseData){ 
        function dishesACB(currDish){
            if(+firebaseData.key === currDish.id){ return true;}
            return false;
         }
 
         if(model.dishes.find(dishesACB)){
            return;
         }
        getDishDetails(+firebaseData.key).then(function addDishToMenuCB(dish){ model.addToMenu(dish)} )
    });

    firebase.database().ref(REF+"/dishes/").on("child_removed",  
    function dishRemovedFromFirebaseACB(firebaseData){ 
        model.removeFromMenu({"id" : +firebaseData.key})
    });
    //TODO
    return;
}

// Remember to uncomment the following line:
export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};