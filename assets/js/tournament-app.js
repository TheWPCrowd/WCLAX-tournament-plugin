var wpcrowd_tournament = wpcrowd_tournament || {};

( function($){

    wpcrowd_tournament.app = (function(app){

        app = angular.module('wpcrowd_tournament', ['firebase'])
            .filter('orderObjectBy', function(){
                return function(input, attribute) {
                    if (!angular.isObject(input)) return input;
                    if( !input.score ) return input;

                    console.log( attribute );

                    var array = [];
                    for(var objectKey in input) {
                        array.push(input[objectKey]);
                    }

                    array.sort(function(a, b){
                        a = parseInt(a[attribute]);
                        b = parseInt(b[attribute]);
                        return a - b;
                    });
                    return array;
                }
            })
            .directive('tournament', function(){
               return {
                   restrict: 'E',
                   scope: {
                       name: '@name',
                       fireUrl: '@firebase'
                   },
                   templateUrl: tournamentObject.template_directory + 'tournament.html',
                   controller: ['$scope', '$firebaseArray', '$firebaseObject', function( $scope, $firebaseArray, $firebaseObject ) {

                       // Initialize Firebase
                       var config = {
                           apiKey: "AIzaSyCwlyDXNBxJCtNKGKz-r9XZcVlzPnHvOcA",
                           authDomain: "wclax2016tournament.firebaseapp.com",
                           databaseURL: "https://wclax2016tournament.firebaseio.com",
                           storageBucket: "wclax2016tournament.appspot.com"
                       };
                       var mainApp = firebase.initializeApp(config);

                       $scope.data = $firebaseArray( mainApp.database().ref('players') );

                       $scope.newPlayer = {
                           score: 0
                       };

                       $scope.addNewPlayer = function() {
                           $scope.data.$add($scope.newPlayer);
                           $scope.newPlayer = {
                               score: 0
                           };
                       };

                   }]
               } 
            });


        return app;
    }(wpcrowd_tournament.app || {}));

}(jQuery));