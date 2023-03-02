function SearchResultsView(props){
    return(
        <div class = "resultsParent">
           {
            props.searchResults.map(resultsCB) // searchResults is an array of data
           }
        </div>
    );

    function resultsCB(dish){
       const prepend_URL = "https://spoonacular.com/recipeImages/";

        function dishChosenACB(){
            props.onSearchResultChosen(dish);
            window.location.hash = "#details";
        }
        
        return(
            <span class="searchResult" onClick={dishChosenACB}>
                <img src={prepend_URL + dish.image} height="100"></img>
                <div>
                    {dish.title}
                </div>
            </span>
        );
    }
}
export default SearchResultsView;