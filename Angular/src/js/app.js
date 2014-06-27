/*
	Code school Angular tutorial
	06-25 XJ
*/

(function(){
	var app = angular.module('store', ['store-products']);

	//controller store	
	app.controller('StoreController', ['$http', function($http){
		//this.products = gems;
		//pass "this" to store
		var store = this;
		//initialize products to an array, since the page will render
		//before data returns from get request 
		store.products = [ ];

		//$http returns a Promise, so success use callback to get the data
		$http.get('js/products.json').success(function(data){
			//"this" is $http
			store.products = data;
		});
	}]);

	/***var gems = [
		{
			name: 'Apple',
			price: 2.95,
			description: 'An apple a day, keep the doctor away.',
			canPurchase: true,
			soldOut:false,
			//product image array
			images:[
				{
					full:'images/apple-01-full.jpg',
					thumb:'apple-01-thumb.jpg',
				},
				{
					full:'images/apple-02-full.jpg',
					thumb:'apple-02-thumb.jpg',
				},
			],
			//product review array
			reviews: [
				{
					stars:5,
					body:"I love this product",
					author:"joe@thomas.com",
					createdOn: 1397490980837
				},
				{
					stars:1,
					body:"This product sucks",
					author:"tim@hater.com",
					createdOn: 1397490980837

				}
			]
		},
		{		
			name: 'Orange',
			price: 4.22,
			description: 'Love the orange color.',
			canPurchase: true,
			soldOut:false,
			images:[ ],
			reviews:[ ]
		},
	];***/

})();