// webpage name variable
let page = 0

function openfullscreenview() {
    // activate the image viewer
    let = imageid = document.querySelector('.image.selected').id
    document.getElementById("fullscreencontainer").innerHTML = `
    <div class="fullscreenbgclose" onclick="closefullscreenview()"></div>
    <div class="fullscreenimagecontainer" id="fullscreenimagecontainer"onclick="closefullscreenview()">
        <div class="fullscreenimage" id="fullscreenimage" ></div>
    </div>
    <div class="fullscreenclosebuttoncont">
        <div class="fullscreenbuttonbg ivb-big">
            <div class="fullscreenclosebutton" onclick="closefullscreenview()"></div>
            <a style="display: contents;" data-no-swup href="/assets/`+page+`/`+openassetid+"/"+openassetid+"_"+imageid+`_3072p.jpeg" download><div class="fullscreendownloadbutton"></div></a>
        </div>
        <div class="fullscreenimginfo">
            <span>Scroll to zoom</span>
            <span>click & drag to pan</span>
            <span class="fullscreenimginfo-imginfo" style="margin-top: 12px;">`+openassetid+"_"+imageid+`</span>
            <span class="fullscreenimginfo-imginfo">3072x3072px</span>
        </div
    </div>
    `
    document.getElementById("fullscreenimage").style.backgroundImage = ("url(/assets/"+page+"/"+openassetid+"/"+openassetid+"_"+imageid+"_3072p.jpeg)");
    document.getElementById("fullscreencontainer").classList.toggle("active")

    // basic image viewer variables
    let scale = 1,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 },
        zoom = document.getElementById("fullscreenimagecontainer");

    // stopp propagation to be able to click on the background to close the image viewer
    document.getElementById("fullscreenimage").addEventListener("click", event => {
        event.stopPropagation();
    });

    // image viewer functionality - panning and zooming
    function setTransform() {
        zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }
    zoom.onmousedown = function (e) {
        e.preventDefault();
        zoom.style.transitionDuration = "0ms"
        zoom.style.cursor = 'grabbing'
        start = { x: e.clientX - pointX, y: e.clientY - pointY };
        panning = true;
        
    }
    zoom.onmouseup = function (e) {
        panning = false;
        zoom.style.cursor = 'grab'
        zoom.style.transitionDuration = "100ms"
    }
    zoom.onmouseleave = function (e) {
        panning = false;
        zoom.style.cursor = 'grab'
        zoom.style.transitionDuration = "100ms"
    }
    zoom.onmousemove = function (e) {
        e.preventDefault();
        if (!panning) {
            return;
        }
        
        if(scale == 1) {
            pointX = 0;
            pointY = 0;
            setTransform();
            return;
        }
        pointX = (e.clientX - start.x);
        pointY = (e.clientY - start.y);
        setTransform();
    }
    zoom.onwheel = function (e) {
        if(panning == false){
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
            delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            scale = Math.min(Math.max(1, scale), 6);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;

            if(scale == 1) {
                pointX = 0;
                pointY = 0;
            }
            setTransform();
        }
    }
}

function previewmaps() {
    // activate the image viewer
    let = imageid = document.querySelector('.image.selected').id
    document.getElementById("fullscreencontainer").innerHTML = `
    <div class="fullscreenbgclose" onclick="closefullscreenview()"></div>
    <div class="fullscreenimagecontainer" id="fullscreenimagecontainer"onclick="closefullscreenview()">
        <div class="fullscreenmap" id="fullscreenimage" ></div>
    </div>
    <div class="mapsselector" id="imgselectormaps">
    </div>
    <div class="fullscreenclosebuttoncont">
        <div class="fullscreenbuttonbg ivb-big">
            <div class="fullscreenclosebutton" onclick="closefullscreenview()"></div>
            <a style="display: contents;" id="map-img-link" data-no-swup href="/content/`+page.replace(".html", "")+"/"+openassetid+"/4K_png/"+openassetid+"_4K_"+assetinfo[openassetid].texturemapids[0]+`.png" download><div class="fullscreendownloadbutton"></div></a>
        </div>
        <div class="fullscreenimginfo">
            <span>Scroll to zoom</span>
            <span>click & drag to pan</span>
            <span class="fullscreenimginfo-imginfo" style="margin-top: 12px;">`+openassetid+"_"+imageid+`</span>
            <span class="fullscreenimginfo-imginfo">4096x4096px</span>
        </div
    </div>
    
    `

    // add maps selector
    let imagessContainer = document.getElementById("imgselectormaps");
    document.getElementById("imgselectormaps").style.height = (assetinfo[openassetid].texturemaps.length*96)+(assetinfo[openassetid].texturemaps.length*6.4)+12.8+"px";
    for (let i = 1; i < assetinfo[openassetid].texturemaps.length+1; i++) {
        let imgs = document.createElement("div");
        imgs.setAttribute("class", "image")
        imgs.setAttribute("id", "map"+i)
        imgs.setAttribute("onclick", "selectmap(this.id)")
        imgs.style.backgroundImage = "url(/content/"+page.replace(".html", "")+"/"+openassetid+"/192p/"+assetinfo[openassetid].texturemapids[i-1]+".jpg)"
        imagessContainer.appendChild(imgs);
    }
    document.getElementById("map1").setAttribute("class", "image selected")

    document.getElementById("fullscreenimage").style.backgroundImage = ("url(/content/"+page.replace(".html", "")+"/"+openassetid+"/4K_png/"+openassetid+"_4K_"+assetinfo[openassetid].texturemapids[0]+".png)");
    document.getElementById("fullscreencontainer").classList.toggle("active")

    // basic image viewer variables
    let scale = 1,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 },
        zoom = document.getElementById("fullscreenimagecontainer");

    // stopp propagation to be able to click on the background to close the image viewer
    document.getElementById("fullscreenimage").addEventListener("click", event => {
        event.stopPropagation();
    });

    // image viewer functionality - panning and zooming
    function setTransform() {
        zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }
    zoom.onmousedown = function (e) {
        e.preventDefault();
        zoom.style.transitionDuration = "0ms"
        zoom.style.cursor = 'grabbing'
        start = { x: e.clientX - pointX, y: e.clientY - pointY };
        panning = true;
        
    }
    zoom.onmouseup = function (e) {
        panning = false;
        zoom.style.cursor = 'grab'
        zoom.style.transitionDuration = "100ms"
    }
    zoom.onmouseleave = function (e) {
        panning = false;
        zoom.style.cursor = 'grab'
        zoom.style.transitionDuration = "100ms"
    }
    zoom.onmousemove = function (e) {
        e.preventDefault();
        if (!panning) {
            return;
        }
        
        if(scale == 1) {
            pointX = 0;
            pointY = 0;
            setTransform();
            return;
        }
        pointX = (e.clientX - start.x);
        pointY = (e.clientY - start.y);
        setTransform();
    }
    zoom.onwheel = function (e) {
        if(panning == false){
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
            delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            scale = Math.min(Math.max(1, scale), 6);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;

            if(scale == 1) {
                pointX = 0;
                pointY = 0;
            }
            setTransform();
        }
    }
}

function selectmap(id){
    for (let i = 1; i < assetinfo[openassetid].texturemaps.length+1; i++) {
        document.getElementById("map"+i).setAttribute("class", "image")
    }
    document.getElementById(id).setAttribute("class", "image selected")
    let newid = id.replace("map", "")
    document.getElementById("fullscreenimage").style.backgroundImage = ("url(/content/"+page.replace(".html", "")+"/"+openassetid+"/4K_png/"+openassetid+"_4K_"+assetinfo[openassetid].texturemapids[Number(newid)-1]+".png)");
    document.getElementById("map-img-link").setAttribute("href", "/content/"+page.replace(".html", "")+"/"+openassetid+"/4K_png/"+openassetid+"_4K_"+assetinfo[openassetid].texturemapids[Number(newid)-1]+".png");
}

function closefullscreenview(){
    document.getElementById("fullscreencontainer").classList.toggle("active")
    document.getElementById("fullscreenimage").setAttribute("src", "");
    document.getElementById("fullscreenimage").style.transform = ``
    document.getElementById("fullscreenimagecontainer").style.transform = "translate(0px, 0px) scale(1)";
    document.getElementById("fullscreenimage").style.backgroundImage = ("");
    document.getElementById("fullscreencontainer").innerHTML = ""
}

