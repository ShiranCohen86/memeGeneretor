'use strict'

var gElCanvas;
var gCtx;

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    draw()
}
function onUpdateLineTxt(txt) {
    updateLineTxt(txt);
    draw();
}


function draw() {
    const img = new Image()
    img.src = gImgs[gMeme.selectedImgId].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gMeme.lines[gMeme.selectedLineIdx].txt, gElCanvas.width / 2, 50)
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