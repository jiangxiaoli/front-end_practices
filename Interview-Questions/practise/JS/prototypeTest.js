function Person(name, gender){
	this.name = name;
	this.gender = gender;
}

var p1 = new Person("leilei", "female");

//prototype
Person.prototype.getName = function(){
	return this.name;
}

console.log(Person.prototype);

console.log(p1.getName());