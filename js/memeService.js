'use strict'

const FONT_SIZE = 40;
const ALIGN_TYPE = { LEFT: 'left', RIGHT: 'right', CENTER: 'center' };
const DEFAULT_TXT_ALIGNMENT = ALIGN_TYPE.CENTER;
const TXT_COLOR = 'white';
const FONT = 'Impact'
const STROKE = 'black'
const TXT_TOP_PADDING = 10;

var gMeme = { selectedImgId: -1, selectedLineIdx: -1, lines: [] };

function updateMemeTxt(txt) {
    if (gMeme.selectedLineIdx === -1) return;
    gMeme.lines[getSelectedLine()].txt = txt;

}
function updateTextInput() {
    const currLineText = (getCurrMeme().lines.length) ? getCurrMeme().lines[getSelectedLine()].txt : '';
    document.querySelector('#free-text').value = currLineText;

}
function getCurrMeme() {
    return gMeme;
}

function addLine() {
    var line = {
        txt: `Insert Text`,
        fontSize: FONT_SIZE,
        align: DEFAULT_TXT_ALIGNMENT,
        color: TXT_COLOR,
        font: FONT,
        stroke: STROKE,
        location: _getLinePosition()
    };
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine() {
    if (gMeme.selectedLineIdx === -1) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getSelectedLine() {
    return gMeme.selectedLineIdx;
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function upDownLine(diff) {
    var line = gMeme.lines[gMeme.selectedLineIdx]
    line.location.y += diff
}

function switchSelectedLines() {
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

function setLinesWidth() {
    gMeme.lines.forEach((line) => {
        line.width = gCtx.measureText(line.txt).width * line.fontSize * 0.09;
    });
}

function changeFontSize(diff) {
    var line = gMeme.lines[gMeme.selectedLineIdx]
    line.fontSize += diff
}

function _getLinePosition() {
    if (gMeme.lines.length > 0) {
        const ys = Array.from(gMeme.lines.map((line) => {
            return line.location.y;
        }));

        const maxY = Math.max(...ys);
        const y = maxY + TXT_TOP_PADDING + FONT_SIZE;
        const x = Math.floor(gElCanvas.width / 2);
        if (y > gElCanvas.height) y = getRandomInteger(TXT_TOP_PADDING, gElCanvas.height);
        return { x: x, y: y };
    }
    else {
        const x = Math.floor(gElCanvas.width / 2);
        const y = TXT_TOP_PADDING + FONT_SIZE;
        return { x: x, y: y };
    }
}


