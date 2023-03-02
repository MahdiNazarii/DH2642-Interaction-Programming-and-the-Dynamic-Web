function SearchFormView(props){
    function optionCB(str){
        return <option>{str}</option>
    }

    function inputHandlerACB(ev){
        props.setSearchText(ev.target.value);
    }

    function selectOptHandlerACB(ev){
        props.setSearchDishType(ev.target.value);
    }

    function searchBtnHandlerACB(){
        props.searchNow();
    }

    function navigationButtonACB(){
        window.location.hash="#summary";
    }

    return(
        <div>
           <input placeholder="type here" onChange={inputHandlerACB}></input>
           <select onChange={selectOptHandlerACB}>
                <option>Choose:</option>
               {
                props.dishTypeOptions.map(optionCB)
               }
           </select>
           <button class = "searchButton" onClick={searchBtnHandlerACB}>Search!</button> 
           <button class = "searchButton" onClick={navigationButtonACB}>Summary</button>
        </div>

    );
}
export default SearchFormView;

