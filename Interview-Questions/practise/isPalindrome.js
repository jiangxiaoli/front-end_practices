function isPalindrome(s){
	var chars = s.split("");
	var n = chars.length;
	for(var i = 0; i < n/2 ; i++){
		if(chars[i] !== chars[n-i-1]){
			return false;
		}
	}
	return true;
}

function isP2(str){
	return str === [].map.call(str, function(x) {
	  return x;
	}).reverse().join(''); 
}

function isP3(str){
	return str === str.split("").reverse().join(""); 
}

var s = " 1abcddcba1";
console.log(isPalindrome(s));
console.log(isP2(s));
console.log(isP3(s));