// Add relevant imports here 
import resolvePromise from "../resolvePromise";
import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from "../firebaseModel";
import App from "../views/app.js"
import promiseNoData from "../views/promiseNoData";

// Define the ReactRoot component
function ReactRoot() {
    const [promiseState]= React.useState({});
    const [, reRender]= React.useState();
    
    function reRenderACB(){ 
        reRender(new Object()); 
    }
    
    if(promiseState.promise == undefined) {
        resolvePromise(firebaseModelPromise(), promiseState, reRenderACB);
    }

    if(promiseState.data) {
        updateFirebaseFromModel(promiseState.data);
        updateModelFromFirebase(promiseState.data);
    }
    
    return (promiseNoData(promiseState) || <App model = {promiseState.data}/>);
    
}

// Export the ReactRoot component
export default ReactRoot;
