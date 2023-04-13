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
                if(document.getElementById("searchbar-input").value.includes(" ") == true){
                    let moretags = document.getElementById("searchbar-input").value.split(" ")

                    for (let i = 0; i < moretags.length; i++) {
                        if(moretags[i] != ''){
                            console.log(moretags[i])
                            document.getElementById("search-tags").innerHTML += `
                            <div class="s-tag" id="`+moretags[i]+"stag"+`">`+moretags[i]+`<div class="cancel-s-tag" onClick="removestag(this.id)" id="`+moretags[i]+"stag"+`"></div></div>
                            `
                            document.getElementById("searchbar-input").value = ""
                        }
                        
                    }
                } else {
                    document.getElementById("search-tags").innerHTML += `
                    <div class="s-tag" id="`+document.getElementById("searchbar-input").value+"stag"+`">`+document.getElementById("searchbar-input").value+`<div class="cancel-s-tag" onClick="removestag(this.id)" id="`+document.getElementById("searchbar-input").value+"stag"+`"></div></div>
                    `
                    document.getElementById("searchbar-input").value = ""
                }
                
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

function categorysearch(clickid, categoryid, subcatid){
    if(document.getElementById(clickid).classList.contains("selected")){
        if(clickid == subcatid){
            document.getElementById("treeview-tag"). innerHTML = `
            <div class="s-tag" style="color: var(--light-5);" id="`+clickid+`-ctag">`+clickid.charAt(0).toUpperCase() + clickid.slice(1)+`</div>
            `
        } else {
            document.getElementById("treeview-tag"). innerHTML = `
            <div class="s-tag" style="color: var(--light-5);" id="`+clickid+`-ctag">`+categoryid.charAt(0).toUpperCase() + categoryid.slice(1)+`/`+subcatid.charAt(0).toUpperCase() + subcatid.slice(1)+`</div>
            `
        } 
    } else {
        document.getElementById("treeview-tag"). innerHTML = ""
    }
}

function removecategorysearch() {
    document.getElementById("treeview-tag"). innerHTML = ""
}