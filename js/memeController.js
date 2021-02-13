'use strict'

var gElCanvas;
var gCtx;
var gStorageMemes = loadFromStorage('MEMES') || [];




function init() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    addMeme()
}

function onUpdateMemeTxt(txt) {
    updateMemeTxt(txt);
    drawMeme();
}

function drawMeme(mark = true) {

    var img = new Image();
    img.src = `img/${getCurrMeme().selectedImgId}.jpg`;

    img.onload = () => {
        gElCanvas.height = gElCanvas.width * img.height / img.width;
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        setLinesWidth();

        if (mark) markLineFocus();

        getCurrMeme().lines.forEach(drawTxtLine);
        updateTextInput();
    };
}

function drawTxtLine(line) {
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.textAlign = line.align;
    gCtx.font = `${line.fontSize}px ${line.font}`;
    gCtx.fillText(line.txt, line.location.x, line.location.y);
    gCtx.strokeText(line.txt, line.location.x, line.location.y);
}

function markLineFocus() {
    const currLine = getCurrLine();
    gCtx.beginPath();
    gCtx.fillStyle = 'rgba(0, 162, 255, 0.4)';
    gCtx.rect((currLine.location.x - currLine.width / 2) - 10, currLine.location.y - currLine.fontSize, currLine.width + 20, currLine.fontSize + 5);
    gCtx.fill();
}

function updateTextInput() {
    const currLineText = getCurrMeme().lines[getSelectedLine()].txt;
    document.querySelector('#free-text').value = currLineText;
}

function onAddText() {
    addMeme();
    drawMeme();
}

function onMoveLine(direction) {
    var diff = (direction === 'up') ? -10 : 10;
    upDownLine(diff)
    drawMeme();
}

function onSwitchLine() {
    switchSelectedLines();
    updateTextInput();
    drawMeme();
}

function onChangeFontSize(direction) {
    var diff = (direction === 'up') ? 10 : -10;
    changeFontSize(diff)
    drawMeme();
}

function onSaveImage(elLink) {
    var imgContent = gElCanvas.toDataURL(); //.replace("image/png", "image/octet-stream")
    elLink.href = imgContent
    gStorageMemes.push(imgContent)


    saveToStorage('MEMES', gStorageMemes);
}