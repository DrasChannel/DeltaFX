function openfullscreenview() {
    let = imageid = document.querySelector('.image.selected').id
    document.getElementById("fullscreenimage").style.background = ("url(/Assets/"+openassetid+"/"+openassetid+"_"+imageid+"_2160p.jpeg)");
    document.getElementById("fullscreencontainer").classList.toggle("active")

    let scale = 1,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 },
        zoom = document.getElementById("fullscreenimagecontainer");

    function setTransform() {
        zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }

    zoom.onmousedown = function (e) {
        e.preventDefault();
        start = { x: e.clientX - pointX, y: e.clientY - pointY };
        panning = true;
    }

    zoom.onmouseup = function (e) {
        panning = false;
    }

    zoom.onmousemove = function (e) {
        e.preventDefault();
        if (!panning) {
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
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;

            setTransform();
        }
    }
}

function closefullscreenview(){
    document.getElementById("fullscreencontainer").classList.toggle("active")
    document.getElementById("fullscreenimage").setAttribute("src", "");
    document.getElementById("fullscreenimage").style.transform = ``
    document.getElementById("fullscreenimagecontainer").style.transform = "translate(0px, 0px) scale(1)";
}

