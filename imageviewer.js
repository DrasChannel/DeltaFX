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
            <a style="display: contents;" download="`+openassetid+"/"+openassetid+"_"+imageid+`_3072p.jpeg" href="/Assets/`+openassetid+"/"+openassetid+"_"+imageid+`_3072p.jpeg"><div class="fullscreendownloadbutton"></div></a>
        </div>
        <div class="fullscreenimginfo">
            <span>Scroll to zoom</span>
            <span>click & drag to pan</span>
            <span class="fullscreenimginfo-imginfo" style="margin-top: 12px;">`+openassetid+"_"+imageid+`</span>
            <span class="fullscreenimginfo-imginfo">3072x3072px</span>
        </div
    </div>
    `
    document.getElementById("fullscreenimage").style.backgroundImage = ("url(/Assets/"+openassetid+"/"+openassetid+"_"+imageid+"_3072p.jpeg)");
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

function closefullscreenview(){
    document.getElementById("fullscreencontainer").classList.toggle("active")
    document.getElementById("fullscreenimage").setAttribute("src", "");
    document.getElementById("fullscreenimage").style.transform = ``
    document.getElementById("fullscreenimagecontainer").style.transform = "translate(0px, 0px) scale(1)";
    document.getElementById("fullscreenimage").style.backgroundImage = ("");
    document.getElementById("fullscreencontainer").innerHTML = ""
}

