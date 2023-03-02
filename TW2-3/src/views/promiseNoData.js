function promiseNoData(promiseState){
    if (!promiseState.promise){   
        return <div>no data</div>
    } 
    else if (promiseState.promise && !promiseState.data && !promiseState.error){
        return (<img src="http://www.csc.kth.se/~cristi/loading.gif"></img>)
    } 
    else if (promiseState.promise && !promiseState.data && promiseState.error){
        return (<div>{String(promiseState.error)}</div>)
    } 
    else if ( promiseState.promise && promiseState.data && !promiseState.error){
        return (false)
    }
}
export default promiseNoData;