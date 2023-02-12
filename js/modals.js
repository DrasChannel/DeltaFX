
function showprivacypolicymodal(){
    document.getElementById("modalbg").innerHTML = `
    <div class="modalbgclose" onclick="closemodal()"></div>
    <div class="modal" id="modal">
        <div class="modal-header">
            <div class="modal-title">Privacy</div>
            <div class="closebutton" onclick="closemodal()"></div>
        </div>
        <div class="modalbody">
            This site uses no cookies! That's right, currently the site does not collect any
            data or save cookie files, however this might change in the future if new features that
            require it are implemented.
        </div>
    </div>`
    document.getElementById("modalbg").setAttribute("class", "active");
    document.getElementById("html").style.overflow = "hidden";
}


function closemodal() {
    document.getElementById("modalbg").setAttribute("class", "");
    document.getElementById("modalbg").innerHTML = ""
    document.getElementById("html").style.overflow = "overlay";
}