import SearchFormView from "../views/searchFormView";
import { searchDishes } from "../dishSource";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData";
import resolvePromise from "../resolvePromise";
import React from "react";

function Search(props) {
    const [searchQuery, setSearchQuery]   = React.useState("");
    const [searchType, setSearchType]     = React.useState("");
    const [promiseState]             = React.useState( {/*initially empty */} );
    const [, reRender]               = React.useState();
    const [, setCurrentDish]         = React.useState(props.model);

    function notifyACB(){ 
        reRender(new Object()); 
    }

    if(promiseState.promise == undefined) { // initial search
        resolvePromise(searchDishes({}),promiseState,notifyACB);
    }
    
    function searchtextACB(text){
        setSearchQuery(text);
    }

    function searchTypeACB(type){
        setSearchType(type);
    }

    function searchBtnACB(){
        resolvePromise(searchDishes({type: searchType, query: searchQuery }),promiseState,notifyACB)
    }
    function setSearchACB(chosenDish) {
        props.model.setCurrentDish(chosenDish.id);
    }

    // function componentWasCreatedACB(){   //   1. the component has been created
    //     console.log("component created!");
    //     function isTakenDownACB(){          //  2. the component is being taken down        
    //          console.log("component is dying");
    //     }
    //     return isTakenDownACB; 
    // }
    // React.useEffect( componentWasCreatedACB, [] );  // empty array!
   

    return ( <div>
            {<SearchFormView dishTypeOptions={["starter", "main course", "dessert"]} 
            setSearchText = {searchtextACB} 
            setSearchDishType = {searchTypeACB} 
            searchNow = {searchBtnACB}/>}
            {promiseNoData(promiseState) || <SearchResultsView searchResults = {promiseState.data} onSearchResultChosen = {setSearchACB}/>}
        </div>
    );
        

}

export default Search;