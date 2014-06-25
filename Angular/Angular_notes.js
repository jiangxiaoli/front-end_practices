/*
	Code school Angular tutorial
	06-25 XJ
*/

/* 0. install angular.min.js */ 

/*** 1. creating module ***/
//--in app.js
var app = angular.module('store', [ ]); // store: app name, [dependencies]

//--in app.html
<html ng-app = "store">
	<body>
		<script type="text/javascript" src="angular.min.js"></script> 
		<script type="text/javascript" src="app.js"></script> 
		<p> {{ 4 + 6 }} <p/>//expressions, dynamic values
	</body>
</html>

/*** 2. working with data - controller ***/
//--in app.js
//wrapping in a closure
(function(){
	var app = angular.module('store', [ ]);
	//**controller	
	app.controller('StoreController', function(){
		this.product = gem;
	});

	var gem = {
		name: 'apple',
		price: 2.95,
		description: '...',
	}

})();
//--in html - attaching the controller, scope in div
<div ng-controller="StoreController as store"> 
	<h1> {{store.product.name}} </h1>
	<h2> ${{store.product.price}} </h2>
	<p> {{store.product.description}} </p>
</div>

/*** 2. Build-in Directives ***/
//add a button
//--in html 
	<div ng-controller="StoreController as store"> 
		//<!--hide content only when soldOut is true-->
		<div ng-hide="store.product.soldOut">
			<h1> {{store.product.name}} </h1>
			<h2> ${{store.product.price}} </h2>
			<p> {{store.product.description}} </p>
			//<!--show button only when canPurchase is true-->
			<button ng-show="store.product.canPurchase">Add to cart </botton>			
		</div>
	 </div>
//--in js
	var gem = {
		name: 'Apple',
		price: 2.95,
		description: 'An apple a day, keep the doctor away.',
		canPurchase: true
		soldOut: true
	}

//multiple products
	//--in js
	app.controller('StoreController', function(){
		this.products = gems;
	});

	//gems array
	var gems = [
		{
			name: 'Apple',
			price: 2.95,
			description: 'An apple a day, keep the doctor away.',
			canPurchase: true,
			soldOut:false,
		},
		{		
			name: 'Orange',
			price: 4.22,
			description: 'Love the orange color.',
			canPurchase: true,
			soldOut:false,
		}
	];

	//--in html
	<div ng-controller="StoreController as store"> 
		//<!-- ng-repeat : iterate product in products -->
		<div ng-repeat="product in store.products">
			//<!--hide content only when soldOut is true-->
			<div ng-hide="product.soldOut">
				<h1> {{product.name}} </h1>
				<h2> ${{product.price}} </h2>
				<p> {{product.description}} </p>
				//<!--show button only when canPurchase is true-->
				<button ng-show="product.canPurchase">Add to cart </botton>			
			</div>				
		</div>
	 </div>








