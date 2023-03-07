let images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    "assets/svg/arrowcolorful.svg",
    "assets/svg/closebuttoncolorful.svg",
    "assets/svg/downloadcolorful.svg",
    "assets/svg/filesbscolorful.svg",
    "assets/svg/fullscreencolorful.svg",
    "assets/svg/infoIconcolorful.svg",
    "assets/svg/logocolorful.svg",
    "assets/svg/MaterialIconcolorful.svg",
    "assets/svg/ModelIconcolorful.svg",

    "assets/sociallogos/artstation_colorful.svg",
    "assets/sociallogos/instagram_colorful.svg",
    "assets/sociallogos/patreon_colorful.svg",
    "assets/sociallogos/twitter_colorful.svg"
)