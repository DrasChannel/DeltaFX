function focussearch(event){
    if (event.target === document.getElementById("searchbar")) {
        document.getElementById("searchbar-input").focus()
        activatesearchbar()
    }
}
function activatesearchbar(){
    document.getElementById("searchbar").classList.add("active")
    document.addEventListener("mousedown", function(event) {
        if (event.target !== document.getElementById("searchbar")) {
            if (event.target !== document.getElementById("searchbar-input")) {
                document.getElementById("searchbar").classList.remove("active")
            }
        }
    });
}