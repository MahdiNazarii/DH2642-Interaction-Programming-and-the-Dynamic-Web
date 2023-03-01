/* Functional JSX component. Name starts with capital letter */
import {sortIngredients} from "../utilities.js";

function SummaryView(props){
    return (
            <div class="debug">
                Summary for <span title="nr guests">{props.people}</span> persons:
            
                {  //  <---- we are in JSX; with this curly brace, we go back to JavaScript, and can write JS code and comments.
                   // Then we can come back to JSX <tags>
            
                   /* TODO uncomment this at TW1.5, it won't work before because props.ingredinets is not set.*/
                   renderIngredients(props.ingredients, props.people) //tw1.5.1
                }
            </div>
    );
}

/* For TW1.5. If you are at TW1.2, wait :) */
/* This is an ordinary JS function, not a component. It will be invoked from the component above */
function renderIngredients(ingredientArray, people){
    function ingredientTableRowCB(ingr){
        return <tr key={ /* //tw1.5.2 TODO what's a key? */ingr.id}>
                    <td>{ingr.name}</td> 
                    <td>{ingr.aisle}</td>
                    <td class="alignRight"> {/* multiply by number of people! Display with 2 decimals, use a CSS classs to align right */
                                            (ingr.amount*people).toFixed(2)}</td>
                    <td> {ingr.unit} </td></tr>;
    }
    
    
    return <table>
        <thead>
        <tr><th>Name</th><th>Aisle</th><th>Quantity</th><th>unit</th></tr>
        </thead>
        <tbody>

           {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript

             //ingredientArray.map(/*TODO send callback here */ingredientTableRowCB)
             // TODO sort the ingredients. Import the needed function from utilities.js
             /*tw1.5.3*/ 
            sortIngredients(ingredientArray).map(ingredientTableRowCB) // rendering an array by .map(CB)
          }

        </tbody>
        </table>;
}

export default SummaryView;
export {renderIngredients};   // we export so that tests can analyze the source code
