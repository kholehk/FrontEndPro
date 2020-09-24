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
   this.health = this.helth < this.maxHealth / 2 ? this.maxHealth : this.health;
};

Unit.prototype.clone = function() { 
   return new Unit(this.type, this.health, this.maxHealth, this.maxDistance);
};

function Army(defaultUnits) {
   this.units = [];
   if (defaultUnits) this.combineUnits(defaultUnits);
};

Army.prototype.isReadyToMove = function(distance) { 
   return this.units.every(elem => elem.isReadyToMove(distance));
};

Army.prototype.isReadyToFight = function() { 
   return this.units.every(elem => elem.isReadyToFight());
};

Army.prototype.restore = function() { 
   this.units.forEach(elem => elem.restore());
};

Army.prototype.getReadyToMoveUnits = function(distance) { 
   return this.units.filter(elem => elem.isReadyToMove(distance));
};

Army.prototype.combineUnits = function(defaultUnits) { 
   if (!Array.isArray(defaultUnits)) return;
   defaultUnits.forEach(elem => { if (elem instanceof Unit) this.units.push(elem) });
};

Army.prototype.cloneUnit = function (numberUnit) {
   if (+numberUnit < 0 || +numberUnit >= this.units.length) { 
      throw new Error(`Invalid number of Unit's: ${numberUnit}`);
   }
   return this.units[+numberUnit].clone();
};

// TEST

const paratrooper = new Unit(1, 10, 20, 30);
const distance = 31;
console.log("Paratrooper is ready to move?", paratrooper.isReadyToMove(distance));

const tank = new Unit(2, 20, 50, 60);
console.log("Tank is ready to fight?", tank.isReadyToFight());

if (!paratrooper.isReadyToFight()) paratrooper.restore();
console.log("Paratrooper is ready to fight?", paratrooper.isReadyToFight());

const soldier = paratrooper.clone();
console.log("Soldier", JSON.stringify(soldier, null, 2));

const myArmy = new Army([soldier, paratrooper, tank, 123]);
console.log("My Army is ready to move?", myArmy.isReadyToMove(distance));
console.log("My Army is ready to fight?", myArmy.isReadyToFight());
tank.restore();
console.log("My Army is ready to fight?", myArmy.isReadyToFight());
console.log("Units are ready to move distance:", myArmy.getReadyToMoveUnits(distance));

const panzer = myArmy.cloneUnit(2);
myArmy.combineUnits([panzer]);
console.log("My Army:", JSON.stringify(myArmy, null, 2));