function objectSize(the_object) {
  /* function to validate the existence of each key in the object to get the number of valid keys. */
  var object_size = 0;
  for (key in the_object){
    if (the_object.hasOwnProperty(key)) {
      object_size++;
    }
  }
  return object_size;
}

// Arbitrary object
var something = {
  dog: "cat",
  cat: "dog"
}

console.log(objectSize(something));
// Logs: 2