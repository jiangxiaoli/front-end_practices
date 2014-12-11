var animal = { eats: true }

function Rabbit(name) {
  this.name = name
}

Rabbit.prototype = { eats: true }
var rabbit = new Rabbit('John')
alert( rabbit.hasOwnProperty('eats') ) // false, in prototype
alert( rabbit.hasOwnProperty('name') ) // true, in object


//3 way to inherit
rabbit.__proto__ = animal
rabbit = Object.create(animal)
Rabbit.prototype = animal
