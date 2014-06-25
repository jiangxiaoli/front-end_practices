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

	var gems = [
		{
			name: 'Apple',
			price: 2.95,
			description: 'An apple a day, keep the doctor away.',
			canPurchase: true,
			soldOut:false,
			images:[
				{
					full:'images/apple-01-full.jpg',
					thumb:'apple-01-thumb.jpg',
				},
				{
					full:'images/apple-02-full.jpg',
					thumb:'apple-02-thumb.jpg',
				},
			]
		},
		{		
			name: 'Orange',
			price: 4.22,
			description: 'Love the orange color.',
			canPurchase: true,
			soldOut:false,
			images:[ ]
		},
	];

})();