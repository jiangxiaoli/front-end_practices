/*
	Code school Angular tutorial
	06-25 XJ
*/

(function(){
	var app = angular.module('store', [ ]);

	//controller store	
	app.controller('StoreController', function(){
		this.products = gems;
	});

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



	var gems = [
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
	];

})();