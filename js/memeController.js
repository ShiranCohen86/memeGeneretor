'use strict'

var gElCanvas;
var gCtx;
var gFontSize = 40;
var gCurrLineX;
var gCurrLineY;


function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    draw()
    renderGallery()
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
        drawText(gMeme.lines[gMeme.selectedLineIdx].txt, gElCanvas.width / 2, gElCanvas.height / 8)
    }
}

function drawText(txt, x, y) {
    gCurrLineX = x;
    gCurrLineY = y;
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `${gFontSize}px Impact`
    gCtx.textAlign = 'center'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function changeFontSize(direction) {
    gFontSize += (direction === 'up') ? gFontSize / 2 : -gFontSize / 2;
    draw()
}


function changeLine(direction) {
    var txt = gMeme.lines[gMeme.selectedLineIdx].txt
    var diff = (direction === 'up') ? -gFontSize : gFontSize;
    drawText(txt, gCurrLineX, gCurrLineY + diff)
}