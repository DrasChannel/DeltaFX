var assetinfo;
fetch ("./materials.json")
    .then(response => response.json())
    .then(asstinf => assetinfo = asstinf)
    .then(data => {
        window.onload = function() {
            let currentUrl = window.location.href;
            if (currentUrl.indexOf("?id=") !== -1) {
                let div = document.getElementById(currentUrl.split("?id=")[1]);
                let event = new Event("click");
                div.dispatchEvent(event);
            }
        };

    })