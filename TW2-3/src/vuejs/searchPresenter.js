import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData";

function Search(props){
    if(props.model.searchResultsPromiseState.promise == undefined){ // perform initial search
        props.model.doSearch({});
    }

    function querySearchACB(txt){
        props.model.setSearchQuery(txt);
    }

    function selectTypeACB(type){
        props.model.setSearchType(type);
    }

    function searchButtonACB(){
        props.model.doSearch(props.model.searchParams);
    }

    function optionChosenACB(chosenDish){
        props.model.setCurrentDish(chosenDish.id);
    }

    return(
        <div>
            {<SearchFormView dishTypeOptions={["starter", "main course", "dessert"]} setSearchText={querySearchACB} setSearchDishType={selectTypeACB} searchNow={searchButtonACB}/>}
            {promiseNoData(props.model.searchResultsPromiseState) || <SearchResultsView searchResults={props.model.searchResultsPromiseState.data} onSearchResultChosen={optionChosenACB}/>} 
        </div>
    );
}
export default Search;