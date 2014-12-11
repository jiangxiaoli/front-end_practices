
var someJSObj = {
  key : "",
  anotherKey : "",
  subObj : {
    subKey : "",
    another : "",
    yetAnother : {
      andAntother : {
        candidate: {
         // the one we care about
        }
      }
    }
  }
};

var somehowWeHaveThis = someJSObj.subObj.yetAnother.andAnother.candidate; 
JSObjContains(someObj, somehowWeHaveThis)  // true 

function JSObjContains ( parentJSObj, candidateJSObj ) {
  for(var prop in parentJSObj){
    if(JSObjContains(parentJSObj.prop === candidateJSObj)){
      return true;
    }
  }
}