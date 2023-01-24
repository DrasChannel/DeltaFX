/*
    ┏━━━━━━━━━━━━━┓
    ┃  script.js  ┃
    ┗━━━━━━━━━━━━━┛

    Script for delta graphics
*/


// variables

const swup = new Swup()
var assetinfo;



// fetch asset info

fetch ("./materials.json")
    .then(response => response.json())
    .then(asstinf => assetinfo = asstinf)
