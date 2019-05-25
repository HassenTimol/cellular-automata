p5.disableFriendlyErrors = true;

let canvasWidth = window.innerHeight - 3/100 * window.innerHeight;
let canvasHeight = window.innerHeight - 3/100 * window.innerHeight;

let playButton = document.getElementById('play');

let lng;

if (playButton.innerHTML == 'Play') {
  lng = 'eng';
} else if (playButton.innerHTML == 'Jouer') {
  lng = 'fra';
}




//////////   SETTINGS FOR THE PLAY BUTTON     /////////////


playButton.addEventListener('click', controlPlaying);

function controlPlaying() {
  if (playing) {
    playing = false;
    if (lng == 'eng') {
      playButton.innerHTML = 'Play';
    } else if (lng == 'fra') {
      playButton.innerHTML = 'Jouer';
    }
    return;
  }
  playing = true;
  playButton.innerHTML = 'Pause';
}

playButton.style.left = (canvasWidth + 20).toString() + 'px';
playButton.style.top = '10px';

//////////   SETTINGS FOR THE PLAY BUTTON     /////////////



//////////   SETTING FOR THE RESET BUTTON     /////////////

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', reset);


function reset() {
  gen = 0;
  genCounter.innerHTML = '0';
  setup();
  playing = false;
  if (lng == 'eng') {
    playButton.innerHTML = 'Play';
  } else if (lng == 'fra') {
    playButton.innerHTML = 'Jouer';
  }
  flow = 0;
  infoValues[0].innerHTML = '';
  averageSpeeds = [];
  flows = [];
  flowMeasureIndex = roadLength/2;
  updateTable();
}

if (lng == 'fra') {
  resetButton.style.width = '100px';
}

resetButton.style.left = (canvasWidth + 141).toString() + 'px';
resetButton.style.top = '10px';
 

//////////   SETTING FOR THE RESET BUTTON     /////////////


//////////   SETTING FOR THE INSTRUCTIONS    /////////////

let instructPointer = document.getElementById('instructPointer');
let instructions = document.getElementById('instructions');
instructPointer.addEventListener('click', showInstructions);
showingInstructions = false;


function showInstructions() {
  if (showingInstructions) {
    instructions.style.display = 'none';
  } else {
    instructions.style.display = 'inline-block';
  }
  showingInstructions = !showingInstructions;
}



instructPointer.style.left = (canvasWidth + 261).toString() + 'px';
instructions.style.width = (canvasWidth - 40).toString() + 'px';
instructions.style.height = (canvasHeight - 40).toString() + 'px';


//////////   SETTING FOR THE INSTRUCTIONS    /////////////


///////////   SETTING FOR THE GENERATION COUNTER   ///////////

let genCounter = document.getElementById('genValue');
let genDisplay = document.getElementById('gen');
let gen = 0;


genDisplay.style.left = (canvasWidth + 20).toString() + 'px';


function updateGenCounter() {
  genCounter.innerHTML = gen;
}

///////////   SETTING FOR THE GENERATION COUNTER   ///////////


//////////   SETTING FOR THE SLIDERS, DISPLAYERS, INDICATORS    /////////////


let settingsContainer = document.getElementById('settings');
let sliders = document.getElementsByClassName('slider');
let displayers = document.getElementsByClassName('displayBox');
let indicators = document.getElementsByClassName('sliderIndicator');

settings.style.left = (canvasWidth + 40).toString() + 'px';
settings.style.top = '100px';


for (let i = 0; i < sliders.length; i++) {
  displayers[i].style.top = '70px';
  displayers[i].innerHTML = sliders[i].value;
  sliders[i].style.top = '10px';
  sliders[i].oninput = controlSettings;
}

let infectProb = parseFloat(sliders[0].value);
let dieProb = parseFloat(sliders[1].value);
let vaccineProb = parseFloat(sliders[2].value);
let speed = parseFloat(sliders[3].value);
let cols = parseFloat(sliders[4].value);
let rows = parseFloat(sliders[4].value);

function controlSettings() {
  if (this.id == "infectProbSlider") {
    infectProb = parseFloat(sliders[0].value);
    displayers[0].innerHTML = sliders[0].value;
  }

  if (this.id == "dieProbSlider") {
    dieProb = parseFloat(sliders[1].value);
    displayers[1].innerHTML = sliders[1].value;
  }

  if (this.id == "vaccineProbSlider") {
    vaccineProb = parseFloat(sliders[2].value);
    displayers[2].innerHTML = sliders[2].value;
    if (!playing) {reset()};
  } 

  if (this.id == "speedSlider") {
    speed = parseFloat(sliders[3].value);
    displayers[3].innerHTML = sliders[3].value;
  }

  if (this.id == "dimensionSlider") {
    displayers[4].innerHTML = sliders[4].value;
    if (!playing) {
      cols = parseFloat(sliders[4].value);
      rows = parseFloat(sliders[4].value);
      reset();
    }
  }
}

//////////   SETTING FOR THE SLIDERS AND DISPLAYERS    /////////////


//////////   SETTING FOR THE INFORMATION TABLE    /////////////

let infoTable = document.getElementById('populationDetailTable');
let legends = document.getElementsByClassName('legend');
let infoValues = document.getElementsByClassName('infoValue');



infoTable.style.top = '70px';


function updateTable() {
  for (let i = 0; i < infoValues.length; i++) {
    infoValues[i].innerHTML = populationDetail[i];
  }
}


//////////   SETTING FOR THE INFORMATION TABLE    /////////////




//////////   SETTING THE VARIABLES FOR THE SIMULATION     /////////////

let playing = false;
let changed = false;
let population;          // declaring global variables
let newPopulation;
let populationDetail = Array(5).fill(0);  
/// dead, ill, immune, vaccinated, alive

let colors = ['black',    'yellow',      'green',         'blue',              'white'];
///          0: dead   ;   1: ill   ;    2: immune   ;    3: vaccinated    ;   4: alive


for (let i = 0; i < legends.length; i++) {
  legends[i].style.backgroundColor = colors[i];
}

let width; 
let height; 

//////////   SETTING THE VARIABLES FOR THE SIMULATION     /////////////



function randint(min, max) {
  return (Math.floor(Math.random() * (max - min) + min));
}


function copy2DArray(arr) {
  let width = arr.length;
  let height = arr[0].length;
  let newArr = make2DArray(width, height);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      newArr[i][j] = arr[i][j];
    }
  }
  return newArr;
}

function createPopulation(){
  population = make2DArray(cols, rows);
  populationDetail = Array(5).fill(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (randint(1, 101) <= vaccineProb) {
          population[i][j] = 3;
          populationDetail[3] ++;
      } else {
        population[i][j] = 4;
        populationDetail[4]++;
      }
    }
  }
  let gridMiddleX = Math.floor(cols/2);
  let gridMiddleY = Math.floor(rows/2);
  populationDetail[population[gridMiddleX][gridMiddleY]]--;
  populationDetail[1] = 1;
  population[gridMiddleX][gridMiddleY] = 1;
  return population;
}
  
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows).fill(4);
  }
  return arr;
}

function drawPopulation(population) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(colors[population[i][j]]);
      rect(i * width, j * height, width-1, height-1);
    }
  }
}

function interactCell(x, y) {
  if (population[x][y] == 4) {
    checkAlive(x, y);
  }
  if (population[x][y] == 1) {
    checkIll(x, y);
  }
}

function checkAlive(x, y) {
  newPopulation[x][y] = 4;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (population[(x+i+cols)%cols][(y+j+rows)%rows]==1 && randint(1, 101) <= infectProb) {
        newPopulation[x][y] = 1;
        populationDetail[1]++;
        populationDetail[4]--;
        changed = true;
        return;
      }
    }
  }
}

function checkIll(x, y) {
  if (randint(1, 101) <= dieProb) {
    newPopulation[x][y] = 0;
    populationDetail[0]++;
  } else {
    newPopulation[x][y] = 2;
    populationDetail[2]++;
  }
  changed = true;
  populationDetail[1]--;
}

function evolvePopulation() {
  changed = false;
  newPopulation = copy2DArray(population);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      interactCell(i, j);
    }
  }
  population = copy2DArray(newPopulation);
  return population;
}



function setup() {
  createCanvas(canvasWidth, canvasHeight);
  width = canvasWidth/cols;
  height = canvasHeight/rows;
  population = createPopulation();
  drawPopulation(population);
  updateTable();
}


function draw() {
  if (playing) {
    population = evolvePopulation();
    if (changed) {
      drawPopulation(population);
      gen ++;
      updateGenCounter();
      updateTable();
      frameRate(speed);
    } else {
      playing = false;
      playButton.innerHTML = 'Play';
    }
  }
}
