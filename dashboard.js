var app = angular.module("dashboardApp", ['smart-table']);

app.controller("dashboardController", ["$scope", "$http", function($scope, $http) {
    var ctrl = this;
    this.displayed = [];
    this.data = [];
    this.tableParams = {
        totalItems: 0,
        itemsByPage: 2
    };
    this.colCtrl = {
        complaint: true,
        department: true,
        date: true
    };
    this.showMore = true;
    this.callServer = function callServer() {
        ctrl.isLoading = true;
        var page = ctrl.tableParams.totalItems/ctrl.tableParams.itemsByPage;
        
        $http.get('http://demo5303989.mockable.io/complaints/' + page).
        success(function(data) {
            ctrl.data = ctrl.data.concat(data);
            ctrl.displayed = [].concat(ctrl.data);
            ctrl.isLoading = false;
            ctrl.tableParams.totalItems = ctrl.tableParams.totalItems + data.length;
            if(data.length < ctrl.tableParams.itemsByPage) {
                ctrl.showMore = false;
            }
        }).
        error(function(data) {
            console.error("Failed to load data");
        });
    };
    this.callServer();
    
}]);