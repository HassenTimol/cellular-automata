p5.disableFriendlyErrors = true;


let playButton = document.getElementById('play');

let lng;

if (playButton.innerHTML == 'Play') {
  lng = 'eng';
} else if (playButton.innerHTML == 'Jouer') {
  lng = 'fra';
}


//////////   SETTINGS OF THE SIMULATION     /////////////

let canvasWidth = window.innerWidth / 2 + 9.4/100 * window.innerWidth;
let canvasHeight = window.innerHeight - 3/100 * window.innerHeight;

let cars;
let gen = 0;
let playing = false;
let populationDetail = [0, 0];
let follow = true;

//////////   SETTINGS OF THE SIMULATION     /////////////


//////////   SETTING FOR THE PLAY BUTTON     /////////////

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

  if (gen >= numOfGen - 1) {
    reset();
    playing = true;
    playButton.innerHTML = 'Pause';
  }
}

playButton.style.left = (canvasWidth + 20).toString() + 'px';
playButton.style.top = '10px';

//////////   SETTING FOR THE PLAY BUTTON     /////////////



//////////   SETTING FOR THE RESET BUTTON     /////////////

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', reset);


function reset() {
  gen = 0;
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


resetButton.style.width = '100px';
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
instructions.style.width = (canvasWidth - 35).toString() + 'px';
instructions.style.height = (canvasHeight - 35).toString() + 'px';


//////////   SETTING FOR THE INSTRUCTIONS    /////////////

//////////   SETTING FOR THE FOLLOW BUTTON    ////////////

let followButton = document.getElementById('follow');
followButton.addEventListener('click', controlFollow);


function controlFollow() {
  if (!playing) {
    if (follow) {
      follow = false;
      if (lng == 'eng') {
        followButton.innerHTML = 'Follow';
      } else if (lng == 'fra') {
        followButton.innerHTML = 'Suivre';
      }
    } else {
      follow = true;
      if (lng == 'eng') {
        followButton.innerHTML = 'Unfollow';
      } else if (lng == 'fra') {
        followButton.innerHTML = 'Ne plus suivre';
      }
    }
    reset();
  }
}


followButton.style.width = '100px';
followButton.style.left = (canvasWidth + 20).toString() + 'px';
followButton.style.top = '85px';

//////////   SETTING FOR THE FOLLOW BUTTON    ////////////


//////////   SETTING FOR THE SEE SPEEDS BUTTON    ////////////

let seeSpeedsButton = document.getElementById('seeSpeeds');
seeSpeedsButton.addEventListener('click', controlViewSpeeds);
let seeSpeeds = true;


function controlViewSpeeds() {
  if (!playing) {
    if (seeSpeeds) {
      seeSpeeds = false;
      if (lng == 'eng') {
        seeSpeedsButton.innerHTML = 'See speeds';
      } else if (lng == 'fra') {
        seeSpeedsButton.innerHTML = 'Voir les vitesses'
      }
    } else {
      seeSpeeds = true;
      if (lng == 'eng') {
        seeSpeedsButton.innerHTML = 'Hide speeds';
      } else if (lng == 'fra') {
        seeSpeedsButton.innerHTML = 'Cacher les vitesses';
      }
    }
    reset();
  }
}

seeSpeedsButton.style.fontSize = '15px';
seeSpeedsButton.style.width = '100px';
seeSpeedsButton.style.left = (canvasWidth + 141).toString() + 'px';
seeSpeedsButton.style.top = '85px';

//////////   SETTING FOR THE SEE SPEEDS BUTTON    ////////////



//////////   SETTING FOR THE SLIDERS, DISPLAYERS    /////////////


let settings = document.getElementById('settings');
let sliders = document.getElementsByClassName('slider');
let displayers = document.getElementsByClassName('displayBox');
let maxMaxSpeed = 40;


sliders[0].max = maxMaxSpeed;
sliders[4].max = canvasWidth;
sliders[5].max = canvasHeight;
let roadLength = parseFloat(sliders[4].value);    // number of cells on one lane
let numOfGen = parseFloat(sliders[5].value);
let cellWidth = canvasWidth / roadLength;
let cellHeight = canvasHeight / numOfGen;

settings.style.left = (canvasWidth + 40).toString() + 'px';

for (let i = 0; i < sliders.length; i++) {
  displayers[i].style.top = '70px';
  displayers[i].innerHTML = sliders[i].value;
  sliders[i].oninput = controlSettings;
}

let maxSpeed = parseFloat(sliders[0].value);
let density = parseFloat(sliders[1].value);
let probSlowDown = parseFloat(sliders[2].value);
let animationSpeed = parseFloat(sliders[3].value);

function controlSettings() {
  if (this.id == "maxSpeedSlider") {
    maxSpeed = parseFloat(sliders[0].value);
    displayers[0].innerHTML = sliders[0].value;
    if (!playing) {reset()}
      else {
        for (car of cars) {
          if (car.speed > maxSpeed) {
            car.speed = maxSpeed;
          }
        }
      }
  }

  if (this.id == "densitySlider") {
    density = parseFloat(sliders[1].value);
    displayers[1].innerHTML = sliders[1].value;
    if (!playing) {reset()}
  }

  if (this.id == "slowDownProbSlider") {
    probSlowDown = parseFloat(sliders[2].value);
    displayers[2].innerHTML = sliders[2].value;
  } 

  if (this.id == "animationSpeedSlider") {
    animationSpeed = parseFloat(sliders[3].value);
    displayers[3].innerHTML = sliders[3].value;
  }

  if (this.id == "roadLengthSlider") {
    displayers[4].innerHTML = sliders[4].value;
    if (!playing) {
      roadLength = parseFloat(sliders[4].value);
      cellWidth = canvasWidth / roadLength;
      reset();
    }
  }

  if (this.id == "numOfGenSlider") {
    displayers[5].innerHTML = sliders[5].value;
    if (!playing) {
      numOfGen = parseFloat(sliders[5].value);
      cellHeight = canvasHeight / numOfGen;
      reset();
    }
  }
}

//////////   SETTING FOR THE SLIDERS AND DISPLAYERS    /////////////


//////////   SETTING FOR THE INFORMATION TABLE    /////////////

let infoTable = document.getElementById('populationDetailTable');
let infoValues = document.getElementsByClassName('infoValue');

infoTable.style.top = '70px';

let averageSpeeds = [];
let flows = [];

let flowMeasureIndex = Math.round(roadLength / 2);
let flow;



function updateTable() {
  getMeanSpeed();
  getMeanFlow();
  for (let i = 0; i < infoValues.length; i++) {
    infoValues[i].innerHTML = populationDetail[i].toString().slice(0, 6);
  }
}

function getMeanSpeed() {
  let speedSum = 0;
  for (let car of cars) {
    speedSum += car.speed;
  }

  averageSpeeds.push(speedSum/cars.length);
  let averageSpeedSum = 0;
  for (speed of averageSpeeds) {
    averageSpeedSum += speed;
  }

  populationDetail[0] = averageSpeedSum / averageSpeeds.length;
}

function getMeanFlow() {
  flows.push(flow);
  let averageFlowSum = 0;
  for (flow of flows) {
    averageFlowSum += flow;
  }
  flow = 0;
  populationDetail[1] = averageFlowSum / flows.length;
}


//////////   SETTING FOR THE INFORMATION TABLE    /////////////


/// the following part is only useful for explication ///

let sent = '';
let exp = false;
document.addEventListener('keydown', manageSent);

function manageSent() {
  const k = event.key;
  if (k == 'Backspace') {
    sent = '';
  } else if (k == 'e' || k == 'x' || k == 'p' || k == 'i' || k == 'r') {
      sent += k;
      let values;
      if (sent == 'expi' && !playing) {
        values = [5, 0.35, 10, 5, 19, 12]; 
        seeSpeeds = true;
        if (lng == 'eng') {
          seeSpeedsButton.innerHTML = 'Hide speeds';
        } else if (lng == 'fra') {
          seeSpeedsButton.innerHTML = 'Cacher les vitesses';
        }    
      } else if (sent == 'expr' && !playing) {
        values = [5, 0.35, 10, parseFloat(sliders[3].max), parseFloat(sliders[4].max), parseFloat(sliders[5].max)];
        seeSpeeds = false;
        if (lng == 'eng') {
          seeSpeedsButton.innerHTML = 'See speeds';
        } else if (lng == 'fra') {
          seeSpeedsButton.innerHTML = 'Voir les vitesses';
        }
      }
      if (sent == 'expi' || sent == 'expr') {
        for (let i = 0; i < sliders.length; i++) {
        sliders[i].value = values[i].toString();
        displayers[i].innerHTML = values[i].toString();
        maxSpeed = values[0];
        density = values[1];
        probSlowDown = values[2];
        animationSpeed = values[3];
        roadLength = floor(values[4]);
        numOfGen = floor(values[5]);
        displayers[4].innerHTML = roadLength;
        displayers[5].innerHTML = numOfGen;
        cellWidth = canvasWidth / roadLength;
        cellHeight = canvasHeight / numOfGen;
        background(255);
        gen = 0;
        cars = makeCars();
        drawCars(cars);    
      }
    }
  }
}
/// the above part is only useful for explication ///


function randint(min, max) {
  return (Math.floor(Math.random() * (max - min) + min));
}




function Car(position, speed) {
  this.speed = speed;
  this.position = position % roadLength;
  this.followMe = false;
  
  this.move = function() {
    let eligibleForFlow = false;
    if (this.position < flowMeasureIndex) {
      eligibleForFlow = true;
    }

    this.position += this.speed;

    if (eligibleForFlow == true && this.position >= flowMeasureIndex) {
      flow++;
    }

    this.position %= roadLength;
  }
  
  this.accelerate = function() {
    if (this.speed < maxSpeed) {
      this.speed ++;
    }
  } 
  
  this.slowDown = function(carInFront) {
    let frontCarPos = carInFront.position;
    if (frontCarPos < this.position) {
      frontCarPos += roadLength;
    }
    if (this.position + this.speed >= frontCarPos) {
      this.speed = frontCarPos - this.position - 1;
    }
  }
  
  this.changeRandomly = function() {
    if (randint(1, 101) <= probSlowDown && this.speed > 0) {
      this.speed -= 1;
    }
  }
  
  this.update = function(carInFront) {
    this.accelerate();
    this.slowDown(carInFront);
    this.changeRandomly();
    this.move();
  }
  
  this.draw = function() {
    if (this.followMe) {
      fill(0, 0, 255); 
    } else {
      fill(Math.floor((maxMaxSpeed - this.speed) * 255 / maxMaxSpeed), 0, 0);
    }
    noStroke();
    rect(this.position * cellWidth, cellHeight * gen, cellWidth, cellHeight);
    if (seeSpeeds) {
      fill(255);
      if (cellWidth < cellHeight) {
        textSize(cellWidth) ;
      } else {
        textSize(cellHeight);
      }
      rectMode(CENTER);
      textAlign(CENTER, CENTER);
      text(this.speed.toString(), this.position * cellWidth + cellWidth / 2, gen * cellHeight + cellHeight / 2);
      rectMode(CORNER);
    }  
  }
}



function makeCars() {
  let cars = [];
  for (let i = 0; i < roadLength; i++) {
    if (Math.random() <= density) {
      cars.push(new Car(i, randint(0, maxSpeed + 1)));
    }
  }

  if (follow) {
    cars[randint(0, cars.length)].followMe = true;
  }

  while (cars.length < 2) {
    cars.push(new Car((cars[0].position + roadLength/2) % roadLength, randint(0, maxSpeed + 1)));
  }

  return cars;
}

function evolveCars(cars) {
  let newCars = [];
  for (let i = 0; i < cars.length; i++) {
    newCars.push(new Car(cars[i].position, cars[i].speed));
    newCars[i].followMe = cars[i].followMe;
    newCars[i].update(cars[(i+1) % cars.length]);
  }
  return newCars;
}

function drawCars(arr) {
  for (let car of arr) {
    car.draw();
  }
}



function setup() {
  createCanvas(canvasWidth, canvasHeight);
  cars = makeCars();
  drawCars(cars);
  flow = 0;
}

function draw() {
  if (playing) {
    if (gen < numOfGen) {
      cars = evolveCars(cars);
      gen ++;
      drawCars(cars);
      frameRate(animationSpeed);
      updateTable();
    } 

    if (gen >= numOfGen - 1) {
      playing = false;
      playButton.innerHTML = 'Play';
    }
  }
}