/// <reference path="../../../jquery-1.9.0.js" />
/// <reference path="../../../knockout-2.2.1.debug.js" />
/// <reference path="../../../sammy-0.7.4.js" />
/// <reference path="../../../knockout-2.2.1.debug.js" />

var viewModel = {
    items: ko.observableArray(),
    loadItems: function () {
        
        if (Modernizr.history) {
            history.pushState("", "", "/home/index/one");
        }
        else {
            location.hash = "home/index/one";
        }
        
    }
}

var items = [{ name: "one" }, { name: "two" }];

Sammy(function () {

    this.get('/:controller/:action/:id', function () {
        console.log(this.params.controller);
        console.log(this.params.action);
        console.log(this.params.id);
        alert("pushState");
    });

    this.get('#:controller/:action/:id', function () {
        console.log(this.params.controller);
        console.log(this.params.action);
        console.log(this.params.id);
        alert("hash");
    });

    this.get('', function () {
        console.log("get ''");        
    });
    

}).run();

ko.applyBindings(viewModel);