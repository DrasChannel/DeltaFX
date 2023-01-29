const swup = new Swup()

// run once when page loads
if (document.readyState === 'complete') {
    scrollfade();
} else {
    document.addEventListener('DOMContentLoaded', () => scrollfade());
}
  
// run after every additional navigation by swup
swup.on('contentReplaced', scrollfade);

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
    if(window.location.href.indexOf("Home") !== -1){
        console.log(1)
        document.getElementById("navbar").style.background = "rgba(33, 33, 33, 0)"
        document.getElementById("navbar").style.backdropFilter = "blur(0px)"
        window.addEventListener("scroll", scrlfdFunc)
    } else {
        document.getElementById("navbar").style.background = "rgba(33, 33, 33, 0.5)"
        document.getElementById("navbar").style.backdropFilter = "blur(40px)"
        window.removeEventListener("scroll", scrlfdFunc);
    }
}