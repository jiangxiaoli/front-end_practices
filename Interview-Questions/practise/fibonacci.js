function fibonacci(n){
	var fib = [];
	var last = 0;
	
	//put the first two el in fib array
	fib.push(0);
	fib.push(1);

	for(var i = 0; i<n-2; i++){
		var length = fib.length;
		var temp = fib[length-1]+ fib[length-2];
		fib.push(temp);
	}
	return fib;
}

console.log(fibonacci(9));