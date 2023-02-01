function downloadmaterial(){
    // find out if i'm downloading materials or other assets
    document.getElementById("downloadmat").classList.add('disabled')
    let page = window.location.pathname.split("/").pop();

    //checkbox variables
    let checkboxestex = document.getElementById("info-checkbox-textures").querySelectorAll('.info-checkbox');
    let checkedboxes = [];

    // find out which checkboxes are checked and put them in a variable
    for (let i = 0; i < checkboxestex.length; i++) {
        if (checkboxestex[i].checked) {
          checkedboxes.push(checkboxestex[i].id);
        }
    }

    // create zip arcive
    var zip = new JSZip();
    let promises = [];
    for (var i = 0; i < checkedboxes.length; i++) {
        promises.push(fetch("Content/"+page.replace(".html", "")+"/"+openassetid+"/"+resspan.innerText+"_"+formatspan.innerText+"/"+openassetid+"_"+resspan.innerText+"_"+checkedboxes[i]+"."+formatspan.innerText).then(function(response) { return response.blob(); }));
    }

    Promise.all(promises)
    .then(function(files) {
        for (let h = 0; h < files.length; h++) {
            zip.file(openassetid+"_"+resspan.innerText+"_"+checkedboxes[h]+"."+formatspan.innerText.toLowerCase(), files[h], { binary: true });
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