/* 0. install angular.min.js */ 

/*** 1. creating module ***/
// in app.js
var app = angular.module('store', [ ]); // store: app name, [dependencies]

//in app.html
<html ng-app = "store">
	<body>
		<script type="text/javascript" src="angular.min.js"></script> 
		<script type="text/javascript" src="app.js"></script> 
		<p> {{ 4 + 6 }} <p/>//expressions, dynamic values
	</body>
</html>

/*** 2. working with data- controller ***/
//in app.js
(function(){
	var app = angular.module('store', [ ]);
	//controller	
	app.controller('StoreController', function(){
		this.product = gem;
	});

	var gem = {
		name: 'apple',
		price: 2.95,
		description: '...',
	}

})();
//in html - attaching the controller, scope in div
<div ng-controller="StoreController as store"> 
	<h1> {{store.product.name}} </h1>
	<h2> ${{store.product.price}} </h2>
	<p> {{store.product.description}} </p>
 </div>