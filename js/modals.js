
function showprivacypolicymodal(){
    document.getElementById("modalbg").innerHTML = `
    <div class="modalbgclose" onclick="closemodal()"></div>
    <div class="modal" id="modal">
        <div class="modal-header">
            <div class="modal-title">Privacy policy</div>
            <div class="closebutton" onclick="closemodal()"></div>
        </div>
        <div class="modalbody">

            <h4>Last updated: February 16, 2023</h2>

            <h3>Third Party cookies</h3>
            The site doen't use any third party cookies

            <h3>Performance cookies</h3>
            The site uses cookies to find out how many files are you downloading at a time to improve
            the performance of the server

            <h3>Other cookies</h3>
            work in progress
            
            
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