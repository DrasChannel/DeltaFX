function togglesubcategory(id4){
    if (document.getElementById(id4+"arrow").classList.contains("active") == true){
        deselectsubcategory()
    }
    document.getElementById(id4+"arrow").classList.toggle("active");
    document.getElementById(id4+"subcategory").classList.toggle("active");
}

function selectcategory(id5){
    document.getElementById(id5).classList.toggle("selected");
    document.getElementById(id5).setAttribute("onclick", "deselectcategory(this.id);categorysearch(this.id, this.attributes['name'].value, this.attributes['name'].value)");

    if (document.getElementById(id5+"arrow").classList.contains("active") == true){

    } else {
        document.getElementById(id5+"arrow").classList.toggle("active");
        document.getElementById(id5+"subcategory").classList.toggle("active");
    }
    deselectsubcategory()

    let treeviewcategories = document.querySelectorAll(".treeviewcategory");
    treeviewcategories.forEach((trvwcategory) =>{
        if (trvwcategory.id != id5){
            trvwcategory.classList.remove("selected");
            trvwcategory.setAttribute("onclick", "selectcategory(this.id);categorysearch(this.id, this.attributes['name'].value, this.attributes['name'].value)");

            if (document.getElementById(trvwcategory.id+"arrow").classList.contains("active") == true){
                document.getElementById(trvwcategory.id+"arrow").classList.remove("active");
                document.getElementById(trvwcategory.id+"subcategory").classList.remove("active");
            }
        }
    });
}

function deselectsubcategory(){
    var subcategories = document.querySelectorAll(".treeviewsubcategory")

    subcategories.forEach(subcategory => {
        subcategory.classList.remove("selected")
    });
}

function selectsubcategory(id6, id7){
    if (document.getElementById(id6).classList.contains("selected") == true){
        document.getElementById(id7+"arrow").classList.toggle("active");
        document.getElementById(id7+"subcategory").classList.toggle("active");
    }
    let treeviewcategories = document.querySelectorAll(".treeviewcategory");
    treeviewcategories.forEach((trvwcategory) =>{
        if (trvwcategory.id != id7){
            trvwcategory.classList.remove("selected");
            trvwcategory.setAttribute("onclick", "selectcategory(this.id);categorysearch(this.id, this.attributes['name'].value, this.attributes['name'].value)");

            if (document.getElementById(trvwcategory.id+"arrow").classList.contains("active") == true){
                document.getElementById(trvwcategory.id+"arrow").classList.remove("active");
                document.getElementById(trvwcategory.id+"subcategory").classList.remove("active");
            }
        }
    });
    if (document.getElementById(id6).classList.contains("selected") == true){
        deselectsubcategory()
    } else {
        deselectsubcategory()
        document.getElementById(id6).classList.toggle("selected");
    }
    if (document.getElementById(id7).classList.contains("selected") == true){
        document.getElementById(id7).classList.toggle("selected");
        document.getElementById(id7).setAttribute("onclick", "selectcategory(this.id);categorysearch(this.id, this.attributes['name'].value, this.attributes['name'].value)");
    }
}

function deselectcategory(id6){
    document.getElementById(id6).classList.toggle("selected");
    document.getElementById(id6).setAttribute("onclick", "selectcategory(this.id);categorysearch(this.id, this.attributes['name'].value, this.attributes['name'].value)");

    if (document.getElementById(id6+"arrow").classList.contains("active") == true){
        document.getElementById(id6+"arrow").classList.toggle("active");
        document.getElementById(id6+"subcategory").classList.toggle("active");
    }
}