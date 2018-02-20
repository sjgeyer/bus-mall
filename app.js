'use strict';

var allProducts = [];
var clicksLeft = 26;
var imageBox = document.getElementById('image-box');
var images = [document.getElementById('one'), document.getElementById('two'), document.getElementById('three')];
var picsLastSix = ['', '', ''];
var allSelections = [];

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
  if(clicksLeft === 1) {
    imageBox.removeEventListener('click', randomProduct);
    imageBox.textContent = '';
    render();
    return;
  }
  for(var i = 0; i < 3; i++) {
    var productIndex = Math.floor(Math.random() * allProducts.length);
    while (picsLastSix.includes(productIndex)) {
      productIndex = Math.floor(Math.random() * allProducts.length);
    }
    picsLastSix.push(productIndex);
    images[i].src = allProducts[productIndex].filepath;
    images[i].alt = allProducts[productIndex].name;
    images[i].title = allProducts[productIndex].name;
    allProducts[productIndex].views++;
  }
  picsLastSix.splice(0,3);
  clicksLeft--;
}

function trackClicks (event) {
  allSelections.push(event.target.alt);
}

function countClicks () {
  for (var i = 0; i < allProducts.length; i++) {
    for (var j = 0; j < allSelections.length; j++) {
      if (allSelections[j] === allProducts[i].name) {
        allProducts[i].clicks++;
      }
    }
  }
}

function render () {
  countClicks();
  var h2El = document.getElementById('final');
  h2El.textContent = 'Final Tally: ';
  var listEl = document.getElementById('list');
  for (var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = allProducts[i].clicks + ' vote(s) for the ' + allProducts[i].name;
    listEl.appendChild(liEl);
  }
}

randomProduct();

imageBox.addEventListener('click', trackClicks);
imageBox.addEventListener('click', randomProduct);