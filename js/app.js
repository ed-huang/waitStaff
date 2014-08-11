angular.module('myApp', [])
	.controller('waitStaffCtrl', function($scope, $rootScope) {
		$scope.earningsInfo = {
			tipTotal: 0,
			mealCount: 0,
			averageTip: 0
		};
		$scope.mealDetails = {
			mealPrice: null,
			taxRate: null,
			tipPercentage: null,
			submitted: false
		};
		$scope.customerCharges = {
			subTotal: 0, 
			tip: 0, 
			total: 0
		}
		
		$scope.submit = function() {
			console.log("submit()");
			$scope.submitted = true;
			if(!$scope.detailsForm.$invalid) {
				console.log("submit");
				$scope.earningsInfo.tipTotal += $scope.customerCharges.tip;
				$scope.earningsInfo.mealCount ++;
				$scope.earningsInfo.averageTip = $scope.earningsInfo.tipTotal / $scope.earningsInfo.mealCount;
				$scope.clearForm();
				$scope.detailsForm.$pristine = true;
			}
		};
		$scope.cancel = function() {
			$scope.mealDetails = {};
		};
		$scope.clearForm = function() {
			$scope.submitted = false;
			console.log("clearForm");
			$scope.mealDetails = {
				mealPrice:  null,
				taxRate: null,
				tipPercentage: null
			};
			$scope.customerCharges = {
				subTotal: 0, 
				tip: 0, 
				total: 0
			}
			$scope.detailsForm.$prinstine = true;
			
			console.log($scope.submitted);
		}

		$scope.reset = function() {
			$scope.earningsInfo = {
				tipTotal: 0,
				mealCount: 0,
				averageTip: 0
			};
			$scope.clearForm();
		}

		$scope.subTotal = function(total, taxRate) {
			$scope.customerCharges.subTotal = (total * taxRate/100) + total;		
			return $scope.customerCharges.subTotal;
		}

		$scope.tip = function(total, tipPercentage) {
			var myTip = total * tipPercentage/100;
			$scope.customerCharges.tip = myTip;
			return myTip;
		}

		$scope.total = $scope.tip + $scope.subTotal;
	});
	
