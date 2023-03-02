function resolvePromise(promiseToResolve, promiseState, notify){
    promiseState.promise=promiseToResolve;
    promiseState.data= null;         
    promiseState.error= null;

    if(notify)      // if a 3rd parameter was sent, we expect it to be a function (ACB)!
        notify();  // so we can call it to notify every time promise, data, or error change


    if(promiseToResolve === null)
        return "promise is null";

    function saveDataACB(result){ 
        if(promiseState.promise !== promiseToResolve) return;
        /* TODO save result in promiseState, as before */
        promiseState.data = result;
        /* TODO notify */
        if(notify)
            notify(); 
    } 

    function saveErrorACB(err)  { 
        /* TODO same check as above */
        if(promiseState.promise !== promiseToResolve) return;
        
        /* TODO save err in promiseState, as before */
        promiseState.error = err;
        /* TODO notify */
        if(notify)
            notify(); 
    }
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}
export default resolvePromise;