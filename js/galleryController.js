'use strict'

renderGallery()
function renderGallery() {
    var galleryHTML = '';
    const galleryImages = getImages()
    galleryImages.forEach(image => {
        galleryHTML += `<img src="${image.url}" onClick="onImageClicked(${image.id})">`

    });

    var elGallery = document.querySelector('.image-gallery')
    console.log(elGallery);
    elGallery.innerHTML = galleryHTML;

}

function getImages() {
    return gImgs;
}

function onImageClicked(imgId) {
    console.log(imgId)
    gCurrImgSrc = gImgs[imgId-1].url;
    draw(gCurrImgSrc)
    renderGallery()
}
