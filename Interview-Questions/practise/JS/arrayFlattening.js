//for 2D array flattening
function arrayFlattening(arr){
	return [].concat.apply([], arr);
}

//for 2D array flattening
function arrayFlattening2(arr){
	return arr.reduce(function(a,b){
		console.log("a: " +a + "; b: " + b);
		return a.concat(b);
	});
}

var arr = [[1,2],[3,4],[5,[6,7],8]];
console.log(arrayFlattening(arr));
console.log(arrayFlattening2(arr));