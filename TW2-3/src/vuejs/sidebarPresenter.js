import SidebarView from "../views/sidebarView.js";

export default
function Sidebar(props){
    function updateSidebarACB(number){ // tw1.4.3
        props.model.setNumberOfGuests(number);
    }

    function deleteDisheACB(dish){
        props.model.removeFromMenu(dish);
    }

    function addDishACB(dish){
        props.model.setCurrentDish(dish.id);
    }


    return <SidebarView number={props.model.numberOfGuests} 
            onNumberChange = {updateSidebarACB} 
            dishes = {props.model.dishes}
            onRemoveDish = {deleteDisheACB}
            onAddDish = {addDishACB}
            />;
}
