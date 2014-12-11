function calSum(){
	var n = arguments.length;
	var sum = 0;

	if(n !== 0){
		for(var i= 0; i<n; i++){
			sum += arguments[i];
		}
	}
	return sum;
}

console.log(calSum.call(this,1,2,3,4,5));
console.log(calSum.apply(this,[1,2,3]));