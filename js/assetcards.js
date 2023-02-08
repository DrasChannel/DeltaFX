
// variables

var openassetid = 0

// code for asset cards

function showmatassetcard(id3) {
    // sets page window location
    page = "materials";

    //sets openassetid to the id that you click on
    openassetid = id3

    history.pushState({}, "", "?id=" + openassetid);

    //adds the content of the popup to the modal container
    document.getElementById("modalbg").innerHTML = `
    <div class="modalbgclose" id="modalbgclose" onclick="closeassetcard()"></div>
    <div class="assetcard" id="assetcard">
        <div class="imageviewer" id="imageviewer">
            <div class="vieweing-image-container" id="vieweing-image-container">
                <img class="viewingimage" id="viewingimage1" src="">
                <img class="viewingimage" id="viewingimage2" src="">
                <img class="viewingimage" id="viewingimage3" src="">
            </div>
            <div class="image-select-container">
                <div class="imageselector">
                    <div class="image" id="image1" onclick="selectimage(this.id)"></div>
                    <div class="image selected" id="image2" onclick="selectimage(this.id)"></div>
                    <div class="image" id="image3" onclick="selectimage(this.id)"></div>
                </div>
            </div>
            <div class="fullscreen-controls-container">
                <div class="fullscreenbuttonscontainer">
                    <div class="fullscreenpreviewmapsb" onclick="previewmaps()">Preview maps</div>
                    <div class="fullscreenbuttonbg">
                        <div class="fullscreenbutton" onclick="openfullscreenview()"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="assetdescription">
            <div class="assetcardheader">
                <div class="assetcardtitle" id="assetcardtitle">
                    <span id="assetname">`+assetinfo[id3].assetname+`</span>
                    <span class="assetcardsubtitle">PBR Material`+assetinfo[id3].dimensions+`</span>
                </div>
                <div class="closebutton" onclick="closeassetcard()"></div>
            </div>
            <div class="assetcardinfo">
                <div class="info-oneline">
                    <div class="infocontainer info-releasedate">
                        <span class="info-title">Release date</span>
                        <span class="info-text">`+assetinfo[id3].releasedate+`</span>
                    </div>
                    <div class="infocontainer info-method">
                        <span class="info-title">Method of creation</span>
                        <span class="info-text">`+assetinfo[id3].methodofcreation+`</span>
                    </div>
                </div>
                <div class="infocontainer info-tags">
                    <span class="info-text" id="tag-buttons"></span>
                </div>
                <div class="infocontainer">
                    <span class="info-title">Contained assets</span>
                    <div class="info-checkbox-container">
                        <div class="info-checkbox-textures" id="info-checkbox-textures">
                        </div>
                        <div class="info-checkbox-other" id="info-checkbox-other">
                        </div>
                    </div>
                </div>
                <div class="infocontainer info-downloadsize">
                    <div class="info-download-container">
                        <span class="info-title">Download Size</span>
                        <span class="info-text" id="info-file-size">work in progress</span>
                    </div>
                    <a class="source-file-link"></a>
                </div>
            </div>
            <div class="assetcarddownload">
                <div class="dropdowns">
                    <div class="dropdown" id="resolutiondropdown" tabindex="-1">
                        <div class="dropdown-select" id="resselected">
                        </div>
                        <div class="dropdown-options" id="resselect">
                        </div>
                    </div>
                    <div class="dropdown" id="formatdropdown" tabindex="-1">
                        <div class="dropdown-select" id="formatselected">
                        </div>
                        <div class="dropdown-options" id="formatselect">
                        </div>
                    </div>
                </div>
                <button class="button-large primary" id="downloadmat" onclick="downloadmaterial()">Download</button>
            </div>
        </div>
    </div>
    `

    //adds buttons for tags
    let tags = assetinfo[id3].tags.split(" ");
    let tagsContainer = document.getElementById("tag-buttons");
    for (let i = 0; i < tags.length; i++) {
        let tagButton = document.createElement("button");
        tagButton.setAttribute("class", "button-tiny")
        tagButton.innerHTML = tags[i];
        tagsContainer.appendChild(tagButton);
    }

    //adds checkboxes for textures
    let checkfilestex = assetinfo[id3].texturemaps;
    let checkfilestexcontainer = document.getElementById("info-checkbox-textures");
    for (let i = 0; i < checkfilestex.length; i++) {
        checkfilestexcontainer.innerHTML += `
        <div class="info-checkbox-line">
            <input type="checkbox" onChange="calculatefilesize()" class="info-checkbox" id="`+assetinfo[id3].texturemapids[i]+`" checked="">
            <span class="info-checkmark">
                <img class="check-svg" src="assets/svg/check.svg">
            </span>
            <span class="info-map-name">`+assetinfo[id3].texturemaps[i]+`</span>
        </div>
        `
    }

    //adds checkboxes for other files
    let checkfilesoth = assetinfo[id3].otherfiles;
    let checkfilesothcontainer = document.getElementById("info-checkbox-other");
    for (let i = 0; i < checkfilesoth.length; i++) {
        checkfilesothcontainer.innerHTML += `
        <div class="info-checkbox-line">
            <input type="checkbox" onChange="calculatefilesize()" class="info-checkbox" id="`+assetinfo[id3].otherfileids[i]+`" checked="">
            <span class="info-checkmark">
                <img class="check-svg" src="assets/svg/check.svg">
            </span>
            <span class="info-map-name">`+assetinfo[id3].otherfiles[i]+`</span>
        </div>
        `
    }

    // create select options for all resolutions and file formats
    for (let i = 0; i < assetinfo[id3].resolutions.length; i++) {
        if(i==0){
            document.getElementById("resselect").innerHTML += `<div class="dropdown-option selected" id="resoption">`+assetinfo[id3].resolutions[i]+`</div>`
            document.getElementById("resselected").innerHTML = `<span id="resspan">`+assetinfo[id3].resolutions[i]+`</span>`
        }
        else{
            document.getElementById("resselect").innerHTML += `<div class="dropdown-option" id="resoption">`+assetinfo[id3].resolutions[i]+`</div>`
        }
    }
    for (let v = 0; v < assetinfo[id3].fileformats.length; v++) {
        if(v==0){
            document.getElementById("formatselect").innerHTML += `<div class="dropdown-option selected" id="formatoption">`+assetinfo[id3].fileformats[v]+`</div>`
            document.getElementById("formatselected").innerHTML = `<span id="formatspan">`+assetinfo[id3].fileformats[v]+`</span>`
        }
        else{
            document.getElementById("formatselect").innerHTML += `<div class="dropdown-option" id="formatoption">`+assetinfo[id3].fileformats[v]+`</div>`
        }
    }

    // set the thumbnails to image selector
    document.getElementById("image1").setAttribute("class", "image");
    document.getElementById('image1').style.backgroundImage="url(assets/materials/"+id3+"/"+id3+"_image1_192p.jpeg)";
    document.getElementById("viewingimage1").setAttribute("src", "assets/materials/"+openassetid+"/"+openassetid+"_image1_1360p.jpeg")
    document.getElementById("image2").setAttribute("class", "image");
    document.getElementById('image2').style.backgroundImage="url(assets/materials/"+id3+"/"+id3+"_image2_192p.jpeg)";
    document.getElementById("viewingimage2").setAttribute("src", "assets/materials/"+openassetid+"/"+openassetid+"_image2_1360p.jpeg")
    document.getElementById("image3").setAttribute("class", "image");
    document.getElementById('image3').style.backgroundImage="url(assets/materials/"+id3+"/"+id3+"_image3_192p.jpeg)";
    document.getElementById("viewingimage3").setAttribute("src", "assets/materials/"+openassetid+"/"+openassetid+"_image3_1360p.jpeg")

    // set the default selected image
    document.getElementById("image2").setAttribute("class", "image selected");

    // add active class to modalbg and disable html overflow
    document.getElementById("modalbg").setAttribute("class", "active");
    document.getElementById("html").style.overflow = "hidden";

    // calculate size of all files after loading asset card
    calculatefilesize()
}

function enableselects(){
    document.getElementById(openassetid).setAttribute("onclick", "showmatassetcard(this.id);");
    
    var dropdownselect = document.getElementById("resselected");
    var dropdownoptions = document.getElementById("resselect");
    var dropdownoption = document.querySelectorAll("#resoption");

    //show and hide options list
    dropdownselect.addEventListener("click", () => {
        dropdownoptions.classList.toggle("active");
        dropdownselect.classList.toggle("active");
        document.getElementById("resolutiondropdown").focus()
    });

    document.getElementById("resolutiondropdown").addEventListener("blur", () => {
        dropdownoptions.classList.remove("active");
        dropdownselect.classList.remove("active");
    });

    dropdownoption.forEach((option) => {
        option.addEventListener("click", () => {
            dropdownoption.forEach((option) => {option.classList.remove('selected')})
            dropdownselect.querySelector("span").innerHTML = option.innerHTML;
            option.classList.add("selected");
            dropdownoptions.classList.toggle("active");
            dropdownselect.classList.toggle("active");
        });
    });

    // Code for updating download size when changing resolution
    let target1 = document.getElementById("resspan");
    let observer1 = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
        calculatefilesize()
        }
    });
    });
    let config1 = { childList: true };
    observer1.observe(target1, config1);

    setTimeout(function() {
        target1.textContent = "8K";
    }, 1000);



    var dropdownselect1 = document.getElementById("formatselected");
    var dropdownoptions1 = document.getElementById("formatselect");
    var dropdownoption1 = document.querySelectorAll("#formatoption");

    //show and hide options list
    dropdownselect1.addEventListener("click", () => {
        dropdownoptions1.classList.toggle("active");
        dropdownselect1.classList.toggle("active");
        document.getElementById("formatdropdown").focus()
    });

    document.getElementById("formatdropdown").addEventListener("blur", () => {
        dropdownoptions1.classList.remove("active");
        dropdownselect1.classList.remove("active");
    });

    dropdownoption1.forEach((option1) => {
        option1.addEventListener("click", () => {
            dropdownoption1.forEach((option1) => {option1.classList.remove('selected')})
            dropdownselect1.querySelector("span").innerHTML = option1.innerHTML;
            option1.classList.add("selected");
            dropdownoptions1.classList.toggle("active");
            dropdownselect1.classList.toggle("active");
        });
    });

    // Code for updating download size when changing resolution
    let target2 = document.getElementById("formatspan");
    let observer2 = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
        calculatefilesize()
        }
    });
    });
    let config2 = { childList: true };
    observer2.observe(target2, config1);

    setTimeout(function() {
        target2.textContent = "PNG";
    }, 1000);
}



function closeassetcard() {
    document.getElementById(openassetid).setAttribute("onclick", "showmatassetcard(this.id);enableselects();");
    openassetid = 0
    document.getElementById("modalbg").setAttribute("class", "");
    document.getElementById("html").style.overflow = "overlay";
    document.getElementById("modalbg").innerHTML = ""
    history.replaceState({}, "", "/materials.html");
}

function selectimage(id2){
    // reset all images to be unselected and select the one the user clicked on
    document.getElementById("image1").setAttribute("class", "image");
    document.getElementById("image2").setAttribute("class", "image");
    document.getElementById("image3").setAttribute("class", "image");
    document.getElementById(id2).setAttribute("class", "image selected");

    // extract the clicked image number and calculate the offset for vieweing-image-containe 
    let imgnumber = id2.replace("image", "")
    document.getElementById("vieweing-image-container").style.transform = `translate(0, `+(((imgnumber *688)-1376)*(-1))+`px)`;
    
}