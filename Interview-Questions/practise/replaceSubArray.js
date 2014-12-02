
//replace arr2 in arr1
function replaceSubArray(arr1, arr2, arr3){
	var arrString1 = arr1.join(" "); //parent array
	var arrString2 = arr2.join(" "); //target array
	var arrString3 = arr3.join(" "); //tamplate array

	//check if target is not in parent array
	if(arrString1.indexOf(arrString2) === -1){
		return arr1;
	}

	//for more than one replacement in parent array
	var find = new RegExp(arrString2, 'g');

	var result = arrString1.replace(find, arrString3);
	return result.split(" ");
}

var arr1 =["a","c","c","a","o","e","a"];
var arr2=["a"];
var arr3=["f","f"];
console.log(replaceSubArray(arr1, arr2, arr3));