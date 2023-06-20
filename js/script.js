const swup = new Swup()

// run once when page loads
if (document.readyState === 'complete') {
    scrolltotop();
} else {
    document.addEventListener('DOMContentLoaded', () => scrolltotop());
    document.addEventListener('DOMContentLoaded', () => generatemattreeview());
    document.addEventListener('DOMContentLoaded', () => generatematthumbs());
    document.addEventListener('DOMContentLoaded', () => materialtreeview());
}
  
// run after every additional navigation by swup
swup.on('contentReplaced', scrolltotop);
swup.on('contentReplaced', generatemattreeview);
swup.on('contentReplaced', generatematthumbs);
swup.on('contentReplaced', materialtreeview);

swup.on('contentReplaced', function(){
    searchran = false
});

// Define the function that does scrolling and fading


// functions

// Scrools to the top of the page when reloading or switching pages
function scrolltotop(){
    window.scrollTo({top: 0,behavior: 'instant'});
}

// Generates the treeview for materials from the json data
function generatemattreeview(){
    if(window.location.href.indexOf("materials") > -1){
        document.getElementById("treeview").innerHTML = ""
        for(let i = 0; i < Object.keys(assetinfo).length; i++){
            let currentasset = Object.keys(assetinfo)[i]
            
            if(document.getElementById(assetinfo[currentasset].category+"tcontainer") != null){
                if(document.getElementById(assetinfo[currentasset].category+assetinfo[currentasset].subcategory) != null){
                    let num = parseInt(document.getElementById(assetinfo[currentasset].category+assetinfo[currentasset].subcategory+"subcount").innerHTML)
                    document.getElementById(assetinfo[currentasset].category+assetinfo[currentasset].subcategory+"subcount").innerHTML = num+1
                    let num2 = parseInt(document.getElementById("categoryassetcount"+assetinfo[currentasset].category).innerHTML)
                    document.getElementById("categoryassetcount"+assetinfo[currentasset].category).innerHTML = num2+1
                } else{
                    document.getElementById(assetinfo[currentasset].category+"subcategory").innerHTML += `
                    <div class="categorylinewrapper">
                        <span class="treeviewsubcategory" id="`+assetinfo[currentasset].category+assetinfo[currentasset].subcategory+`" name="`+assetinfo[currentasset].subcategory+`" onclick="selectsubcategory(this.id, '`+assetinfo[currentasset].category+`');categorysearch(this.id, '`+assetinfo[currentasset].category+`', this.attributes['name'].value)">`+assetinfo[currentasset].subcategory.charAt(0).toUpperCase() + assetinfo[currentasset].subcategory.slice(1)+`</span>
                        <span class="categoryassetcount" id="`+assetinfo[currentasset].category+assetinfo[currentasset].subcategory+`subcount">1</span>
                    </div>
                    `
                    let num2 = parseInt(document.getElementById("categoryassetcount"+assetinfo[currentasset].category).innerHTML)
                    document.getElementById("categoryassetcount"+assetinfo[currentasset].category).innerHTML = num2+1
                }
                
            } else {
                
                document.getElementById("treeview").innerHTML += `
                <div class="treeviewcategorycontainer" id="`+assetinfo[currentasset].category+`tcontainer">
                <div class="treeviewarrow" id="`+assetinfo[currentasset].category+`arrow" onclick="togglesubcategory('`+assetinfo[currentasset].category+`');removecategorysearch()"></div>
                <span class="treeviewcategory" id="`+assetinfo[currentasset].category+`" name="`+assetinfo[currentasset].category+`" onclick="selectcategory(this.id);categorysearch(this.id, this.attributes['name'].value, this.attributes['name'].value)">`+assetinfo[currentasset].category.charAt(0).toUpperCase() + assetinfo[currentasset].category.slice(1)+`</span>
                <span class="categoryassetcount" id="categoryassetcount`+assetinfo[currentasset].category+`">1</span>
                </div>
                `
                document.getElementById("treeview").innerHTML += `
                <div class="treeviewsubcategorycontainer" id="`+assetinfo[currentasset].category+`subcategory">
                </div>
                `
                document.getElementById(assetinfo[currentasset].category+"subcategory").innerHTML += `
                <div class="categorylinewrapper">
                    <span class="treeviewsubcategory" id="`+assetinfo[currentasset].category+assetinfo[currentasset].subcategory+`" name="`+assetinfo[currentasset].subcategory+`" onclick="selectsubcategory(this.id, '`+assetinfo[currentasset].category+`');categorysearch(this.id, '`+assetinfo[currentasset].category+`', this.attributes['name'].value)">`+assetinfo[currentasset].subcategory.charAt(0).toUpperCase() + assetinfo[currentasset].subcategory.slice(1)+`</span>
                    <span class="categoryassetcount" id="`+assetinfo[currentasset].category+assetinfo[currentasset].subcategory+`subcount">1</span>
                </div>
                `
            }
        }
    }
}

// Adds functionality to the searchabr and treeview when switching pages
function materialtreeview() {
    if(window.location.href.indexOf("materials") > -1){
        searchquery = [];
        setTimeout(addtreeviewfunctionality,300);
        setTimeout(addsearchfunctionality,300);
        setTimeout(search,300);
        /*addtreeviewfunctionality()
        addsearchfunctionality()*/
    }
}

// Generate the materials asset thumbnails from the json and search data
function generatematthumbs(issearched){
    let assetarray
    if(issearched == true){
        assetarray = finalfilter
    }
    else {
        assetarray = Object.keys(assetinfo)
    }
    if(window.location.href.indexOf("materials") > -1){
        document.getElementById("maincontainer").innerHTML = ""
        for(let i = 0; i < assetarray.length; i++){
            let currentasset = assetarray[i]

            document.getElementById("maincontainer").innerHTML += `
            <div class="asset-list-thumb" id="`+currentasset+`" onclick="showmatassetcard(this.id);enableselects();"><img src="assets/materials/`+currentasset+`/`+currentasset+`_thumbnail_640p.webp" class="img" alt="`+currentasset+`"><div class="thumbtitlecontainer"><span class="thumbtitle">`+assetinfo[currentasset].assetname+`</span></div></div>
            `
        }
    }
}