'use strict'


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
    drawMeme()
}