//for 2D array flattening
function arrayFlattening(arr){
	return [].concat.apply([], arr);
}

//for 2D array flattening
function arrayFlattening2(arr){
	return arr.reduce(function(a,b){
		// console.log("a: " +a + "; b: " + b);
		return a.concat(b);
	});
}

//for n layer array  ------!!!!!!!!!!!!!!!!!!!!
function flatten(arr){
	var flattenedArray = [ ];

	subFlatten(arr);

	function subFlatten(array){
		array.forEach(function(item){
			// console.log(item);
			if(item.constructor === Array){
				subFlatten(item);
			} else {
				// console.log("in else");
				flattenedArray.push(item);
				// console.log("flatten: " + flattenedArray);
			}
		});
	}

	return flattenedArray;
}

//for n layer object ------ not work
function flattenObj(obj){
	var flattenedObj = {};

	subFlattenObj(obj);

	function subFlattenObj(subObj){
		
		for(var name in subObj){
			if (subObj[name]!=null && typeof(subObj[name])=='object'){
				console.log("in obj");
				//check if prop is object
				subFlattenObj(subObj);
			} else {
				flattenedObj[name] = subObj[name];
			}
		}
	}
	return flattenedObj;
}

var arr = [[1,2],[3,4],[5,[6,7],8]];
// console.log(arrayFlattening(arr));
// console.log(arrayFlattening2(arr));
// console.log(flatten(arr));

test = new Object();
test.prop = 'exists';
test.prop2 = new Object();
test.prop2.prop3 = new Object();
test.prop2.prop3.prop4 = 'Whatever';
test.prop5 = null;
console.log(test);
// console.log(flattenObj(test));
