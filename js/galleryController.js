'use strict'
var elGallery = document.querySelector('.image-gallery')

function renderGallery() {
    var galleryHTML = '';
    const galleryImages = getImages()
    galleryImages.forEach(image => {
        galleryHTML += `<img src="${image.url}" onClick="onImageClicked(${image.id})">`

    });

    elGallery.innerHTML = galleryHTML;

}

function getImages() {
    return gImgs;
}

function onImageClicked(imgId) {
    gMeme.selectedImgId = imgId - 1;
    draw()
}
