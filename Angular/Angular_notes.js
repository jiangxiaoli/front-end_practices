/*
	Code school Angular tutorial
	06-25 XJ
*/

/* 1.0. install angular.min.js */ 

/*** 1.1. creating module ***/
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

/*** 1.2. Build-in Directives ***/
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

/*** Level 2 Filters and more directives  ***/
/*** 2.1 directives we know ***/
	//ng-app: attach the app module to the page
	<html ng-app="store">
	//ng-controller: attach a controller function to the page
	<body ng-controller="StoreController as store">
	//ng-show/ng-hide : display a section based on an expression
	<h1 ng-show="name">hellow, {{name}}!</h1>
	//ng-repeat: repeat a section for each item in an array
	<li ng-repeat="product in store.products"> {{product.name}} </li>

/*** 2.2. currency filter ***/
	//pipe | "send the output into", format price into currency
	{{product.price | currency}}
//formating with filters
	//{{ data | filter:options}}
	//date
	{{'1388123412323' | date:'MM/dd/yyyy @ h:mma'}} //12/27/2013 @ 12:50AM
	//uppercase & lowercase
	{{'octagon gem' | uppercase}}//	OCTAGON GEM
	//limitTo
	{{'my description' | limitTo: 8}}//my descr
	<li ng-repeat="product in store.products | limitTo:3">
	//orderBy
	<li ng-repeat="product in store.products | orderBy:'-price'"> //descending price

/*** 2.3. add an image array ***/
var gems = [
	{
		name:'apple',
		price:2.95,
		description:'...',
		images:[
			{
				full:'apple-01-full.jpg',
				//thumb:'apple-01-thumb.jpg',
			},
			{
				full:'apple-02-full.jpg',
				//thumb:'apple-02-thumb.jpg',
			},
		]
	}
];
//for display
	//single image
	<img ng-src="{{product.images[0].full}}"/>
	//repeat images
	<div ng-repeat="image in product.images" ng-show="product.images.length">
		<img src="{{image.full}}">
	</div>

/*** 2.4 Tabs ***/

//<!-- tabs -->
	<div>
		//<!-- ng-init -->
		<section ng-init="tab = 1">
			<ul class="nav nav-pills">
				//<!-- ng-click : two way data binding -->
				//<!-- ng-class : bind active class -->
				<li ng-class="{ active:tab === 1 }">
					<a href="" ng-click="tab = 1">Description</a>
				</li>
				<li ng-class="{ active:tab === 2 }">
					<a href="" ng-click="tab = 2">Specifications</a>
				</li>
				<li ng-class="{ active:tab === 3 }">
					<a href="" ng-click="tab = 3">Reviews</a>
				</li>			
			</ul>
			{{tab}}
		
			//<!-- panels -->
			<div class="panel" ng-show="tab ===1">
				<h4>Descriptions</h4>
				<p>{{product.description}}</p>					
			</div>	
			<div class="panel" ng-show="tab ===2">
				<h4>Specifications</h4>
				<blockquote>None yet</blockquote>				
			</div>	
			<div class="panel" ng-show="tab ===3">
				<h4>Reviews</h4>
				<blockquote>None yet</blockquote>				
			</div>
		</section>	
	</div>

