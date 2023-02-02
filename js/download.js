function downloadmaterial(){
    // find out if i'm downloading materials or other assets
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
        imageFiles.push(fetch("Content/"+page.replace(".html", "")+"/"+openassetid+"/"+resspan.innerText+"_"+formatspan.innerText+"/"+openassetid+"_"+resspan.innerText+"_"+checkedboxestex[i]+"."+formatspan.innerText).then(function(response) { return response.blob(); }));
    }
    if(checkedboxesoth.length > 0){
        for (let i = 0; i < checkedboxesoth.length; i++) {
            otherFiles.push(fetch("Content/"+page.replace(".html", "")+"/"+openassetid+"/"+openassetid+checkedboxesoth[i]).then(function(response) { return response.blob(); }));
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
        var link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = openassetid+".zip";
        link.click();
        document.getElementById("downloadmat").classList.remove('disabled')
    });
}