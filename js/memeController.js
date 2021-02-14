'use strict'

var gElCanvas;
var gCtx;
var gStorageMemes;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
    gStorageMemes = loadFromStorage('MEMES') || []
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    // addListeners()
    renderGallery()
    addLine()
}

function updateTextInput() {
    const currLineText = (getCurrMeme().lines.length) ? getCurrMeme().lines[getSelectedLine()].txt : '';
    document.querySelector('#free-text').value = currLineText;

}

function onUpdateMemeTxt(txt) {
    updateMemeTxt(txt);
    drawMeme();
}

function drawMeme() {
    var img = new Image();
    if (getCurrMeme().imgContent) {
        img.src = getCurrMeme().imgContent
    } else {
        img.src = `img/${getCurrMeme().selectedImgId}.jpg`;
    }

    img.onload = () => {
        gElCanvas.height = gElCanvas.width * img.height / img.width;
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        setLinesWidth();

        if (getCurrMeme().selectedLineIdx !== -1) markLineFocus();

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
    gCtx.rect((currLine.location.x - currLine.width / 2) - 10,
        currLine.location.y - currLine.fontSize,
        currLine.width + 20,
        currLine.fontSize + 5);
    gCtx.fill();
}

function onAddText() {
    addLine();
    drawMeme();
}

function onMoveLine(direction) {
    if (gMeme.selectedLineIdx === -1) return;
    var diff = (direction === 'up') ? -10 : 10;
    upDownLine(diff)
    drawMeme();
}

function onSwitchLine() {
    if (gMeme.selectedLineIdx === -1) return;
    switchSelectedLines();
    drawMeme();
}

function onChangeFontSize(direction) {
    if (gMeme.selectedLineIdx === -1) return;
    var diff = (direction === 'up') ? 10 : -10;
    changeFontSize(diff)
    drawMeme();
}

function onDeleteText() {
    deleteLine();
    drawMeme();
}

function onSaveImage() {
    var imgContent = gElCanvas.toDataURL(); //.replace("image/png", "image/octet-stream")
    gStorageMemes.push({ imgContent, id: (gStorageMemes.length + getImages().length + 1), meme: getCurrMeme() })
    saveToStorage('MEMES', gStorageMemes);
}

function goMemes() {
    document.querySelector('.editor-container').style.display = 'none';
    document.querySelector('.image-gallery').style.display = 'none';
    document.querySelector('.memes-gallery').style.display = 'grid';
    renderMemes();
}

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
//     // window.addEventListener('resize', () => {
//     //     resizeCanvas()
//     //     renderCanvas()
//     // })
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)

//     gElCanvas.addEventListener('mousedown', onDown)

//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)

//     gElCanvas.addEventListener('touchstart', onDown)

//     gElCanvas.addEventListener('touchend', onUp)
// }

// function onDown(ev) {
//     const pos = getEvPos(ev)
//     if (!isCirlceClicked(pos)) return
//     gCircle.isDragging = true
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'

// }

// function onMove(ev) {
//     if (gCircle.isDragging) {
//         const pos = getEvPos(ev)
//         const dx = pos.x - gStartPos.x
//         const dy = pos.y - gStartPos.y

//         gCircle.pos.x += dx
//         gCircle.pos.y += dy

//         gStartPos = pos
//         renderCanvas()
//         renderCircle()
//     }
// }

// function onUp() {
//     gCircle.isDragging = false
//     document.body.style.cursor = 'grab'
// }

// function getEvPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
//         }
//     }
//     return pos
// }
