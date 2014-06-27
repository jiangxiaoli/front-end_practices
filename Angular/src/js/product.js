//different closure means different app variable
(function(){

	//define a new module just for product stuff
	var app = angular.module('store-products', [ ]);

	//custom directive
	app.directive('productTitle', function(){
		return {
			restrict: 'E', //type of directive, E for element
			templateUrl:'templates/product-title.html'
		};
	});

	//directive controller - panels
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

	//controller review
	app.controller('ReviewController', function(){
		this.review = {};
		//add review method, push new review onto the product's reviews array
		this.addReview = function(product){
			//add createdOn date
			this.review.createdOn = Date.now();
			product.reviews.push(this.review);
			//clear out the form, form will reset
			this.review={};
		};
	});

})();