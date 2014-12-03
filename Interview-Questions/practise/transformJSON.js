var movies = [
  {"name":"Ice Age 3", "language":"English", "year":"2012"},
  {"name":"Ice Age 3", "language":"French", "year":"2011"},
  {"name":"Ice Age 3", "language":"German", "year":"2013"},
  {"name":"Ice Age 4", "language":"German", "year":"2014"}
];

//transfer to 
/*var movies = [
	{
	    "name": "Ice Age 3",
	    "details": [
	        {"language": "English", "year": "2012"}, 
	        {"language": "French", "year": "2011"}, 
	        {"language": "German", "year": "2013"}
	    ]
	},
	{
	    "name": "Ice Age 4",
	    "details": [
	        {"language": "German", "year": "2014"}
	    ]
	},

];*/


function transfromJSON(jarr){
	var result = [];

	for(var i = 0; i<jarr.length; i++){

		if (contains(result,jarr[i].name) === -1) {

			var obj = {
				"name": jarr[i].name,
				"details": [{"language": jarr[i].language, "year":jarr[i].year}]
			};
			result.push(obj);

		} else {
			var index = contains(result,jarr[i].name);
			//console.log(result[index]);
			result[index].details.push({"language": jarr[i].language, "year":jarr[i].year});
		}

	}
	return result;
}

function contains(arr, name){
	for(var i = 0; i< arr.length;i++){
		if(arr[i].name === name){
			return i;
		}
	}
	return -1;
}

console.log(JSON.stringify(transfromJSON(movies)));


