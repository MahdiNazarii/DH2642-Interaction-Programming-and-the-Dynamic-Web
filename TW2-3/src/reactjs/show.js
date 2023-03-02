export default
function show(props){
    function hashListnerACB(){
        setHashState(window.location.hash)
    }

    function addEventListnerACB(){
        window.addEventListener("hashchange", listener);
        return (function removeEventListenerACB(){
            window.removeEventListener("hashchange", listener)
        });
    }
    const [hashState, setHashState] = React.useState(window.location.hash);
	const listener = (hashListnerACB)
	React.useEffect (addEventListnerACB, []);
	return(
		<div class={(hashState !== props.hash) ? "hidden" : ""} >
			{props.children}
		</div>
	)
}