'use strict';

var allProducts = [];
var clicksLeft = 26;
var imageOne = document.getElementById('one');
var imageTwo = document.getElementById('two');
var imageThree = document.getElementById('three');
var imageBox = document.getElementById('image-box');
var images = [imageOne, imageTwo, imageThree];
var picsLastSix = [];
var allPicsUsed = [];
var allProductViewTotal = [];

var imageDescription = ['Rolling suitcase that looks like your favorite Star Wars Character', 'Banana slicer', 'iPad stand for your bathroom', 'Open-toed rainboots', 'All-in-one breakfast maker', 'Meatball flavored bubblegum', 'Inverted chair', 'Cthulhu action figure', 'Duck beak for your dog (various sizes)', 'Freshly slain canned dragon meat', 'Utensil heads that can attach to your pen', 'Sweepers to put on pet feet (various sizes)', 'Scissors to cut your perfect pizza slice', 'Shark attack sleeping bag', 'Onesie for babies that sweeps while the baby crawls', 'Tauntaun sleeping bag for kids', 'Canned unicorn meat', 'Wiggly tentacle thumb drive', 'Self-filling watering can', 'Sure-to-spill wine glass'];

function Product (name, filepath, descIndex) {
  this.name = name;
  this.filepath = filepath;
  this.description = imageDescription[descIndex];
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

new Product('bag', 'img/bag.jpg', 0);
new Product('banana', 'img/banana.jpg', 1);
new Product('bathroom', 'img/bathroom.jpg', 2);
new Product('boots', 'img/boots.jpg', 3);
new Product('breakfast', 'img/breakfast.jpg', 4);
new Product('bubblegum', 'img/bubblegum.jpg', 5);
new Product('chair', 'img/chair.jpg', 6);
new Product('cthulhu', 'img/cthulhu.jpg', 7);
new Product('dog-duck', 'img/dog-duck.jpg', 8);
new Product('dragon', 'img/dragon.jpg', 9);
new Product('pen', 'img/pen.jpg', 10);
new Product('pet-sweep', 'img/pet-sweep.jpg', 11);
new Product('scissors', 'img/scissors.jpg', 12);
new Product('shark', 'img/shark.jpg', 13);
new Product('sweep', 'img/sweep.png', 14);
new Product('tauntaun', 'img/tauntaun.jpg', 15);
new Product('unicorn', 'img/unicorn.jpg', 16);
new Product('usb', 'img/usb.gif', 17);
new Product('water-can', 'img/water-can.jpg', 18);
new Product('wine-glass', 'img/wine-glass.jpg', 19);

function randomProduct() {
  //turn off event listener after last click
  if(clicksLeft === 1) {
    imageBox.removeEventListener('click', randomProduct);
    imageBox.textContent = '';
    return;
  }
  //find and assign 3 pictures' values
  for(var i = 0; i < 3; i++) {
    //randomize index
    var productIndex = Math.floor(Math.random() * allProducts.length);
    console.log(productIndex + ': initial calculation');
    //check for repeats in current or last three, recalculate index if necessary
    for (var j = 0; j < picsLastSix.length; j++) {
      if (productIndex === picsLastSix[j]) {
        productIndex = Math.floor(Math.random() * allProducts.length);
        console.log(productIndex + ': found duplicate, recalculated in if loop');
        j=0;
      }
    }
    picsLastSix.push(productIndex);
    allPicsUsed.push(productIndex);
    //assign properties to images
    images[i].src = allProducts[productIndex].filepath;
    images[i].alt = allProducts[productIndex].name;
    images[i].title = allProducts[productIndex].description;
    if (picsLastSix.length === 7) {
      picsLastSix.shift();
    }
  }
  clicksLeft--;
  console.log(picsLastSix);
}

function countViews() {
  for (var i = 0; i < allProducts.length; i++) {
    var viewTotal = 0;
    for (var j = 0; j < allPicsUsed.length; j++) {
      if (i === allPicsUsed[j]) {
        viewTotal++;
      }
    }
    allProductViewTotal.push(viewTotal);
  }
}

randomProduct();
console.log(allPicsUsed);

imageBox.addEventListener('click', randomProduct);