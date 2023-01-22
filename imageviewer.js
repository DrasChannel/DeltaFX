function openfullscreenview() {
    let = imageid = document.querySelector('.image.selected').id
    document.getElementById("fullscreenimage").setAttribute("src", "/Assets/"+openassetid+"/"+openassetid+"_"+imageid+"_2160p.jpeg");
    document.getElementById("fullscreencontainer").classList.toggle("active")

    const container = document.querySelector('.fullscreenimagecontainer')
    let img = document.getElementById("fullscreenimage");

    let zoom = 1
    let mtcX;
    let mtcY;

    container.addEventListener('wheel', e => {

        zoom += e.deltaY * -0.01
        zoom = Math.min(Math.max(1, zoom), 5)

        console.log(((window.innerHeight/2)-e.offsetX)*(zoom-1))
        console.log(((window.innerHeight/2)-e.offsetY)*(zoom-1))

        if (zoom == 1){
            mtcX = 0
            mtcY = 0
        }
        else{
            mtcX = ((window.innerHeight/2)-e.offsetX)*(zoom-1)
            mtcY = ((window.innerHeight/2)-e.offsetY)*(zoom-1)
        }
        
        img.style.transform = `translate(${mtcX}px, ${mtcY}px) scale(${zoom}) `
    })
}

function closefullscreenview(){
    document.getElementById("fullscreencontainer").classList.toggle("active")
    document.getElementById("fullscreenimage").setAttribute("src", "");
    document.getElementById("fullscreenimage").style.transform = ``
}

