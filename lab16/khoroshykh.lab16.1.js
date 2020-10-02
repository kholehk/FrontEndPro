"use strict";

class Unit {
   constructor(type, health, maxHealth, maxDistance) { 
      this.type = type;
      this.health = health;
      this.maxHealth = maxHealth;
      this.maxDistance = maxDistance;
   }

   isReadyToMove(distance) {
      return +distance <= this.maxDistance;
   }
   
   isReadyToFight() {
      return this.health >= this.maxHealth / 2;
   }

   restore() {
      this.health = this.helth < this.maxHealth / 2 ? this.maxHealth : this.health;
   }

   clone() {
      return new Unit(this.type, this.health, this.maxHealth, this.maxDistance);
   }
}


class Army {
   constructor(defaultUnits) {
      this.units = [];
      if (defaultUnits) this.combineUnits(defaultUnits);
   }
   
   isReadyToMove(distance) {
      return this.units.every(elem => elem.isReadyToMove(distance));
   }

   isReadyToFight() {
      return this.units.every(elem => elem.isReadyToFight());
   }
   
   restore() {
      this.units.forEach(elem => elem.restore());
   }
   
   getReadyToMoveUnits(distance) {
      return this.units.filter(elem => elem.isReadyToMove(distance));
   }
   
   combineUnits(defaultUnits) {
      if (!Array.isArray(defaultUnits)) return;
      defaultUnits.forEach(elem => {
         if (elem instanceof Unit) this.units.push(elem)
      })
   }

   cloneUnit(numberUnit) {
      if (+numberUnit < 0 || +numberUnit >= this.units.length) {
         throw new Error(`Invalid number of Unit's: ${numberUnit}`);
      }
      return this.units[+numberUnit].clone();
   }
}


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