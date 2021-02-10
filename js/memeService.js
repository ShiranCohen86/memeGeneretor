'use strict'

var gMeme = { selectedImgId: 0, selectedLineIdx: 0, lines: [{ txt: '' }] };

function updateLineTxt(userTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = userTxt;
}
function getCurrMeme() {
    return gMeme;
}
