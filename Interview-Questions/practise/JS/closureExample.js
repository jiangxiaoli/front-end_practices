function funBuilder(lang){
	var time = 0;
	
	return function(name){
		this.name = name;
		this.print = function(){
			console.log("Laguage:" + lang);
			console.log(time);
			console.log(this.name);
		}
		this.addTime = function(num){
			time += num;
		}
		
	}
}
var China = funBuilder("Chinese");
var US = funBuilder("English");

var a = new China("Steve");
a.print();
a.name = "Json";
a.addTime(10);
a.print();

var b = new China("Alice");
b.print();