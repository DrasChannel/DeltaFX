if (getCookie("C") != "a") {
    document.body.innerHTML += `<div class="cookie-popup-container" id="cookie-popup-container">
    <div class="cookie-popup">
        <span>This site uses cookies to improve server performance.<span class="cookie-link" onclick="showprivacypolicymodal()">Learn more</span></span>
        <button class="button-large primary" style="width: 110px;" onclick="hideinfocookie()">Got it!</button>
    </div>
    </div>`
}

function hideinfocookie(){
    document.cookie = "C=a;  expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    document.getElementById("cookie-popup-container").style.opacity = "0";
    setTimeout(()=> {
        document.getElementById("cookie-popup-container").innerHTML = "";
        document.getElementById("cookie-popup-container").remove();
    }
    ,300);
    
}