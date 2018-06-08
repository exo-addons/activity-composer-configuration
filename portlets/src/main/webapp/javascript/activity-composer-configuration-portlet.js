define("activityComposerConfigurationCtrl", ["SHARED/jquery", "SHARED/juzu-ajax"], function($, jz) {
	var activityComposerConfigurationCtrl = function($scope, $http) {
		
		$scope.displaySpacesWithActivityComposer = function() {
			var getSpacesWithActivityComposerUrl = $("#activityComposerConfiguration").jzURL("ActivityComposerConfigurationController.getSpacesWithActivityComposer");
		    $http({
		    	method: "GET",
		        url: getSpacesWithActivityComposerUrl
		    }).then(function successCallback(response) {
		    	$scope.spacesWithActivityComposer = response.data.spacesWithActivityComposer;
		    }, function errorCallback(response) {
		    });
            
	    };
		
		$scope.displaySpacesWithoutActivityComposer = function() {
			var getSpacesWithoutActivityComposerUrl = $("#activityComposerConfiguration").jzURL("ActivityComposerConfigurationController.getSpacesWithoutActivityComposer");
		    $http({
		    	method: "GET",
		        url: getSpacesWithoutActivityComposerUrl
		    }).then(function successCallback(response) {
		    	$scope.spacesWithoutActivityComposer = response.data.spacesWithoutActivityComposer;
		    }, function errorCallback(response) {
		    });
            
	    };
	    
		$scope.displayUserActivityComposerState = function() {
			var getUserActivityComposerStateUrl = $("#activityComposerConfiguration").jzURL("ActivityComposerConfigurationController.getUserActivityComposerState");
		    $http({
		    	method: "GET",
		        url: getUserActivityComposerStateUrl
		    }).then(function successCallback(response) {
		    	$scope.hideUserActivityComposer = response.data.hideUserActivityComposer == "true";
		    }, function errorCallback(response) {
		    });
            
	    };

	    $scope.hideSpaceActivityComposer = function() {
			$scope.resetSpaceMessages();
			if ($scope.spaceWithActivityComposer == "") {
				$scope.selectSpaceWithActivityComposerWarning = true;
				return;
			}
			$scope.hideSpacesComposer = true;
			var hideSpaceActivityComposerUrl = $("#activityComposerConfiguration").jzURL("ActivityComposerConfigurationController.hideSpaceActivityComposer") + "&spaces=" + $scope.spaceWithActivityComposer;
			$http({
				method: "GET",
			    url: hideSpaceActivityComposerUrl
			}).then(function successCallback(response) {
				$scope.displaySpacesWithoutActivityComposer();
				$scope.displaySpacesWithActivityComposer();
				$scope.configureSpacesComposerResult = "success";
				$scope.spaceWithActivityComposer = '';
				$scope.spaceWithoutActivityComposer = '';
			}, function errorCallback(response) {
				$scope.configureSpacesComposerResult = "failure";
				$scope.spaceWithActivityComposer = '';
				$scope.spaceWithoutActivityComposer = '';
			});
	    };
	    
	    $scope.showSpaceActivityComposer = function() {
	    	$scope.resetSpaceMessages();
			if ($scope.spaceWithoutActivityComposer == "") {
				$scope.selectSpaceWithoutActivityComposerWarning = true;
				return;
			}
			$scope.showSpacesComposer = true;
			var showSpaceActivityComposerUrl = $("#activityComposerConfiguration").jzURL("ActivityComposerConfigurationController.showSpaceActivityComposer") + "&spaces=" + $scope.spaceWithoutActivityComposer;
			$http({
				method: "GET",
			    url: showSpaceActivityComposerUrl
			}).then(function successCallback(response) {
				$scope.displaySpacesWithoutActivityComposer();
				$scope.displaySpacesWithActivityComposer();
				$scope.configureSpacesComposerResult = "success";
				$scope.spaceWithActivityComposer = '';
				$scope.spaceWithoutActivityComposer = '';
			}, function errorCallback(response) {
				$scope.configureSpacesComposerResult = "failure";
				$scope.spaceWithActivityComposer = '';
				$scope.spaceWithoutActivityComposer = '';
			});
	    };
	    
	    $scope.configureUserActivityComposer = function() {
			$scope.resetUserMessages();
			$scope.configureUsersComposer = true;
	    	var configureUserActivityComposerUrl = $("#activityComposerConfiguration").jzURL("ActivityComposerConfigurationController.configureUserActivityComposer") + "&hideUserActivityComposer=" + $scope.hideUserActivityComposer;
			$http({
				method: "GET",
			    url: configureUserActivityComposerUrl
			}).then(function successCallback(response) {
				$scope.configureUsersComposerResult = "success";
			}, function errorCallback(response) {
				$scope.configureUsersComposerResult = "failure";
			});
	    };
	    
	    $scope.resetSpaceMessages = function() {
	    	$scope.selectSpaceWithActivityComposerWarning = false;
	    	$scope.selectSpaceWithoutActivityComposerWarning = false;
	    	$scope.configureSpacesComposerResult = '';
	    	$scope.hideSpacesComposer = false;
	    	$scope.showSpacesComposer = false;
	    };
	    
	    $scope.resetUserMessages = function() {
	    	$scope.configureUsersComposerResult = '';
	    	$scope.configureUsersComposer = false;
	    };
	    
	    $scope.init = function() {
		    $scope.spaceWithActivityComposer = '';
		    $scope.spaceWithoutActivityComposer = '';
		    $scope.resetSpaceMessages();
		    $scope.resetUserMessages();
	    };
	    
	    $scope.init();
	    $scope.displaySpacesWithoutActivityComposer();
	    $scope.displaySpacesWithActivityComposer();
	    $scope.displayUserActivityComposerState();
	};
	return activityComposerConfigurationCtrl;    
});

require(["SHARED/jquery", "activityComposerConfigurationCtrl"], function ($, activityComposerConfigurationCtrl) {
	$(document).ready(function() {
		var activityComposerConfigurationAppRoot = $('#activityComposerConfiguration');
		var activityComposerConfigurationApp = angular.module('activityComposerConfigurationApp', []);
		    	
	    try {
	    	activityComposerConfigurationApp.controller('activityComposerConfigurationCtrl', activityComposerConfigurationCtrl);
			angular.bootstrap(activityComposerConfigurationAppRoot, ['activityComposerConfigurationApp']);
	    } catch(e) {
	    	console.log(e);
	    }
	});
});
    