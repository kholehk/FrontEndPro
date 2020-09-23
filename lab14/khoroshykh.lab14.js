"use strict";

function Unit(type, health, maxHealth, maxDistance) {
   this.type = type;
   this.health = health;
   this.maxHealth = maxHealth;
   this.maxDistance = maxDistance;
}

Unit.prototype.isReadyToMove = function(distance) { 
   return +distance <= this.maxDistance;
};

Unit.prototype.isReadyToFight = function() { 
   return this.health >= this.maxHealth / 2;
};

Unit.prototype.restore = function() { 
   this.health = this.maxHealth;
};
Unit.prototype.clone = function() { 
   return new Unit(this.type, this.health, this.maxHealth, this.maxDistance);
};

function Army(defaultUnits) {
   this.units = [];
   if (defaultUnits) this.combineUnits(defaultUnits);
}

Army.prototype.isReadyToMove = function(distance) { 
   return this.units.every(elem => distance <= elem.maxDistance);
};
Army.prototype.isReadyToFight;
Army.prototype.restore;
Army.prototype.getReadyToMoveUnits;
Army.prototype.combineUnits = function(defaultUnits) { 
   if (!Array.isArray(defaultUnits)) return;
   defaultUnits.forEach(elem => { if (elem instanceof Unit) this.units.push(elem) });
};

Army.prototype.cloneUnit;

const paratrooper = new Unit(1, 10, 20, 30);
const distance = 30;
console.log("Paratrooper is ready to move?", paratrooper.isReadyToMove(distance));

const tank = new Unit(2, 20, 50, 60);
console.log("Tank is ready to fight?", tank.isReadyToFight());

if (!tank.isReadyToFight()) tank.restore();
console.log("Tank is ready to fight?", tank.isReadyToFight());

const soldier = paratrooper.clone();
console.log("Soldier", JSON.stringify(soldier, null, 2));

const myArmy = new Army([soldier, paratrooper, tank, 123]);