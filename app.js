'use strict';

var clicksLeft = 25;
var imageBox = document.getElementById('image-box');
var images = [document.getElementById('one'), document.getElementById('two'), document.getElementById('three')];
var tableEl = document.getElementById('results');
var trEl = document.createElement('tr');
var button = document.getElementById('button');
var allProducts = [];
var picsLastSix = ['', '', ''];
var allSelections = [];
var labelsArray = [];
var clicksArray = [];
var clicksBarColorArray = [];
var pctBarColorArray = [];
var percentClickedArray = [];
var recommended = [];

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

function makeAllProducts() {
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
}

//FUNCTIONS ~~
function randomProduct() {
  document.getElementById('chart').hidden = true;
  document.getElementById('pct-chart').hidden = true;
  button.hidden = true;
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
    countClicks();
    makeDataArrays();
    renderChart();
    button.hidden = false;
    localStorage.setItem('productsToLS', JSON.stringify(allProducts));
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
  calcPercentClicked();
  clicksBarColorArray.length = 20;
  clicksBarColorArray.fill('#63a1fd');
  pctBarColorArray.length = 20;
  pctBarColorArray.fill('#01D05F');
  for(var j = 0; j < percentClickedArray.length; j++) {
    if (percentClickedArray[j] > 40) {
      recommended.push('YES');
    } else {
      recommended.push('NO');
    }
  }
}

function calcPercentClicked() {
  for(var i = 0; i < clicksArray.length; i++) {
    var percentClicked = Math.floor((clicksArray[i] / allProducts[i].views) * 100);
    percentClickedArray.push(percentClicked);
  }
}

var clicksData = {
  labels: labelsArray,
  datasets: [{
    label: 'Total Number of Votes',
    data: clicksArray,
    backgroundColor: clicksBarColorArray,
    borderWidth: 1,
  }]
};

var pctData = {
  labels: labelsArray,
  datasets: [{
    label: 'Percentage Clicked',
    data: percentClickedArray,
    backgroundColor: pctBarColorArray,
    borderWidth: 1,
  }]
};

function renderChart() {
  var ctxClicks = document.getElementById('chart').getContext('2d');
  var ctxPct = document.getElementById('pct-chart').getContext('2d');
  new Chart(ctxClicks, {
    type: 'bar',
    data: clicksData,
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
            min: 0,
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
  new Chart (ctxPct, {
    type: 'bar',
    data: pctData,
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
            min: 0,
            max: 100,
            stepSize: 10,
          },
          scaleLabel: {
            display: true,
            labelString: 'Percentage Clicked',
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
        text: 'Click-through Percentage By Product',
        fontSize: 20,
      }
    },
  });
}

function makeCell(content) {
  var tdEl = document.createElement('td');
  tdEl.textContent = content;
  trEl.appendChild(tdEl);
  if(content === 'YES') {
    tdEl.className='yes';
  }
  if(content === 'NO') {
    tdEl.className='no';
  }
}

function renderTable() {
  button.hidden = true;
  var tableHeaders = ['Item', 'Views', 'Clicks', '% of Clicks When Viewed', 'Recommended?'];
  //HEADER ROW
  for (var i = 0; i < tableHeaders.length; i++) {
    var thEl = document.createElement('th');
    thEl.textContent = tableHeaders[i];
    trEl.appendChild(thEl);
  }
  tableEl.appendChild(trEl);
  //DATA ROWS
  for (var j = 0; j < allProducts.length; j++) {
    trEl = document.createElement('tr');
    makeCell(allProducts[j].name);
    makeCell(allProducts[j].views);
    makeCell(allProducts[j].clicks);
    makeCell(percentClickedArray[j] + '%');
    makeCell(recommended[j]);
    tableEl.appendChild(trEl);
  }
}

//CALL
if (localStorage.getItem('productsToLS', JSON.stringify(allProducts)) === null) {
  makeAllProducts();
} else {
  var productsRetrieved = localStorage.getItem('productsToLS', JSON.stringify(allProducts));
  allProducts = JSON.parse(productsRetrieved);
}
randomProduct();
imageBox.addEventListener('click', trackClicks);
button.addEventListener('click', renderTable);