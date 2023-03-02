import SummaryView from "../views/summaryView.js";
import {shoppingList} from "../utilities.js";
import React from "react";

export default
function Summary(props){
    const [, copyPeople]=React.useState(props.model.numberOfGuests);
    const [, copyDishes]=React.useState(props.model.dishes);

    function observerACB(){
        copyPeople(props.model.numberOfGuests);
        copyDishes(props.model.dishes);     
    }
    
    // creating observers with lifeCycle
    function componentWasCreatedACB(){   //   1. the component has been created
       props.model.addObserver(observerACB);
        function isTakenDownACB(){          //  2. the component is being taken down        
            props.model.removeObserver(observerACB);
        }
        return isTakenDownACB; 
    }
    React.useEffect( componentWasCreatedACB, [] );  // empty array!

    return <SummaryView people={props.model.numberOfGuests} 
    ingredients={shoppingList(props.model.dishes) /* tw1.5.4 */}/>;
}