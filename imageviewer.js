function openfullscreenview() {
    let = imageid = document.querySelector('.image.selected').id
    document.getElementById("fullscreenimage").setAttribute("src", "/Assets/"+openassetid+"/"+openassetid+"_"+imageid+"_2160p.jpeg");
    document.getElementById("fullscreencontainer").classList.toggle("active")

    const container = document.querySelector('.fullscreenimagecontainer')
    const img = document.getElementById("fullscreenimage")

    let zoom = 1
    let gmtcx;
    let gmtcy;

    container.addEventListener('wheel', e => {
        let mtcX;
        let mtcY;

        zoom += e.deltaY * -0.01
        zoom = Math.min(Math.max(1, zoom), 5)

        if (zoom == 1){
            mtcX = 0
            mtcY = 0
        }
        else if (zoom == 5){

        }
        else{
            mtcX = ((window.innerHeight/2)-e.offsetX)*(zoom-1)
            mtcY = ((window.innerHeight/2)-e.offsetY)*(zoom-1)
        }
        
        img.style.transform = `translate(${mtcX}px, ${mtcY}px) scale(${zoom})`

        gmtcx = mtcX
        gmtcy = mtcY
    })

    let clicked = false
    let xAxis;
    let x;
    let yAxis;
    let y;


    container.addEventListener('mousedown', e => {
        clicked = true;
        xAxis = e.offsetX - gmtcx;
        yAxis = e.offsetY - gmtcy;
    })

    window.addEventListener('mouseup', () => clicked = false)

    container.addEventListener('mousemove', e => {
        if (!clicked) return
        e.preventDefault()

        x = e.offsetX
        y = e.offsetY

        img.style.transform = `translate(${gmtcx}px, ${gmtcy}px) scale(${zoom})`
    })
}

function closefullscreenview(){
    document.getElementById("fullscreencontainer").classList.toggle("active")
    document.getElementById("fullscreenimage").setAttribute("src", "");
    document.getElementById("fullscreenimage").style.transform = ``
}

