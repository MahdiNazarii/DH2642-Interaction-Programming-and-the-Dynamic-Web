function initialHash(){
    const knownHAsh = ["#summary", "#details"]
    if(!knownHAsh.includes(window.location.hash)){
        window.location.hash = "#search";
    }
}
initialHash()

window.addEventListener("hashchange", initialHash);