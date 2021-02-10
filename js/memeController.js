'use strict'

var gElCanvas;
var gCtx;
var gCurrImgSrc;

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    draw()
}
function onUpdateLineTxt(txt) {
    updateLineTxt(txt);
    draw(gCurrImgSrc);
}


function draw(imgUrl) {
    const img = new Image()
    img.src = imgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gMeme.lines[0].txt, gElCanvas.width / 2,  50)
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}