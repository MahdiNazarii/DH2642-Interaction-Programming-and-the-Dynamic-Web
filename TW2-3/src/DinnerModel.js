/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
import { searchDishes, getDishDetails } from "./dishSource";
import resolvePromise from "./resolvePromise";

class DinnerModel{
    constructor(nrGuests=2, dishArray=[], currentDish){
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        this.searchResultsPromiseState = {};
        this.searchParams = {};
        this.currentDishPromiseState = {};

    }
    /////////////////////////////////////////////////////////////
    addObserver(callback){
        this.observers = [...this.observers,callback];
    }

    removeObserver(callbackRemove){
        function filterCB(func){
            return func != callbackRemove;
        }
        this.observers = this.observers.filter(filterCB);
    }

    notifyObservers(payload){
        function invokeObserverACB(obs){ 
            try{ /* call obs */  obs(payload)}catch(err){console.error(err); };
        }
        this.observers.forEach(invokeObserverACB);
    }
    /////////////////////////////////////////////////////////////
    
    setNumberOfGuests(nr){
        // if() and throw exercise
        // TODO throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)
        if(nr < 1 || !(Number.isInteger(nr))){
            throw new Error("number of guests not a positive integer");
        }
        if(nr === this.numberOfGuests){
            return;
        }

        // TODO if the argument is a valid number of guests, store it in this.numberOfGuests
        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"
        this.numberOfGuests = nr; 
        this.notifyObservers({numsGuests: nr});  
    }

    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the previous value
        function dishesACB(currDish){
           if(dishToAdd.id === currDish.id){ return true;}
           return false;
        }

        if(this.dishes.find(dishesACB)){
            return;
        }
        this.dishes= [...this.dishes, dishToAdd];
        this.notifyObservers({addDish: dishToAdd});
    }
    
    removeFromMenu(dishToRemove){
        // callback exercise! Also return keyword exercise
        function dishesACB(currDish){
            if(dishToRemove.id === currDish.id){ return true;}
            return false;
        }
 
        if(!this.dishes.find(dishesACB)){
             return;
        }

        function hasSameIdCB(dish){
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)

            if(dish.id != dishToRemove.id){
                return true;
            }
        }
        this.dishes= this.dishes.filter(/*TODO pass the callback!*/ hasSameIdCB);
        // the test "can remove dishes" should pass
        this.notifyObservers({removeDish: dishToRemove});
    }
    /* 
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data, 
       but we take a more relaxed, "Application state" approach. 
       So we store also abstract data that will influence the application status.
       */
      // unused method
      // setCurrentDish(id){
          //     //this.currentDish=TODO
          //     this.currentDish = id;
          //         
          // }
          
        setCurrentDish(id){
            if(id){
                if(id === this.currentDish){
                    return;
                }
                this.currentDish = id;
                resolvePromise(getDishDetails(id), this.currentDishPromiseState, this.notifyObservers.bind(this));
                this.notifyObservers({currentDishId : id});   
            }   
        }
          
          
    // TW2.4 Promise state in DinnerModel: search
    setSearchQuery(q){
        this.searchParams.query = q;
    }

    setSearchType(t){
        this.searchParams.type = t;
    }

    doSearch(params){
        resolvePromise(searchDishes(params),this.searchResultsPromiseState, this.notifyObservers.bind(this));
    }


}

export default DinnerModel;
