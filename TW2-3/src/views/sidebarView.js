import {dishType} from "../utilities.js";
import {sortDishes} from "../utilities.js";
import {menuPrice} from "../utilities.js";


function SidebarView(props){ // functional JSX components name starts with capital letter
    function plusButtonACB(){
        props.onNumberChange(props.number+1);
    }

    function minusButtonACB(){
        props.onNumberChange(props.number-1);
    }

    

    return(
        <div class = "sidebarPage">
            <button disabled = {props.number === 1} onClick = {minusButtonACB} >-</button>
            {props.number}
            <button onClick = {plusButtonACB} >+</button>
        
            {  
               renderDishes(props.dishes, props.number) 
            }
        </div>

    );


    function renderDishes(dishArray, number){
    
        function dishTableRowCB(dish){

            function removeButtonACB(){
                props.onRemoveDish(dish);
            }

            function addButtonACB(e){
                props.onAddDish(dish);
                e.preventDefault();
                window.location.hash = "#details";
            }

            return <tr key={ /*tw1.5.dishes*/  dish.id}> 
                        <td><button  onClick = {removeButtonACB}>X</button></td>
                        <td> <a  onClick = {addButtonACB} href="#">{dish.title}</a></td> 
                        <td>{dishType(dish)}</td>
                        <td class="alignRight"> {(dish.pricePerServing*number).toFixed(2)
            } </td></tr>;
        }
        
        return <table>
            <tbody>
    
            {
                sortDishes(dishArray).map(dishTableRowCB) // rendering an array by .map(CB)
            }
            <tr>
                <td></td>
                <td>Total: </td>
                <td></td>
                <td class="alignRight">{(menuPrice(dishArray)*number).toFixed(2)}</td>
                </tr>
            </tbody>
            </table>;
    }
}

export default SidebarView;