'use strict';

module.exports = (app) => {
  const app = angular.module('ArcadeApp', []);

  app.controller('GameController', ['CounterService', function(CounterService){
  this.count;
  this.game1 = null;
  this.newGame = function(){
    this.game1 = CounterService.gameData().game1;
    this.count = CounterService.newCount();
    CounterService.counter();
  };
}]);
  app.controller('GameController', ['$scope','$http', function($scope, $http){
    console.log('marker 1');
    const gameRoute = 'http://localhost:5000/games';
    $scope.dances = 'Add New Game';
    this.games = ['game'];
    this.newGame = {};
    this.editorOn = false;

    this.getGames = function(){
      $http.get(gameRoute)
      .then((result)=>{
        this.games = result.data.games;
        this.cancelEdit = angular.copy(this.games);
      }, function(error){
        console.log(error);
      });
    };
    this.createGame = function(game){
      $http.post(gameRoute, game)
      .then((res)=>{
        console.log(res.data);
        this.games.push(res.data);
      });
    };
    this.removeGame = function(game) {
      $http.delete(gameRoute + '/' + game._id)
      .then((res)=>{
        this.games = this.games.filter((g)=> g._id !=game._id);
      });
    };

    this.showEdit = function(){
      this.editorOn = true;
      this.cancelEdit = angular.copy(this.games);
    };

    this.hideEdit = function(){
      this.editorOn = false;
      this.games = this.cancelEdit;
    };


    this.updateGame = function(gameEdit){
      $http.put(gameRoute + '/' + gameEdit._id, gameEdit)
      .then((res)=>{
        this.games = this.games.map((g) =>{
          if(g._id === gameEdit._id){
            return gameEdit;
          } else {
            return g;
          }
        });
      });
    };
    this.cancelUpdate = function(){
      this.games = this.cancelEdit;
    };
  }]);
};
