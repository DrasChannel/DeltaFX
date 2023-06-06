var searchran = false
var searchquery = [];
var filtereditems = [];
var precategoryfiltered = [];
var finalfilter = [];

function focussearch(event){
    if (event.target === document.getElementById("searchbar")) {
        document.getElementById("searchbar-input").focus()
        activatesearchbar()
    }
}



function activatesearchbar(){
        
    document.getElementById("searchbar").classList.add("active")

    if(searchran == false){
        addsearchfunctionality()
    }
    searchran = true

    
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
function addsearchfunctionality(){
    // MUTATION OBSERVER
    // Select the element to observe
    let targetNode = document.getElementById('search-tags');
    // Create an observer instance
    let observer = new MutationObserver(function(mutations) {
        if (!observer.isCallingFunction) {
            observer.isCallingFunction = true;
            search();
            setTimeout(function() {
                observer.isCallingFunction = false;
            }, 0);
        }
    });
    // Set initial flag value
    observer.isCallingFunction = false;
    // Options for the observer (which mutations to observe)
    let config = { childList: true, subtree: true, attributes: true, characterData: true };
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            if(document.getElementById("searchbar-input").value!=""){
                if(document.getElementById("searchbar-input").value.includes(" ") == true){
                    let moretags = document.getElementById("searchbar-input").value.split(" ")

                    for (let i = 0; i < moretags.length; i++) {
                        if(moretags[i] != ''){
                            if(document.getElementById(moretags[i]+"stag") == null){
                                document.getElementById("search-tags").innerHTML += `
                                <div class="s-tag" id="`+moretags[i]+"stag"+`">`+moretags[i]+`<div class="cancel-s-tag" onClick="removestag(this.id)" id="`+moretags[i]+"stag"+`"></div></div>
                                `
                            }
                            searchquery.push(moretags[i]);
                            document.getElementById("searchbar-input").value = ""                   
                        }
                        
                    }
                } else {
                    if(document.getElementById(document.getElementById("searchbar-input").value+"stag") == null){
                        document.getElementById("search-tags").innerHTML += `
                        <div class="s-tag" id="`+document.getElementById("searchbar-input").value+"stag"+`">`+document.getElementById("searchbar-input").value+`<div class="cancel-s-tag" onClick="removestag(this.id)" id="`+document.getElementById("searchbar-input").value+"stag"+`"></div></div>
                        `
                    }
                    searchquery.push(document.getElementById("searchbar-input").value);
                    document.getElementById("searchbar-input").value = ""
                }
                
            }
        }
        if (e.key === 'Backspace' && document.getElementById("searchbar-input").value == "") {
            let alltags = document.querySelectorAll(".s-tag")
            if(alltags.length>0){
                alltags[alltags.length- 1].innerHTML = ""
                alltags[alltags.length- 1].remove()
                searchquery.pop();
            }
        }
    });
}
function addtreeviewfunctionality() {
    
    // MUTATION OBSERVER
    // Select the element to observe
    let targetNode = document.getElementById('treeview-tag');
    let targetNode2 = document.querySelector(".t-tag");
    // Create an observer instance
    let observer = new MutationObserver(function(mutations) {
        if (!observer.isCallingFunction) {
            observer.isCallingFunction = true;
            console.log("changed")
            categoryfilter()
            setTimeout(function() {
                observer.isCallingFunction = false;
            }, 0);
        }
    });
    // Set initial flag value
    observer.isCallingFunction = false;
    // Options for the observer (which mutations to observe)
    let config = { childList: true, subtree: true, attributes: true, characterData: true };
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    observer.observe(targetNode2, config);
}


function removestag(sname){
    
    searchquery = searchquery.map(searchquer => searchquer.toLowerCase());
    let smallsname = sname.toLowerCase().replace("stag", "")
    let index2 = searchquery.indexOf(smallsname);
    searchquery.splice(index2, 1)
    search()
    
    document.getElementById(sname).remove()
    
    
    /*let index = array.indexOf(sname);
    console.log(index)
    if (index > -1) {
        array.splice(index, 1);
    }*/
}

function categorysearch(clickid, categoryid, subcatid){
    if(document.getElementById(clickid).classList.contains("selected")){
        if(clickid == subcatid){
            document.getElementById("treeview-tag"). innerHTML = `
            <div class="t-tag" style="color: var(--light-5);" id="`+clickid+`-ctag">`+clickid.charAt(0).toUpperCase() + clickid.slice(1)+`</div>
            `
        } else {
            document.getElementById("treeview-tag"). innerHTML = `
            <div class="t-tag" style="color: var(--light-5);" id="`+clickid+`-ctag">`+categoryid.charAt(0).toUpperCase() + categoryid.slice(1)+`/`+subcatid.charAt(0).toUpperCase() + subcatid.slice(1)+`</div>
            `
        } 
    } else {
        document.getElementById("treeview-tag"). innerHTML = ""
    }
}

function removecategorysearch() {
    document.getElementById("treeview-tag"). innerHTML = ""
}

function search(){
    searchquery = searchquery.map(searchquer => searchquer.toLowerCase());

    if(searchquery.length >= 1){
        filtereditems = [];
        for(let i = 0; i < Object.keys(assetinfo).length; i++){
            let currentasset = Object.keys(assetinfo)[i]
            let currenttags = assetinfo[currentasset].tags.split(" ");
            currenttags = currenttags.map(currenttag => currenttag.toLowerCase());
            let counter = 0
            for(let c = 0; c < searchquery.length; c++){
                /*if(counter == 0){*/
                    if(currenttags.includes(searchquery[c]) == true) {
                        counter = counter + 1
                        
                    }
                /*}*/
            }
            if(counter == searchquery.length){
                filtereditems.push(currentasset)
            }
        }
        precategoryfiltered = filtereditems
        categoryfilter()
        filtereditems = [];
    }
    else {
        filtereditems = [];
        precategoryfiltered = filtereditems
        categoryfilter()
    }
}

function categoryfilter(){
    let aftercategoryfiltered = [];
    let targetcategory;
    let targetsubcategory;
    if(precategoryfiltered.length < 1) {
        precategoryfiltered = Object.keys(assetinfo)
    }
    console.log(precategoryfiltered)
    if (document.querySelector(".t-tag") !== null) {
        if(document.querySelector(".t-tag").innerHTML.indexOf("/") > -1){
            targetcategory = document.querySelector(".t-tag").innerHTML.split("/")[0].toLowerCase()
            targetsubcategory = document.querySelector(".t-tag").innerHTML.split("/")[1].toLowerCase()
            console.log(targetcategory)
            console.log(targetsubcategory)
        }
        else {
            targetcategory = document.querySelector(".t-tag").innerHTML.toLowerCase()
            targetsubcategory = null
            console.log(targetcategory)
            console.log(targetsubcategory)
        }
        precategoryfiltered.forEach(function(precategoryel){
            //check if precategoryel contains target category and subcategory
            if(assetinfo[precategoryel].category == targetcategory) {
                aftercategoryfiltered.push(precategoryel)
            }
        });
    }
    else {
        aftercategoryfiltered = precategoryfiltered
    }
    console.log(aftercategoryfiltered)
    if(aftercategoryfiltered.length > 0){
        finalfilter = aftercategoryfiltered
        generatematthumbs(true)
    }
    else {
        finalfilter = aftercategoryfiltered
        if(searchquery.length < 1) {
            if (document.querySelector(".t-tag") !== null) {
                generatematthumbs(true)
            }
            else {
                generatematthumbs()
            }
        }
        else{
            generatematthumbs(true)
        }
    }
    
    
}