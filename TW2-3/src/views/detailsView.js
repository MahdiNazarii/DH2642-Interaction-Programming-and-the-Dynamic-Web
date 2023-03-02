function DetailsView(props){
    function ingredientsCB(ingr){
        return(
            <div key={ingr.name}>
                <strong>{ingr.name+": "}</strong>
                {(ingr.amount).toFixed(2)+" "}  
                {ingr.unit}         

            </div>
        )
    }
    function add2MenuACB(){
        props.onAddToMenu()
        window.location.hash = "#search";
    }
    function navigationACB(){
        console.log("cancel clicked");
        window.location.hash = "#search";
    }
    return(
        <div>
            <div>
                <button class = "detailsbtn" onClick={add2MenuACB} disabled={props.isDishInMenu}>Add to Menu</button>
                <button class = "detailsbtn" onClick={navigationACB}>Cancel</button>
            </div>

            <h3>{props.dishData.title}</h3>
            <div>
                <td>
                <img src={props.dishData.image} height="100" class = "detailsImage"/>
                <td class = "detailsPrice">
                    <tr><strong>Price: </strong>{props.dishData.pricePerServing}</tr>
                    <tr><strong>Price for {props.guests} guests: </strong> {(props.dishData.pricePerServing * props.guests).toFixed(2)}</tr>
                </td>
                </td>
                
            </div>

            <div class = "detailsPage">
                {
                    props.dishData.extendedIngredients.map(ingredientsCB)
                }
            </div>

            <div class = "detailsInstruction">
                {
                    props.dishData.instructions
                }
            </div>

            <div><a href={props.dishData.sourceUrl}>More information</a></div>

        </div>
    );
}
export default DetailsView;