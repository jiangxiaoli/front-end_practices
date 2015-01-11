http://collabedit.com/y3k9r


//test case init
test = new Object();
test.prop = 'exists';
test.prop2 = new Object();
test.prop2.prop3 = new Object();
test.prop2.prop3.prop4 = 'Whatever';
test.prop5 = null;

function changeO() {
  test.newprop = test.prop;
  delete test.prop;
}

var contains = function(obj, prop){
	for(var name in obj){
		if (name==prop) 
			return true;
		if (obj[name]!=null && typeof(obj[name])=='object') //check if prop is object
			if(contains(obj[name], prop)) 
				return true;
	}
	return false;
}

//prop is obj
var contains = function(obj, prop){
	for(var name in obj){
		if (obj[name] == prop) 
			return true;
		if (obj[name]!=null && typeof(obj[name])=='object') //check if prop is object
			if(contains(obj[name], prop)) 
				return true;
	}
	return false;
}

////////
function JSObjContains ( parentJSObj, candidateJSObj ) {
    for(var prop in parentJSObj){
    
        var checkObj = parentJSObj[prop];
        
        if (checkObj == candidateJSObj) 
            return true;
        
        if (checkObj!=null && typeof(checkObj)=='object') //check if prop is object
            if(JSObjContains(checkObj, candidateJSObj)) 
                return true;
    }
    return false;
}


console.log(contains(test, 'prop'));   // returns true
changeO();
console.log(contains(test, 'prop'));   // returns false

console.log(contains(test, 'prop2'));   // returns true

test.newprop = test.prop2;

delete test.prop2;
console.log(contains(test, 'prop2'));   // returns false

console.log(contains(test, 'prop3'));   // returns true

console.log(contains(test, 'prop4'));   // returns true

console.log(contains(test, 'prop5'));	// returns true