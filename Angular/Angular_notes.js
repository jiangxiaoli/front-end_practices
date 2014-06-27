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

//tabs cleaner code - with panel controller
	//--in js, build controller
		//controller panel
	app.controller('PanelController',function(){
		//init
		this.tab = 1;

		//select tab function
		this.selectTab = function(setTab) {
			this.tab =setTab;
		};

		//comparision method
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};

	});

	//--in html, use the controller
	<section class="tab" ng-controller="PanelController as panel">
		<ul class="nav nav-pills">
			//<!-- ng-click : two way data binding -->
			//<!-- ng-class : bind active class -->
			<li ng-class="{ active:panel.isSelected(1) }">
				<a href="" ng-click="panel.selectTab(1)">Description</a>
			</li>
			<li ng-class="{ active:panel.isSelected(2) }">
				<a href="" ng-click="panel.selectTab(2)">Specifications</a>
			</li>
			<li ng-class="{ active:panel.isSelected(3) }">
				<a href="" ng-click="panel.selectTab(3)">Reviews</a>
			</li>			
		</ul>
	
		//<!-- panels -->
		<div class="panel" ng-show="panel.isSelected(1)">
			<h4>Descriptions</h4>
			<p>{{product.description}}</p>					
		</div>	
		<div class="panel" ng-show="panel.isSelected(2)">
			<h4>Specifications</h4>
			<blockquote>None yet</blockquote>				
		</div>	
		<div class="panel" ng-show="panel.isSelected(3)">
			<h4>Reviews</h4>
			<blockquote>None yet</blockquote>				
		</div>
	</section>

/*** Level 3 Forms and Models  ***/
/*** 3.1 add reviews form ***/
	//--in js
	//product review array
	reviews: [
		{
			stars:5,
			body:"I love this product",
			author:"joe@thomas.com"
		},
		{
			stars:1,
			body:"This product sucks",
			author:"tim@hater.com"

		}
	]
	//--in html
	//<!-- show reviews  -->
	<div class="panel" ng-show="panel.isSelected(3)">
		<h4>Reviews</h4>
		<blockquote ng-repeat="review in product.reviews">
			<b>{{review.stars}} Stars</b>
			{{review.body}}
			<p><cite class="clearfix">-{{review.author}}</cite></p>
		</blockquote>				
	</div>

	//<!-- review form  -->
	<form name="reviewForm">
		//<!-- live preview -->
		<blockquote>
			<b>{{review.stars}} Stars</b>
			{{review.body}}
			<p><cite class="clearfix">-{{review.author}}</cite></p>	
		</blockquote>

		//<!-- input review -->
		<h4>Submit a review</h4>
		//<!-- ng-model binds the form element value to the property: two waybinding -->
		<fieldset class="form-group">
			<select ng-model="review.stars" class="form-control" ng-options="stars for stars in [5,4,3,2,1]" titlw="Stars">
				<option value="">Rate the Product</option>
			</select>	
		</fieldset>

		<fieldset class="form-group">
			<textarea ng-model="review.body" class="form-control" placeholder="write something..." title="Review"></textarea>		
		</fieldset>

		<fieldset class="form-group">
			<input ng-model="review.author" type="email" class="form-control" title="Email">
		</fieldset>

		<fieldset class="form-group">
			<input type="submit" class="btn btn-primary" value="Submit Review"/>
		</fieldset>
	</form>
//two binding examples
	//with a check box
	<input ng-model="review.terms" type="checkbox" /> I agree tp tje ter,stars

	//with radio buttons
	<input ng-model="review.color" type="radio" value="red" /> red
	<input ng-model="review.color" type="radio" value="green" /> green

/*** 3.2 accept a review submission ***/
//--in js
	//add review controller
	app.controller('ReviewController', function(){
		this.review = {};
		//add review method, push new review onto the product's reviews array
		this.addReview = function(product){
			product.reviews.push(this.review);
			//clear out the form, form will reset
			this.review={};
		};
	});
//--in html
		//<!-- review controller-->
		//<!-- ng-submit  -->
	<form name="reviewForm" ng-control
	ler="ReviewController as reviewCtrl" ng-submit="reviewCtrl.addReview(product)">
		//<!-- live preview -->
		<blockquote>
			<b>{{reviewCtrl.review.stars}} Stars</b>
			{{reviewCtrl.review.body}}
			<p><cite class="clearfix">-{{reviewCtrl.review.author}}</cite></p>	
		</blockquote>

/*** 3.3 form validations ***/
//1. turn off default validation "novalidate"
//2. put "required" in fields
//3. check angular build-in reviewForm.$valid in ng-submit
	<form name="reviewForm" ng-controller="ReviewController as reviewCtrl" 
	ng-submit=" reviewForm.$valid && reviewCtrl.addReview(product)" novalidate>
//4. <!-- debugging: print form validation -->
	<div>reviewFrom is {{reviewForm.$valid}} </div>
//5. form styling
	//--in css
	.ng-invalid.ng-dirty{
		border-color:red;
	}

	.ng-valid.ng-dirty{
		border-color:green;
	}

//6. add createdOn date
	//--in js
		this.addReview = function(product){
			//add createdOn date
			this.review.createdOn = Date.now();
			product.reviews.push(this.review);
			//clear out the form, form will reset
			this.review={};
		};
	//--in html
	<!-- show reviews  -->
	<div class="panel" ng-show="panel.isSelected(3)">
		<h4>Reviews</h4>
		<blockquote ng-repeat="review in product.reviews">
			<b>{{review.stars}} Stars</b>
			{{review.body}}
			<p><cite class="clearfix">-{{review.author}} on {{review.createdOn | date:'MM/dd/yyyy @ h:mma'}}</cite></p>
		</blockquote>				
	</div>

/*** Level 4 Custom directives ***/
/*** 4.1 directives - for expressive html ***/
//ng-include for templates
	//-- in template: prodect-title.html
	{{product.name}} 
	<em class="pull-right"> {{product.price | currency}} </em>

	//-- in app.html
	//<!-- product-title.html templates -->
	<h1 ng-include="'product-title.html'"> 
	</h1>

/*** 4.2 element directives ***/
//build custom directives - element
	//1. in html
	<product-title></product-title>
	//2. in js
	//dash in html translate to camelCase in js
	app.directive('productTitle', function(){
		return {
			restrict: 'E', //type of directive, E for element
			templateUrl:'product-title.html'
		};
	});

//Element directive & attribute directive
	//element directive
	<product-title></product-title>
	//attribute directive - mixin behaviors, like tooltip
	<h3 product-title></h3>

/*** 4.3 attribute directives ***/
//build custom directives - attribute
	//1. in html
	<h3 product-title></h3>
	//2. in js
	//dash in html translate to camelCase in js
	app.directive('productTitle', function(){
		return {
			restrict: 'A', //type of directive, E for element
			templateUrl:'product-title.html'
		};
	});
	//3. in product-title.html
	<h3>
		{{product.name}} 
		<em class="pull-right"> {{product.price | currency}} </em>
	</h3>

/*** 4.4 directive controller ***/
	//-- in html
	<product-panels class="tab">
	</product-panels>	

	//--in js, directive controller
	app.directive('productPanels',function(){
		return {
			restrict:'E',
			templateUrl:'templates/product-panels.html',

			//move panel controller controller in directive, combine them together
			controller: function(){
				//init
				this.tab = 1;
				//select tab function
				this.selectTab = function(setTab) {
					this.tab =setTab;
				};
				//comparision method
				this.isSelected = function(checkTab){
					return this.tab === checkTab;
				};
			},
			controllerAs:'panel'
		};
	});

/*** Level 5 dependencies and services ***/
//make a new module
	//-- in product.js
	//different closure means different app variable
	(function(){

		//define a new module just for product stuff
		var app = angular.module('store-products', [ ]);

		//custom directive
		app.directive('productTitle', function(){...});

		//directive controller - panels
		app.directive('productPanels',function(){...});

		//controller review
		app.controller('ReviewController', function(){...});

	})();
//--in app.js
    //put all product related directive and controller in product.js
    //make dependencies
    var app = angular.module('store',['store-products']);
//-- in html
	<script type="text/javascript" src="js/product.js"></script> 

//make module organized
//app.js - top-level module attached via ng-app
//product.js -  all the functionality for products and only products


