import DetailsView from "../views/detailsView.js";
import promiseNoData from "../views/promiseNoData.js";
import React from "react";

export default
function Details(props){
    const [, copyPeople]=React.useState(props.model.numberOfGuests);
    const [ , copyDishes] = React.useState(props.model.dishes);
    const [, copyCurrentDish]=React.useState(props.model.currentDish);
    const [, copyPromiseState]=React.useState(props.model.currentDishPromiseState);
    const [, copyPromiseStateData] = React.useState(props.model.currentDishPromiseState.data)
    const [, copyPromiseStateError] = React.useState(props.model.currentDishPromiseState.error)
    
    function observerACB(){
        copyPeople(props.model.dishes);
        copyDishes(props.model.dishes);
        copyCurrentDish(props.model.currentDish);
        copyPromiseState(props.model.currentDishPromiseState.promise);
        copyPromiseStateData(props.model.currentDishPromiseState.data);
        copyPromiseStateError(props.model.currentDishPromiseState.error);
    }

    // creating observers with lifeCycle
    function wasCreatedACB(){//   1. the component has been created
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){   //  2. the component is being taken down  
            props.model.removeObserver(observerACB);
        }; 
    }
    React.useEffect(wasCreatedACB, []);  // empty array!


    function addDishACB(){
        props.model.addToMenu(props.model.currentDishPromiseState.data);
    }

    function presentInMenuCB(dish){
        return props.model.currentDish === dish.id; 
    }

    return (promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData={props.model.currentDishPromiseState.data}
        isDishInMenu={props.model.dishes.find(presentInMenuCB)}
        guests={props.model.numberOfGuests} 
        onAddToMenu ={addDishACB}/>);
}