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
			if ($scope.spaceWithActivityComposer != "") {
				var hideSpaceActivityComposerUrl = $("#activityComposerConfiguration").jzURL("ActivityComposerConfigurationController.hideSpaceActivityComposer") + "&spaces=" + $scope.spaceWithActivityComposer;
			    $http({
			    	method: "GET",
			        url: hideSpaceActivityComposerUrl
			    }).then(function successCallback(response) {
				    $scope.displaySpacesWithoutActivityComposer();
				    $scope.displaySpacesWithActivityComposer();
				    $scope.configureSpacesComposerResult = "success";
				    $scope.configureSpacesComposerResultMessage = "Les espaces " + $scope.spaceWithActivityComposer + " sont désormais sans composer";
				    $scope.spaceWithActivityComposer = '';
				    $scope.spaceWithoutActivityComposer = '';
			    }, function errorCallback(response) {
			    	$scope.configureSpacesComposerResult = "failure";
				    $scope.configureSpacesComposerResultMessage = "Erreur lors de l'ajout des espaces " + $scope.spaceWithActivityComposer + " à la liste des espaces sans composer";
				    $scope.spaceWithActivityComposer = '';
				    $scope.spaceWithoutActivityComposer = '';
			    });
			}
			else {
				$scope.selectSpaceWarning = "Vous devez selectionner un ou plusieurs espaces avec composer";
			}
	    };
	    
	    $scope.showSpaceActivityComposer = function() {
	    	$scope.resetSpaceMessages();
			if ($scope.spaceWithoutActivityComposer != "") {
				var showSpaceActivityComposerUrl = $("#activityComposerConfiguration").jzURL("ActivityComposerConfigurationController.showSpaceActivityComposer") + "&spaces=" + $scope.spaceWithoutActivityComposer;
			    $http({
			    	method: "GET",
			        url: showSpaceActivityComposerUrl
			    }).then(function successCallback(response) {
				    $scope.displaySpacesWithoutActivityComposer();
				    $scope.displaySpacesWithActivityComposer();
				    $scope.configureSpacesComposerResult = "success";
				    $scope.configureSpacesComposerResultMessage = "Les espaces " + $scope.spaceWithoutActivityComposer + " sont désormais avec composer";
				    $scope.spaceWithActivityComposer = '';
				    $scope.spaceWithoutActivityComposer = '';
			    }, function errorCallback(response) {
			    	$scope.configureSpacesComposerResult = "failure";
				    $scope.configureSpacesComposerResultMessage = "Erreur lors de l'ajout des espaces " + $scope.spaceWithoutActivityComposer + " à la liste des espaces avec composer";
				    $scope.spaceWithActivityComposer = '';
				    $scope.spaceWithoutActivityComposer = '';
			    });
			}
			else {
				$scope.selectSpaceWarning = "Vous devez selectionner un ou plusieurs espaces sans composer";
			}
	    };
	    
	    $scope.showHideUserActivityComposer = function() {
			$scope.resetUserMessages();
	    	var showHideUserActivityComposerUrl = $("#activityComposerConfiguration").jzURL("ActivityComposerConfigurationController.showHideUserActivityComposer") + "&hideUserActivityComposer=" + $scope.hideUserActivityComposer;
			$http({
				method: "GET",
			    url: showHideUserActivityComposerUrl
			}).then(function successCallback(response) {
				$scope.configureUsersComposerResult = "success";
			    $scope.configureUsersComposerResultMessage = "La file d'actualité des utilisateurs est désormais " + ($scope.hideUserActivityComposer ? "sans" : "avec") + " composer";
			}, function errorCallback(response) {
				$scope.configureUsersComposerResult = "failure";
			    $scope.configureUsersComposerResultMessage = "Erreur de configuration du composer de la file d'actualité des utilisateurs";
			});
	    };
	    
	    $scope.resetSpaceMessages = function() {
	    	$scope.selectSpaceWarning = '';
	    	$scope.configureSpacesComposerResult = '';
	    	$scope.configureSpacesComposerResultMessage = '';
	    };
	    
	    $scope.resetUserMessages = function() {
	    	$scope.configureUsersComposerResult = '';
	    	$scope.configureUsersComposerResultMessage = '';
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
    