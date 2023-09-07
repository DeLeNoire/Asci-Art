// Image to ASCII
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/166-ascii-image.html
// https://youtu.be/55iwMYv8tGI

// ASCII video: https://editor.p5js.org/codingtrain/sketches/KTVfEcpWx
// ASCII image canvas: https://editor.p5js.org/codingtrain/sketches/r4ApYWpH_
// ASCII image DOM: https://editor.p5js.org/codingtrain/sketches/ytK7J7d5j
// ASCII image source text: https://editor.p5js.org/codingtrain/sketches/LNBpdYQHP
// ASCII image weather API: https://editor.p5js.org/codingtrain/sketches/DhdqcoWn4

let data;
let forecast;
let gloria;
let startIndex = 0;

let isAnimating = false;
let startStopDropDown;

function preload() {
  gloria = loadImage("Me3_cropped.jpg");
  data = loadJSON("https://api.weather.gov/gridpoints/LWX/108,90/forecast/hourly");
}

function setup() {
  createCanvas(400, 533).position(windowWidth/2 -200 , windowHeight/2 -250);

  
  forecast = '';
  const periods = data.properties.periods;
  for (let p of periods) {
    forecast += `${p.temperature}°F ${p.shortForecast} ${p.windSpeed} ${p.windDirection} `;
    // console.log(p);
  }
    
  
 textFont("Courier-Bold");

 startStopDropDown = createSelect();
 startStopDropDown.option("Stop");
 startStopDropDown.option("Start");

 startStopDropDown.changed(startStopAnimation);
  
}

function startStopAnimation() {
  // Check the selected option and control the animation accordingly
  const selectedOption = startStopDropDown.value();
  if (selectedOption === "Start") {
    isAnimating = true;
  } else if (selectedOption === "Stop") {
    isAnimating = false;
  }
}

function draw() {
  background(0);
  frameRate(6);
  
  let charIndex = startIndex;
  let w = width / gloria.width;
  let h = height / gloria.height;
  gloria.loadPixels();
    for (let j = 0; j < gloria.height; j++) {
  for (let i = 0; i < gloria.width; i++) {
      const pixelIndex = (i + j * gloria.width) * 4;
      const r = gloria.pixels[pixelIndex + 0];
      const g = gloria.pixels[pixelIndex + 1];
      const b = gloria.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      fill(avg);      
      textSize(w*1);
      textAlign(CENTER, CENTER);
      
      text(forecast.charAt(charIndex % forecast.length), i * w + w * 0.5, j * h + h * 0.5);
      charIndex++;
    }
  }
  if (isAnimating) {
    startIndex++;
  }
  
}
