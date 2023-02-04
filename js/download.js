const fs = require('fs');
const archiver = require('archiver');

function downloadmaterial(){
    // find out if i'm downloading materials, models or other assets
    document.getElementById("downloadmat").classList.add('disabled')
    let page = window.location.pathname.split("/").pop();

    //checkbox variables
    let checkboxestex = document.getElementById("info-checkbox-textures").querySelectorAll('.info-checkbox');
    let checkboxesoth = document.getElementById("info-checkbox-other").querySelectorAll('.info-checkbox');
    let checkedboxestex = [];
    let checkedboxesoth = [];

    // find out which checkboxes are checked and put them in a variable
    for (let i = 0; i < checkboxestex.length; i++) {
        if (checkboxestex[i].checked) {
            checkedboxestex.push(checkboxestex[i].id);
        }
    }
    for (let i = 0; i < checkboxesoth.length; i++) {
        if (checkboxesoth[i].checked) {
             checkedboxesoth.push(checkboxesoth[i].id);
        }
    }
    

    // create zip arcive
    let imageFiles = [];
    let otherFiles = [];
    var zip = new JSZip();
    for (let i = 0; i < checkedboxestex.length; i++) {
        imageFiles.push(fetch("content/"+page.replace(".html", "")+"/"+openassetid+"/"+resspan.innerText+"_"+formatspan.innerText+"/"+openassetid+"_"+resspan.innerText+"_"+checkedboxestex[i]+"."+formatspan.innerText).then(function(response) { return response.blob(); }));
    }
    if(checkedboxesoth.length > 0){
        for (let i = 0; i < checkedboxesoth.length; i++) {
            otherFiles.push(fetch("content/"+page.replace(".html", "")+"/"+openassetid+"/"+openassetid+checkedboxesoth[i]).then(function(response) { return response.blob(); }));
        }
    }

    Promise.all(imageFiles.concat(otherFiles))
    .then(function(files) {
        for (let h = 0; h < imageFiles.length; h++) {
            zip.file(openassetid+"_"+resspan.innerText+"_"+checkedboxestex[h]+"."+formatspan.innerText.toLowerCase(), imageFiles[h], { binary: true });
        }
        if(checkedboxesoth.length > 0){
            for (let h = 0; h < otherFiles.length; h++) {
                zip.file(openassetid+checkboxesoth[h].id, otherFiles[h], { binary: true });
            }
        }
        return zip.generateAsync({ type: "blob" });
    })
    .then(function(content) {
        // trigger the download
        let link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = openassetid+".zip";
        link.click();
        document.getElementById("downloadmat").classList.remove('disabled')
    });
}


//function for calculating file size for images
function calculatefilesize(){
    let page = window.location.pathname.split("/").pop();
    let checkboxestex = document.getElementById("info-checkbox-textures").querySelectorAll('.info-checkbox');
    let checkedboxestex = [];
    let totalbytes = 0;

    // find out which checkboxes are checked and put them in a variable
    for (let i = 0; i < checkboxestex.length; i++) {
        if (checkboxestex[i].checked) {
            checkedboxestex.push(checkboxestex[i].id);
        }
    }

    // make http request for the file size and send the data to the next function
    let requests = 0;
    for(let i = 0; i < checkedboxestex.length; i++){
        let xhr = new XMLHttpRequest();
        xhr.open('HEAD', "content/"+page.replace(".html", "")+"/"+openassetid+"/"+resspan.innerText+"_"+formatspan.innerText+"/"+openassetid+"_"+resspan.innerText+"_"+checkedboxestex[i]+"."+formatspan.innerText);
        xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            totalbytes += parseInt(xhr.getResponseHeader('Content-Length'), 10);
            requests++;
            if (requests === checkedboxestex.length) {
                calculateotherfilesize(totalbytes);
            }
        }
        };
        xhr.send();
    }
}
// calculate file size for other files
function calculateotherfilesize(totalbytes) {
    let page = window.location.pathname.split("/").pop();
    let checkboxesoth = document.getElementById("info-checkbox-other").querySelectorAll('.info-checkbox');
    let checkedboxesoth = [];
    let totalbytes2 = 0

    for (let i = 0; i < checkboxesoth.length; i++) {
        if (checkboxesoth[i].checked) {
             checkedboxesoth.push(checkboxesoth[i].id);
        }
    }

    let requests = 0;
    if(checkedboxesoth.length > 0){
        for(let i = 0; i < checkedboxesoth.length; i++){
            let xhr = new XMLHttpRequest();
            xhr.open('HEAD', "content/"+page.replace(".html", "")+"/"+openassetid+"/"+openassetid+checkedboxesoth[i]);
            xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                totalbytes2 += parseInt(xhr.getResponseHeader('Content-Length'), 10);
                requests++;
                if (requests === checkedboxesoth.length) {
                    updatesize(totalbytes2+totalbytes);
                }
            }
            };
            xhr.send();
        }
    }
    else{
        updatesize(totalbytes2+totalbytes);
    }
    
}
// calculate the final size and set it to the "info-file-size" element
function updatesize(bytesum){
    document.getElementById("info-file-size").innerHTML = (bytesum / Math.pow(10, 6)).toFixed(2)+" mb"
}