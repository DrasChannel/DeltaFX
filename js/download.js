function downloadmaterial(){
    let page = window.location.pathname.split("/").pop();
    let checkboxes = document.querySelectorAll('.info-checkbox');
    let checkedboxes = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          checkedboxes.push(checkboxes[i].id);
        }
    }
    console.log("Checked checkboxes:", checkedboxes);

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
    });
}