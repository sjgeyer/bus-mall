'use strict';

var allProducts = [];
var clicksLeft = 25;
var imageBox = document.getElementById('image-box');
var images = [document.getElementById('one'), document.getElementById('two'), document.getElementById('three')];
var picsLastSix = ['', '', ''];
var allSelections = [];
var labelsArray = [];
var clicksArray = [];
var barColorArray = [];

function Product(name, filepath) {
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
new Product('Shark attack sleeping bag', 'img/shark.jpg');
new Product('Baby sweeper onesie', 'img/sweep.png');
new Product('Tauntaun sleeping bag', 'img/tauntaun.jpg');
new Product('Canned unicorn meat', 'img/unicorn.jpg');
new Product('Wiggly tentacle thumb drive', 'img/usb.gif');
new Product('Self-filling watering can', 'img/water-can.jpg');
new Product('Sure-to-spill wine glass', 'img/wine-glass.jpg');

function randomProduct() {
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
}

function trackClicks(event) {
  clicksLeft--;
  allSelections.push(event.target.alt);
  if(clicksLeft === 0) {
    imageBox.removeEventListener('click', trackClicks);
    imageBox.textContent = '';
    // render();
    countClicks();
    makeDataArrays();
    makeBarColorArray();
    renderChart();
    return;
  }
  randomProduct();
}

function countClicks() {
  for (var i = 0; i < allProducts.length; i++) {
    for (var j = 0; j < allSelections.length; j++) {
      if (allSelections[j] === allProducts[i].name) {
        allProducts[i].clicks++;
      }
    }
  }
}

//CHART STUFF ~~
function makeDataArrays() {
  for(var i = 0; i < allProducts.length; i++) {
    labelsArray.push(allProducts[i].name);
    clicksArray.push(allProducts[i].clicks);
  }
}

function makeBarColorArray() {
  for (var j = 0; j < clicksArray.length; j++) {
    if (clicksArray[j] > 5) {
      barColorArray.push('#24D40C');
    } else if(clicksArray[j] > 4) {
      barColorArray.push('#1fbf43');
    } else if(clicksArray[j] > 3) {
      barColorArray.push('#1aaa7b');
    } else if(clicksArray[j] > 2) {
      barColorArray.push('#1595b2');
    } else {
      barColorArray.push('#1080ea');
    }
  }
}

var data = {
  labels: labelsArray,
  datasets: [{
    label: 'Total Number of Votes',
    data: clicksArray,
    backgroundColor: barColorArray,
    borderWidth: 1,
  }]
};

function renderChart() {
  var ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scaleShowValues: true,
      responsive: false,
      legend: {display: false},
      animation: {
        duration: 1000,
        easing: 'easeOutQuart',
      },
      barValueSpacing: 0,
      barDatasetSpacing: 0,
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
          },
          scaleLabel: {
            display: true,
            labelString: 'Total # of Votes',
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            autoSkip: false,
          }
        }]
      },
      title: {
        display: true,
        text: 'Total Number of Votes by Product',
        fontSize: 20,
      }
    },
  });
}

//CALL
randomProduct();
imageBox.addEventListener('click', trackClicks);