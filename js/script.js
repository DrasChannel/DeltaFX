const swup = new Swup()

// run once when page loads
if (document.readyState === 'complete') {
    scrolltotop();
} else {
    document.addEventListener('DOMContentLoaded', () => scrolltotop());
    document.addEventListener('DOMContentLoaded', () => generatemattreeview());
    document.addEventListener('DOMContentLoaded', () => generatematthumbs());
}
  
// run after every additional navigation by swup
swup.on('contentReplaced', scrolltotop);
swup.on('contentReplaced', generatemattreeview);
swup.on('contentReplaced', generatematthumbs);

// Define the function that does scrolling and fading


// function that decides if the function above is going to be executed
function scrolltotop(){
    window.scrollTo({top: 0,behavior: 'instant'});
}

function generatemattreeview(){
    if(window.location.href.indexOf("materials") > -1){
        document.getElementById("treeview").innerHTML = ""
        for(let i = 0; i < Object.keys(assetinfo).length; i++){
            let currentasset = Object.keys(assetinfo)[i]
            
            if(document.getElementById(assetinfo[currentasset].category+"tcontainer") != null){
                document.getElementById(assetinfo[currentasset].category+"subcategory").innerHTML += `
                <div class="categorylinewrapper">
                    <span class="treeviewsubcategory" id="`+assetinfo[currentasset].category+assetinfo[currentasset].subcategory+`" name="`+assetinfo[currentasset].subcategory+`" onclick="selectsubcategory(this.id, '`+assetinfo[currentasset].category+`');categorysearch(this.id, '`+assetinfo[currentasset].category+`', this.attributes['name'].value)">`+assetinfo[currentasset].subcategory.charAt(0).toUpperCase() + assetinfo[currentasset].subcategory.slice(1)+`</span>
                    <span class="categoryassetcount" id="categorysubassetcount`+i+`">1</span>
                </div>
                `
            } else {
                
                document.getElementById("treeview").innerHTML += `
                <div class="treeviewcategorycontainer" id="`+assetinfo[currentasset].category+`tcontainer">
                <div class="treeviewarrow" id="`+assetinfo[currentasset].category+`arrow" onclick="togglesubcategory('`+assetinfo[currentasset].category+`');removecategorysearch()"></div>
                <span class="treeviewcategory" id="`+assetinfo[currentasset].category+`" name="`+assetinfo[currentasset].category+`" onclick="selectcategory(this.id);categorysearch(this.id, this.attributes['name'].value, this.attributes['name'].value)">`+assetinfo[currentasset].category.charAt(0).toUpperCase() + assetinfo[currentasset].category.slice(1)+`</span>
                <span class="categoryassetcount" id="categoryassetcount`+i+`">1</span>
                </div>
                `
                document.getElementById("treeview").innerHTML += `
                <div class="treeviewsubcategorycontainer" id="`+assetinfo[currentasset].category+`subcategory">
                </div>
                `
                document.getElementById(assetinfo[currentasset].category+"subcategory").innerHTML += `
                <div class="categorylinewrapper">
                    <span class="treeviewsubcategory" id="`+assetinfo[currentasset].category+assetinfo[currentasset].subcategory+`" name="`+assetinfo[currentasset].subcategory+`" onclick="selectsubcategory(this.id, '`+assetinfo[currentasset].category+`');categorysearch(this.id, '`+assetinfo[currentasset].category+`', this.attributes['name'].value)">`+assetinfo[currentasset].subcategory.charAt(0).toUpperCase() + assetinfo[currentasset].subcategory.slice(1)+`</span>
                    <span class="categoryassetcount" id="categorysubassetcount`+i+`">1</span>
                </div>
                `
            }
        }

        for(let i = 0; i < Object.keys(assetinfo).length; i++){
            let currentasset = Object.keys(assetinfo)[i]

            document.getElementById("categoryassetcount"+i).innerHTML = document.getElementById(assetinfo[currentasset].category+"subcategory").childElementCount;
        }
    }
}

function generatematthumbs(){
    if(window.location.href.indexOf("materials") > -1){
        document.getElementById("maincontainer").innerHTML = ""
        for(let i = 0; i < Object.keys(assetinfo).length; i++){
            let currentasset = Object.keys(assetinfo)[i]

            document.getElementById("maincontainer").innerHTML += `
            <div class="asset-list-thumb" id="`+currentasset+`" onclick="showmatassetcard(this.id);enableselects();"><img src="assets/materials/`+currentasset+`/`+currentasset+`_thumbnail_640p.webp" class="img" alt="`+currentasset+`"><div class="thumbtitlecontainer"><span class="thumbtitle">`+assetinfo[currentasset].assetname+`</span></div></div>
            `
        }
    }
}