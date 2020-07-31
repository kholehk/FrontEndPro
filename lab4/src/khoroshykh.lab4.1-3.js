'use strict';
//lab4.1-2
const circlePerimeter = function(radius) {
  return 2 * Math.PI * radius;
};

const circleArea = function(radius) {
  return Math.PI * radius ** 2;
};

const circleRadius = 17;

console.log(
  `Radius of the circle: ${circleRadius},`,
  `Perimeter: ${circlePerimeter(circleRadius)},`,
  `Area: ${circleArea(circleRadius)}`
);
//lab4.3
const a = 5;
const b = 7;

console.log(a, b, getNumbersMean(a, b));

function getNumbersMean(a, b) {
  return (a + b) / 2;
}
