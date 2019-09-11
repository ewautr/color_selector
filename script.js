"use strict";

const inputField = document.querySelector("input");
const chosenColor = inputField.value;
const altColors = document.querySelectorAll(".colorCircle__aside");
const aside1 = document.querySelector(".aside1");
const aside2 = document.querySelector(".aside2");
const aside3 = document.querySelector(".aside3");
const aside4 = document.querySelector(".aside4");
const option = document.querySelector("select");

inputField.addEventListener("input", init);

function init() {
  displayColorBox();
  displayHEX();
  displayRGB();
}

function displayColorBox() {
  document.querySelector(".colorCircle").style.backgroundColor =
    inputField.value;
}

function displayHEX() {
  document.querySelector(".hex").innerHTML = "HEX: " + inputField.value;
}

function displayRGB() {
  document.querySelector(".rgb").innerHTML = `RGB: (${hexToRgb(
    inputField.value
  )})`;
}

function hexToRgb(h) {
  let r = 0,
    g = 0,
    b = 0;

  r = "0x" + h[1] + h[2];
  g = "0x" + h[3] + h[4];
  b = "0x" + h[5] + h[6];

  rgbToHsl(r, g, b);

  return +r + ", " + +g + ", " + +b;
}

function rgbToHsl(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  document.querySelector(".hsl").innerHTML = `HSL: (${h}, ${s}%, ${l}%)`;

  document.querySelectorAll("#pal").forEach(option => {
    option.addEventListener("change", changePallette);
  });

  function changePallette() {
    if (this.value === "analogus") {
      displayAnalogHSL(h, s, l);
    } else if (this.value === "monochromatic") {
      displayMonochromeHSL(h, s, l);
    } else if (this.value === "triad") {
      displayTriadHSL(h, s, l);
    } else if (this.value === "complementary") {
      displayComplementHSL(h, s, l);
    } else if (this.value === "compound") {
      displayCompoundHSL(h, s, l);
    } else if (this.value === "shades") {
      displayShadesHSL(h, s, l);
    } else {
      altColors.forEach(color => {
        color.style.backgroundColor = "#27212c";
      });
    }
  }
}

// ---------COLOR PALLETTE FUNCTIONS ---------------
function displayAnalogHSL(h, s, l) {
  altColors.forEach(color => {
    h = h + 20;
    color.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
  });
}

function displayShadesHSL(h, s, l) {
  altColors.forEach(color => {
    l = l + 7;
    color.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
  });
}

function displayMonochromeHSL(h, s, l) {
  altColors.forEach(color => {
    h = h - 20;
    color.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
  });
}

function displayComplementHSL(h, s, l) {
  aside1.style.backgroundColor = `hsl(${h + 180},${s}%,${l}%)`;
  aside2.style.backgroundColor = `hsl(${h + 180},${s}%,${l + 20}%)`;
  aside3.style.backgroundColor = `hsl(${h},${s}%,${l + 10}%)`;
  aside4.style.backgroundColor = `hsl(${h},${s}%,${l + 20}%)`;
}

function displayTriadHSL(h, s, l) {
  aside1.style.backgroundColor = `hsl(${h + 60},${s}%,${l}%)`;
  aside2.style.backgroundColor = `hsl(${h},${s}%,${l - 7}%)`;
  aside3.style.backgroundColor = `hsl(${h},${s}%,${l + 17}%)`;
  aside4.style.backgroundColor = `hsl(${h + 120},${s}%,${l}%)`;
}

function displayCompoundHSL(h, s, l) {
  aside1.style.backgroundColor = `hsl(${h + 180},${s}%,${l}%)`;
  aside2.style.backgroundColor = `hsl(${h + 180},${s - 50}%,${l}%)`;
  aside3.style.backgroundColor = `hsl(${h + 20},${s}%,${l}%)`;
  aside4.style.backgroundColor = `hsl(${h + 20},${s - 50}%,${l}%)`;
}
