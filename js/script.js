const swup = new Swup()

// run once when page loads
if (document.readyState === 'complete') {
    scrollfade();
    addsearchbar();
} else {
    document.addEventListener('DOMContentLoaded', () => scrollfade());
    document.addEventListener('DOMContentLoaded', () => addsearchbar());
}
  
// run after every additional navigation by swup
swup.on('contentReplaced', scrollfade);
swup.on('clickLink', addsearchbar);

// Define the function that does scrolling and fading
let scrlfdFunc = function scrlfd() {
    let scroll = (window.pageYOffset / 400).toString();
    let scroll2 = (window.pageYOffset / 5).toString();
    if(scroll>0.5){
        scroll=0.5
    }
    if(scroll2>40){
        scroll2=40
    }
    document.getElementById("navbar").style.backgroundColor = "rgba(33, 33, 33, "+scroll+")"
    document.getElementById("navbar").style.backdropFilter = "blur("+scroll2+"px)"
}

// function that decides if the function above is going to be executed
function scrollfade(){
    window.scrollTo({top: 0,behavior: 'instant'});
    if(window.location.href.indexOf("home") !== -1){
        document.getElementById("navbar").style.background = "rgba(33, 33, 33, 0)"
        document.getElementById("navbar").style.backdropFilter = "blur(0px)"
        window.addEventListener("scroll", scrlfdFunc)
    } else {
        document.getElementById("navbar").style.background = "rgba(33, 33, 33, 0.5)"
        document.getElementById("navbar").style.backdropFilter = "blur(40px)"
        window.removeEventListener("scroll", scrlfdFunc);
    }
}

// function to add searchbar
function addsearchbar() {
    setTimeout(function() {
        if(window.location.href.indexOf("materials") !== -1){
            document.getElementById("searchbar-container").style.width = "948px"
            document.getElementById("searchbar-container").innerHTML = `
            <div class="searchbar" id="searchbar-materials">
                <input type="text" class="search-input" placeholder="Search materials" onfocus="focussearchbar()">
            </div>
            <div class="search-options">
                <span class="search-options-title">Sort by</span>
                <div class="search-option-releasedate">Latest</div>
            </div>
            `
            document.getElementById("searchbar-container").style.opacity = "1"
        } else if(window.location.href.indexOf("models") !== -1) {
            document.getElementById("searchbar-container").style.width = "948px"
            document.getElementById("searchbar-container").innerHTML = `
            <div class="searchbar" id="searchbar-models">
                <input type="text" class="search-input" placeholder="Search models" onfocus="focussearchbar()">
            </div>
            <div class="search-options">
                <span class="search-options-title">Sort by</span>
                <div class="search-option-releasedate">Latest</div>
            </div>
            `
            document.getElementById("searchbar-container").style.opacity = "1"
        } else {
            document.getElementById("searchbar-container").innerHTML = ``
            document.getElementById("searchbar-container").style.opacity = "0"
            document.getElementById("searchbar-container").style.width = "0px"
        }
    }, 80);
}

function focussearchbar() {
    document.querySelector(".searchbar").style.border = "solid 2px #1aa8ff"
    document.querySelector(".search-input").addEventListener('blur', (event) => {
        document.querySelector(".searchbar").style.border = "solid 2px #2b2b2b"
    });
}