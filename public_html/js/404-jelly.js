"use strict";
	var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Vector = function () {
  function Vector(x, y) {_classCallCheck(this, Vector);
    this.x = x;
    this.y = y;
  }_createClass(Vector, [{ key: "add", value: function add(

    v) {
      return new Vector(
      this.x + v.x,
      this.y + v.y);
    } }, { key: "addTo", value: function addTo(

    v) {
      this.x += v.x;
      this.y += v.y;
    } }, { key: "sub", value: function sub(

    v) {
      return new Vector(
      this.x - v.x,
      this.y - v.y);
    } }, { key: "subFrom", value: function subFrom(

    v) {
      this.x -= v.x;
      this.y -= v.y;
    } }, { key: "mult", value: function mult(

    n) {
      return new Vector(this.x * n, this.y * n);
    } }, { key: "multTo", value: function multTo(

    n) {
      this.x *= n;
      this.y *= n;
    } }, { key: "div", value: function div(

    n) {
      return new Vector(this.x / n, this.y / n);
    } }, { key: "setAngle", value: function setAngle(

    angle) {
      var length = this.getLength();
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    } }, { key: "setLength", value: function setLength(

    length) {
      var angle = this.getAngle();
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    } }, { key: "getAngle", value: function getAngle()

    {
      return Math.atan2(this.y, this.x);
    } }, { key: "getLength", value: function getLength()

    {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    } }, { key: "getLengthSq", value: function getLengthSq()

    {
      return this.x * this.x + this.y * this.y;
    } }, { key: "distanceTo", value: function distanceTo(

    v) {
      return this.sub(v).getLength();
    } }, { key: "copy", value: function copy()

    {
      return new Vector(this.x, this.y);
    } }]);return Vector;}();

;
/*
    Johan Karlsson (DonKarlssonSan) 2018
    
    Using my vector lib stored as a separate Pen: 
    https://codepen.io/DonKarlssonSan/pen/JreEJO
    
    Also available at GitHub:
    https://github.com/DonKarlssonSan/vectory
    
    and npm:
    https://www.npmjs.com/package/vectory-lib
  */

var config = {
  text: "404",
  widthToSpikeLengthRatio: 0.054 };


var colorConfig = {
  particleOpacity: 0.2,
  baseHue: 350,
  hueRange: 9,
  hueSpeed: 0.04,
  colorSaturation: 100 };


// A line that is part of forming the text
var Planet = function () {
  function Planet(x, y, g) {_classCallCheck(this, Planet);
    this.pos = new Vector(x, y);
    this.g = g;
  }_createClass(Planet, [{ key: "draw", value: function draw()
    {
      ctx.fillStyle = "#AAA";
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, 8, 0, Math.PI * 2);
      ctx.fill();
    } }]);return Planet;}();var


Particle = function () {
  function Particle(x, y) {_classCallCheck(this, Particle);
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, spikeLength);
  }_createClass(Particle, [{ key: "move", value: function move(

    force) {
      if (force) {
        this.vel.addTo(force);
      }
      if (this.vel.getLength() > spikeLength) {
        this.vel.setLength(spikeLength);
      }
    } }, { key: "draw", value: function draw()

    {
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      var p2 = this.pos.add(this.vel);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    } }]);return Particle;}();


var canvas = void 0;
var ctx = void 0;
var w = void 0,h = void 0;
var hue = void 0;
var particles = void 0;
var spikeLength = void 0;
var planets = void 0;
var A = void 0;
var B = void 0;
var a = void 0;
var b = void 0;
var tick = void 0;

function setup() {
  tick = 0;
  planets = [];
  var len = Math.round(Math.random() * 3 + 3);
  for (var i = 0; i < len; i++) {
    var p = new Planet(50 + i * 100, 340, i ? 1000 : 4000);
    planets.push(p);
  }
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", reset);
  canvas.addEventListener("mousemove", mousemove);
  reset();
}

function reset() {
  hue = colorConfig.baseHue;
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  spikeLength = w * config.widthToSpikeLengthRatio;
  A = w / 2.2;
  B = h / 2.2;
  a = Math.round(Math.random() + 2);
  b = Math.round(Math.random() + 2);
  drawText();
}

function mousemove(event) {
  var x = event.clientX;
  var y = event.clientY;
  planets[0].pos.x = x;
  planets[0].pos.y = y;
}

function draw() {
  clear();
  requestAnimationFrame(draw);
  updateParticles();
  updatePlanets();
  tick++;
}

function clear() {
  ctx.clearRect(0, 0, w, h);
}

function drawText() {
  ctx.save();
  var fontSize = w * 0.2;
  ctx.font = "bold " + fontSize + "px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 1;
  ctx.strokeStyle = "white";
  ctx.strokeText(config.text, w / 2, h / 2);
  ctx.restore();
  var imageData = ctx.getImageData(0, 0, w, h);

  particles = [];

  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      var i = (x + w * y) * 4;
      var average = (imageData.data[i] +
      imageData.data[i + 1] +
      imageData.data[i + 2] +
      imageData.data[i + 3]) / 4;
      if (average > 200) {
        var particle = new Particle(x, y);
        particles.push(particle);
      }
    }
  }
  clear();
}

function updatePlanets() {
  var len = planets.length;
  for (var i = 1; i < len; i++) {
    var angle = Math.PI * 2 / (len - 1) * i;
    var x = A * Math.sin(a * tick / 100 + angle) + w / 2;
    var y = B * Math.sin(b * tick / 100 + angle) + h / 2;
    var p = planets[i];
    p.pos.x = x;
    p.pos.y = y;
    p.draw();
  }
}

function updateParticles() {
  hue += colorConfig.hueSpeed;
  var h = Math.sin(hue) * colorConfig.hueRange + colorConfig.baseHue;
  ctx.strokeStyle = "hsla(" + h + ", " + colorConfig.colorSaturation + "%, 50%, " + colorConfig.particleOpacity + ")";
  particles.forEach(function (p) {
    // Apply the force of each planet (repeller) to the current particle
    planets.forEach(function (planet) {
      var d = p.pos.sub(planet.pos);
      var length = d.getLength();
      var g = planet.g / length;
      if (g > 40) {
        g = 40;
      }
      // We keep the angle of the distance
      d.setLength(g);
      p.move(d);
    });
    p.draw();
  });
}

setup();
draw();
//# sourceURL=pen.js