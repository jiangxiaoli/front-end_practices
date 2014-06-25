/*
	Code school Angular tutorial
	06-25 XJ
*/

(function(){
	var app = angular.module('store', [ ]);
	//controller	
	app.controller('StoreController', function(){
		this.products = gems;
	});

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

})();