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
Unit.prototype.isReadyToFight;
Unit.prototype.restore;
Unit.prototype.clone;

function Army(defaultUnits) {
   this.units = [];
   if (defaultUnits) this.combineUnits(defaultUnits);
}

Army.prototype.isReadyToMove;
Army.prototype.isReadyToFight;
Army.prototype.restore;
Army.prototype.getReadyToMoveUnits;
Army.prototype.combineUnits;
Army.prototype.cloneUnit;

// const paratrooper = new Unit(1, 10, 20, 30);
// const distance = 'q15';
// console.log(paratrooper.isReadyToMove(distance));