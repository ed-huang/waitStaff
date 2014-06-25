angular.module('myApp', [])
	.factory('mealDetailsFactory', function() {
		var details = {};
		details = {
			mealPrice: null,
			taxRate: null,
			tipPercentage: null,
			submitted: false,
			getTip: function() {
				return (this.tipPercentage/100) * this.mealPrice;	
			},
			reset: function() {
				mealPrice = null;
				taxRate = null;
				tipPercentage = null;
				submitted = false;
			}
		};
		return details;
	})

/**** Meal Detail Controller and Form ****/

	.controller('mealDetailsCtrl', function($rootScope, $scope, mealDetailsFactory) {

		// initialize
		function init() {
			$scope.data = {
				mealPrice: null,
				taxRate: null,
				tipPercentage: null,
				submitted: false

			};
		}
		
		// on submit
		$scope.submit = function() {
			$scope.submitted = true;
			if(!$scope.detailsForm.$invalid) {
				mealDetailsFactory.mealPrice  = $scope.data.mealPrice; 
				mealDetailsFactory.taxRate = $scope.data.taxRate;
				mealDetailsFactory.tipPercentage = $scope.data.tipPercentage;
				$rootScope.$broadcast('submitted');
				$scope.data = {};
				$scope.submitted = false;
			}
		}

		//on cancel
		$scope.clearForm = function() {
			if($scope.detailsForm.$dirty) {
				$scope.data = {};
				$scope.submitted = false;
			}
		}

		//reset
		$scope.$on('reset', function(event, data) {
			init();
		});

		init();

		

	})

/**** Customer Charges Controller ****/

	.controller('customerChargesCtrl', function($scope, mealDetailsFactory) {

		function init() {
			$scope.data = {
				subTotal: 0, 
				tip: 0, 
				total: 0
			}	
		}
		
		$scope.$on('submitted', function(event, data) {
			$scope.data.subTotal = (mealDetailsFactory.mealPrice * (mealDetailsFactory.taxRate)/100) + mealDetailsFactory.mealPrice;
			$scope.data.tip = mealDetailsFactory.getTip();
			$scope.data.total = $scope.data.subTotal + $scope.data.tip;
		});

		$scope.$on('reset', function(event, data) {
			init();
		});

		init();
	})

/**** Customer Charges Controller ****/

	.controller('earningsInfoCtrl', function($rootScope, $scope, mealDetailsFactory){

		function init() {
			$scope.data = {
				tipTotal: 0,
				mealCount: 0,
				averageTip: 0
			}	
		}

		$scope.$on('submitted', function(event, data) {
			$scope.data.tipTotal += mealDetailsFactory.getTip();
			$scope.data.mealCount ++;
			$scope.data.averageTip = $scope.data.tipTotal / $scope.data.mealCount;
		});

		$scope.$on('reset', function(event, data) {
			init();
		});

		init();
	})

/**** Controller for entire app ****/

	.controller('waitStaffCtrl', function($scope, $rootScope, mealDetailsFactory) {
		$scope.reset = function() {
				mealDetailsFactory.reset();
				$rootScope.$broadcast('reset');
			}
	});
	
