'use strict'

function renderMemes() {
    var galleryHTML = '';
    gStorageMemes.forEach(image => {
        galleryHTML += `<img src="${image.imgContent}" onClick="onImageClick(${image.id})">`
    });
    var elMemes = document.querySelector('.memes-gallery')
    elMemes.innerHTML = galleryHTML;
}

function renderGallery() {
    var galleryHTML = '';
    const galleryImages = getImages()


    galleryImages.forEach(image => {
        galleryHTML += `<img src="${image.url}" onClick="onImageClick(${image.id})">`

    });


    var elGallery = document.querySelector('.image-gallery')
    elGallery.innerHTML = galleryHTML;
}

function getImages() {
    return gImgs;
}

function onImageClick(imgId) {

    gMeme.selectedImgId = imgId;
    document.querySelector('.editor-container').style.display = 'flex';
    document.querySelector('.image-gallery').style.display = 'none';
    document.querySelector('.memes-gallery').style.display = 'none';
    drawMeme()
}

function goGallery() {
    document.querySelector('.editor-container').style.display = 'none';
    document.querySelector('.image-gallery').style.display = 'grid';
    document.querySelector('.memes-gallery').style.display = 'none';
    renderGallery();
    drawMeme()
}
