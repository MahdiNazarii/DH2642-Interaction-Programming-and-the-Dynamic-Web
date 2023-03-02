import DetailsView from "../views/detailsView.js";
import promiseNoData from "../views/promiseNoData.js";

export default
function Details(props){
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