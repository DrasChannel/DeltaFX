// Js that contains the search functionality, for searchbar and treeview.

var searchran = false   // checks if we have activated the searchbar
var searchquery = [];   // array that stores all the individual values that we type into search query. It is used in the search function.
var filtereditems = [];   // array of items that come out from the search function. ( The items we are searching for using the searchbar )
var precategoryfiltered = [];   // array of items that come into the category filtering function ( They are passed from the search function (filtereditems variable) )
var finalfilter = [];   // Final array of filtered items. Based on this, the material thumbnails will be displayed


function focussearch(event){
    if (event.target === document.getElementById("searchbar")) {
        document.getElementById("searchbar-input").focus()
        activatesearchbar()
    }
}



function activatesearchbar(){
        
    document.getElementById("searchbar").classList.add("active")

    /*if(searchran == false){
        addsearchfunctionality()
    }*/
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
                        searchquery.push(document.getElementById("searchbar-input").value);
                    }
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
        document.getElementById("treeview-tag"). innerHTML = `<div class="t-tag" style="display: none;"></div>`
    }
}

function removecategorysearch() {
    document.getElementById("treeview-tag"). innerHTML = ""
}

// Search function (launches when something changes in the searchquery)
function search(){
    // put everything from search query array to lower case
    searchquery = searchquery.map(searchquer => searchquer.toLowerCase());

    console.log(searchquery)
    // Check if there is something in the searchquery. If there is something, proceed to filtering, if not, then move on to filtering by categories.
    if(searchquery.length >= 1){
        filtereditems = [];

        // for each asset check if it contains the searched values in it's tags. If it does put it in the filtered items array
        for(let i = 0; i < Object.keys(assetinfo).length; i++){
            // define current asset and it's tags and put them to lowercase
            let currentasset = Object.keys(assetinfo)[i]
            let currenttags = assetinfo[currentasset].tags.split(" ");
            currenttags = currenttags.map(currenttag => currenttag.toLowerCase());
            // set counter to 0
            let counter = 0
            // For each searchquery value, check if it's included in the asset's tags. If it is, then add 1 to the counter. Finally if the counter value equals
            // the count of searquery values, it means that all th values from the searchquery are included in the asset's tags, so the asset can be added
            // to the filtered items list
            for(let c = 0; c < searchquery.length; c++){
                if(currenttags.includes(searchquery[c]) == true) {
                    counter = counter + 1
                }
            }
            if(counter == searchquery.length){
                filtereditems.push(currentasset)
            }
        }

        // pass the filtered items to the precategoryfiltered variable and continue to category filtering.
        precategoryfiltered = filtereditems
        categoryfilter()
        filtereditems = [];
    }
    else {
        // since nothing there was nothing in the searchquery, we aren't searching for anything, so we can add all elements into the precategoryfiltered
        // variable and move on to category fitering.
        precategoryfiltered = Object.keys(assetinfo)
        categoryfilter()
    }
}

// Category filtering. Launched from search filtering when it's done.
function categoryfilter(){
    // a variable for the filtered elements from this function
    let aftercategoryfiltered = [];

    let targetcategory;
    let targetsubcategory;
    //check if something is selected in the treeview (if the element t-tag exists)
    if (window.getComputedStyle(document.querySelector(".t-tag")).display !== "none") {
        // If the treeview tag contains both a category and a subcategory, then split them. If not, then just leave the subcategory variable empty.
        if(document.querySelector(".t-tag").innerHTML.indexOf("/") > -1){
            targetcategory = document.querySelector(".t-tag").innerHTML.split("/")[0].toLowerCase()
            targetsubcategory = document.querySelector(".t-tag").innerHTML.split("/")[1].toLowerCase()
        }
        else {
            targetcategory = document.querySelector(".t-tag").innerHTML.toLowerCase()
            targetsubcategory = null
        }
        precategoryfiltered.forEach(function(precategoryel){
            //check if precategoryel contains target category and subcategory
            if(assetinfo[precategoryel].category == targetcategory) {
                //check if subctagegory is set
                if(targetsubcategory == null){
                    aftercategoryfiltered.push(precategoryel)
                }
                else{
                    if(assetinfo[precategoryel].subcategory == targetsubcategory) {
                        aftercategoryfiltered.push(precategoryel)
                    }
                }
            }
        });
    }
    else {
        aftercategoryfiltered = precategoryfiltered
    }
    //Chack if the aftercategoryfiltered contains something. If it does, pass it to finalfilter and generate thumbnails.
    //If not, find out if it is because there are no search results or beacuse we didn't search for anything.
    if(aftercategoryfiltered.length > 0){
        finalfilter = aftercategoryfiltered
        generatematthumbs(true)
    }
    else {
        finalfilter = aftercategoryfiltered
        if(searchquery.length < 1) {
            if (window.getComputedStyle(document.querySelector(".t-tag")).display !== "none") {
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