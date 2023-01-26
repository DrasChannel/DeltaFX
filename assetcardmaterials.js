/*
    ┏━━━━━━━━━━━━━━━━━━━━━━┓
    ┃  scriptassetcard.js  ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━┛

    Script for asset card in delta graphics
*/



// variables

var openassetid = 0


// code for asset cards

function showassetcard(id3) {

    //sets openassetid to the id that you click on
    openassetid = id3

    //adds the content of the popup to the modal container
    document.getElementById("modalbg").innerHTML = `
    <div class="modalbgclose" id="modalbgclose" onclick="closeassetcard()"></div>
    <div class="assetcard" id="assetcard">
        <div class="imageviewer" id="imageviewer">
            <img class="viewingimage" id="viewingimage" src="">
            <div class="imageoptionscontainer">
                <div class="imageselector">
                    <div class="image" id="image1" onclick="selectimage(this.id)"></div>
                    <div class="image selected" id="image2" onclick="selectimage(this.id)"></div>
                    <div class="image" id="image3" onclick="selectimage(this.id)"></div>
                </div>
            </div>
            <div class="fullscreencontrolscontainer">
                <div class="imageindicatorcontainer">
                    <div class="imageindicator"></div>
                </div>
                <div class="fullscreenbuttonscontainer">
                    <div class="fullscreenpreviewmapsb" onclick="">Preview maps</div>
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
                <div class="assetinfocontainer">
                    
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
                            <span class="info-text">16mb</span>
                        </div>
                        <a class="source-file-link"></a>
                    </div>
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
                <button class="button-large primary">Download</button>
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
            <input type="checkbox" class="info-checkbox" name="`+assetinfo[id3].texturemapids[i]+`" checked="">
            <span class="info-checkmark">
                <img class="check-svg" src="Assets/svg/check.svg">
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
            <input type="checkbox" class="info-checkbox" name="`+assetinfo[id3].otherfileids[i]+`" checked="">
            <span class="info-checkmark">
                <img class="check-svg" src="Assets/svg/check.svg">
            </span>
            <span class="info-map-name">`+assetinfo[id3].otherfiles[i]+`</span>
        </div>
        `
    }

    for (let i = 0; i < assetinfo[id3].resolutions.length; i++) {
        if(i==0){
            document.getElementById("resselect").innerHTML += `<div class="dropdown-option selected" id="resoption">`+assetinfo[id3].resolutions[i]+`</div>`
            document.getElementById("resselected").innerHTML = `<span>`+assetinfo[id3].resolutions[i]+`</span>`
        }
        else{
            document.getElementById("resselect").innerHTML += `<div class="dropdown-option" id="resoption">`+assetinfo[id3].resolutions[i]+`</div>`
        }
    }
    for (let v = 0; v < assetinfo[id3].fileformats.length; v++) {
        if(v==0){
            document.getElementById("formatselect").innerHTML += `<div class="dropdown-option selected" id="formatoption">`+assetinfo[id3].fileformats[v]+`</div>`
            document.getElementById("formatselected").innerHTML = `<span>`+assetinfo[id3].fileformats[v]+`</span>`
        }
        else{
            document.getElementById("formatselect").innerHTML += `<div class="dropdown-option" id="formatoption">`+assetinfo[id3].fileformats[v]+`</div>`
        }
    }


    document.getElementById("image1").setAttribute("class", "image");
    document.getElementById('image1').style.backgroundImage="url(Assets/"+id3+"/"+id3+"_image1_192p.jpeg)";

    document.getElementById("image2").setAttribute("class", "image");
    document.getElementById('image2').style.backgroundImage="url(Assets/"+id3+"/"+id3+"_image2_192p.jpeg)";

    document.getElementById("image3").setAttribute("class", "image");
    document.getElementById('image3').style.backgroundImage="url(Assets/"+id3+"/"+id3+"_image3_192p.jpeg)";

    document.getElementById("image2").setAttribute("class", "image selected");
    document.getElementById("viewingimage").setAttribute("src", "Assets/"+id3+"/"+id3+"_image2_1360p.jpeg")
    document.getElementById("modalbg").setAttribute("class", "active");
    document.getElementById("html").style.overflow = "hidden";
}

function enableselects(){
    document.getElementById(openassetid).setAttribute("onclick", "showassetcard(this.id);");
    
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
}








function closeassetcard() {
    document.getElementById(openassetid).setAttribute("onclick", "showassetcard(this.id);enableselects();");
    openassetid = 0
    document.getElementById("modalbg").setAttribute("class", "");
    document.getElementById("html").style.overflow = "overlay";
    document.getElementById("modalbg").innerHTML = ""
}

function selectimage(id2){
    document.getElementById("image1").setAttribute("class", "image");
    document.getElementById("image2").setAttribute("class", "image");
    document.getElementById("image3").setAttribute("class", "image");
    document.getElementById(id2).setAttribute("class", "image selected");
    document.getElementById("viewingimage").setAttribute("src", "Assets/"+openassetid+"/"+openassetid+"_"+id2+"_1360p.jpeg")
}