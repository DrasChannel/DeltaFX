function focussearch(event){
    if (event.target === document.getElementById("searchbar")) {
        document.getElementById("searchbar-input").focus()
        activatesearchbar()
    }
}
function activatesearchbar(){
    document.getElementById("searchbar").classList.add("active")
    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if(document.getElementById("searchbar-input").value!=""){
                document.getElementById("search-tags").innerHTML += `
                <div class="s-tag" id="`+document.getElementById("searchbar-input").value+"stag"+`">`+document.getElementById("searchbar-input").value+`<div class="cancel-s-tag" onClick="removestag(this.id)" id="`+document.getElementById("searchbar-input").value+"stag"+`"></div></div>
                `
                document.getElementById("searchbar-input").value = ""
            }
        }
    });
    let clickonsearch
    clickonsearch = document.addEventListener("mousedown", function clickoffsearch(event) {
        if (event.target !== document.getElementById("searchbar")) {
            if (event.target !== document.getElementById("searchbar-input")) {
                document.getElementById("searchbar").classList.remove("active")
                clickonsearch = document.removeEventListener("mousedown", clickoffsearch)
            }
        }
    });
}

function removestag(sname){
    document.getElementById(sname).remove()
}