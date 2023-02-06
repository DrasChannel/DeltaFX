const swup = new Swup()

// run once when page loads
if (document.readyState === 'complete') {
    scrolltotop();
} else {
    document.addEventListener('DOMContentLoaded', () => scrolltotop());
}
  
// run after every additional navigation by swup
swup.on('contentReplaced', scrolltotop);

// Define the function that does scrolling and fading


// function that decides if the function above is going to be executed
function scrolltotop(){
    window.scrollTo({top: 0,behavior: 'instant'});
}