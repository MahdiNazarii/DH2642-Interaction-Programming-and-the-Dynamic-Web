import SidebarView from "../views/sidebarView.js";


export default
function Sidebar(props){
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
