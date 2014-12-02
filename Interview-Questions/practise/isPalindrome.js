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

var s = "1abcba1";
console.log(isPalindrome(s));