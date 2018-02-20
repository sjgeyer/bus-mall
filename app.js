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
var allSelections = [];
var allProductClickTotal = [];

function Product (name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

new Product('R2D2 suitcase', 'img/bag.jpg');
new Product('Banana slicer', 'img/banana.jpg');
new Product('iPad stand toilet paper roll holder', 'img/bathroom.jpg');
new Product('Open-toed rainboots', 'img/boots.jpg');
new Product('All-in-one breakfast maker', 'img/breakfast.jpg');
new Product('Meatball-flavored bubblegum', 'img/bubblegum.jpg');
new Product('Inverted chair', 'img/chair.jpg');
new Product('Cthulhu action figure', 'img/cthulhu.jpg');
new Product('Duck beak for dogs', 'img/dog-duck.jpg');
new Product('Freshly-slain canned dragon meat', 'img/dragon.jpg');
new Product('Pen utensils', 'img/pen.jpg');
new Product('Sweeper booties for pets', 'img/pet-sweep.jpg');
new Product('Pizza-cutting scissors', 'img/scissors.jpg');
new Product('Shark attack Sleeping Bag', 'img/shark.jpg');
new Product('Baby sweeper onesie', 'img/sweep.png');
new Product('Tauntaun sleeping bag', 'img/tauntaun.jpg');
new Product('Canned unicorn meat', 'img/unicorn.jpg');
new Product('Wiggly tentacle thumb drive', 'img/usb.gif');
new Product('Self-filling watering can', 'img/water-can.jpg');
new Product('Sure-to-spill wine glass', 'img/wine-glass.jpg');

function randomProduct() {
  //turn off event listener after last click
  if(clicksLeft === 1) {
    imageBox.removeEventListener('click', randomProduct);
    imageBox.textContent = '';
    render();
    return;
  }
  //find and assign 3 pictures' values
  for(var i = 0; i < 3; i++) {
    //randomize index
    var productIndex = Math.floor(Math.random() * allProducts.length);
    //check for repeats in current or last three, recalculate index if necessary
    for (var j = 0; j < picsLastSix.length; j++) {
      if (productIndex === picsLastSix[j]) {
        productIndex = Math.floor(Math.random() * allProducts.length);
        j = 0;
      }
    }
    picsLastSix.push(productIndex);
    allPicsUsed.push(productIndex);
    //assign properties to images
    images[i].src = allProducts[productIndex].filepath;
    images[i].alt = allProducts[productIndex].name;
    images[i].title = allProducts[productIndex].name;
    if (picsLastSix.length === 7) {
      picsLastSix.shift();
    }
  }
  clicksLeft--;
}

function trackClicksOne () {
  allSelections.push(imageOne.alt);
}
function trackClicksTwo () {
  allSelections.push(imageTwo.alt);
}
function trackClicksThree () {
  allSelections.push(imageThree.alt);
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

function countClicks () {
  for (var i = 0; i < allProducts.length; i++) {
    var clickTotal = 0;
    for (var j = 0; j < allSelections.length; j++) {
      if (allSelections[j] === allProducts[i].name) {
        clickTotal++;
      }
    }
    allProductClickTotal.push(clickTotal);
  }
}

function render () {
  countViews();
  countClicks();
  var h2El = document.getElementById('final');
  h2El.textContent = 'Final Tally: ';
  var listEl = document.getElementById('list');
  for (var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = allProductClickTotal[i] + ' vote(s) for the ' + allProducts[i].name;
    listEl.appendChild(liEl);
  }
}

randomProduct();

imageBox.addEventListener('click', randomProduct);
imageOne.addEventListener('click', trackClicksOne);
imageTwo.addEventListener('click', trackClicksTwo);
imageThree.addEventListener('click', trackClicksThree);